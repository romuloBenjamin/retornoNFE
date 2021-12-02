/*------------------------------------------------------->PATTERNS<-------------------------------------------------------*/
function patterns_relatorios() {
    var patterns = {};
    patterns.module = "relatorios";
    patterns.folder = "core";
    patterns.file = "gerador-relatorios";
    patterns.paginations = {};
    patterns.extensions = "php";
    patterns.swit = "listar-relatorio-";
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*------------------------------------------------------->HEADERS<-------------------------------------------------------*/
/*SET HEADERS*/
function setHeader() {
    var placers = document.querySelector("header#headerRelatorio > ul");
    var place_periodos = placers.querySelector("li#relatorioPeriodo > span");
    var place_type = placers.querySelector("li#relatorioTipo");
    /*JSON DATA*/
    var storage_data = JSON.parse(localStorage.popup_windows);
    /*PLACE PERIODOS*/
    place_periodos.innerHTML = place_periodos.textContent.replace("[ini]", storage_data.datade.split("-").reverse().join("/"));
    place_periodos.innerHTML = place_periodos.textContent.replace("[fin]", storage_data.dataa.split("-").reverse().join("/"));
    /*PLACE TYPE*/
    let reportType;
    if(storage_data.searchtype === "sintetico") reportType = "SINTÉTICO";
    else if(storage_data.searchtype === "analitico") reportType = "ANALÍTICO";
    place_type.innerHTML = reportType;
}
setHeader();
/*------------------------------------------------------->REQUEST's<-------------------------------------------------------*/
function prepare_sendRequest() {
    /*JSON DATA*/
    var storage_data = JSON.parse(localStorage.popup_windows);
    //console.log(storage_data);
    /*GET PATTERNS*/
    var patterns = patterns_relatorios();
    patterns.paginations = {};
    patterns.paginations.query = {data_ini: storage_data.datade, data_fin: storage_data.dataa};
    patterns.swit = patterns.swit+storage_data.searchtype;
    patterns.path = "../../../relatorios-module/core/listar-gerador-relatorios-core.php";
    /*SEND REQUEST*/
    sendRequest(patterns);
}
prepare_sendRequest();
/*----------------------------------------------------->RECEIVE REQUEST<-----------------------------------------------------*/
/*RECEIVE REQUEST*/
async function receiveRequest_relatorios(params, patterns) {
    //console.log(params);
    /*NO DATA*/
    if(parseInt(params.status) === 0) noDataDisponivel(params.msn);
    /*HAS DATA*/
    if(parseInt(params.status) === 1) {
        var set_data = params?.data;
        /*CREATE OPEN LOOP*/
        var open_loop = await create_array_uniques(set_data);
        /*CONFIGURACAO*/
        var config = JSON.parse(localStorage.popup_windows);
        config.maxRegistros = open_loop.length;
        localStorage.setItem("popup_windows", JSON.stringify(config));
        /*ADD EQUIPE*/
        var add_equipe_vendas = await getEquipeVendas(open_loop);
        /*SORT LOOP DATA*/
        //console.log(add_equipe_vendas);
        var sort_config = config.groupby;
        //console.log(sort_config);
        var sort_loop = await array_group_by(add_equipe_vendas, "departamento");
        setTimeout(() => {
            place_data_inTamplate(sort_loop);
        }, 300);
    }
}
/*NO DATA AVALIBLE*/
function noDataDisponivel(message) {
    var relatorioContentPlacer = document.querySelector("#relatorioContentPlacer");
    var no_data = "<div class=\"d-flex justify-content-center\"><span class=\"alert alert-warning\">"+message.split(" -> ")[0]+"</span></div>";
    relatorioContentPlacer.innerHTML = no_data;
}

// Removes CloneNode from the element's name and add the passed suffix
function setCloneIdWithSuffix(element, suffix) {
    element.id = element.id.replace("CloneNode", "") + suffix;
}

/*-------------------------------------------------------->TEMPLATE<--------------------------------------------------------*/
async function place_data_inTamplate(params) {
    const relatorioOptions = JSON.parse(localStorage.popup_windows);
    try {
        // Load Motoristas data
        let motoristas;
        if(relatorioOptions.groupby === "motorista") {
            relatorioOptions.groupby = "agregado_id";
            motoristas = await getJsonData("logistica", "transportadores", "relatorio");
        } else if(relatorioOptions.groupby === "equipe") {
            relatorioOptions.groupby = "equipenome";
        }
        const relatorioContentPlacer = document.querySelector("#relatorioContentPlacer");
        let i = 0;
        for(let departamentosData of Object.values(params)) {
            const relatorioContent = document.querySelector("#relatorioContentCloneNode").cloneNode(true);
            setCloneIdWithSuffix(relatorioContent, `-${i}`);
            // PLACE DEPARTAMENTO
            const departamentoPlacer = relatorioContent.querySelector("ul.relatorio-departamentos > li > span");
            let departamento = "FUNCIONÁRIOS DESLIGADOS";
            if(departamentosData[0].departamento) departamento = departamentosData[0].departamento.toUpperCase();
            departamentoPlacer.innerHTML = departamento;
            // Create a lowercase string class name separated by "-" using the department name
            const departamentoClass = departamento.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().split(" ").join("-");
            console.log(departamentoClass);
            relatorioContent.classList.add(departamentoClass);
            // CREATE SECOND ORDER
            let groupedByDepartamentosData = array_group_by(departamentosData, relatorioOptions.groupby);
            groupedByDepartamentosData = await filterBy(groupedByDepartamentosData, relatorioOptions.filterby);
            let j = 0;
            for(let departamentoItems of Object.values(groupedByDepartamentosData)) {
                if(departamentoItems.length === 0) break;

                const idSuffix = `-${i}_${j}`;
                const groupData = document.querySelector("#groupDataCloneNode").cloneNode(true);
                setCloneIdWithSuffix(groupData, idSuffix);
                const orderByDataPlacer = groupData.querySelectorAll("ul > li");
                // PLACE ORDER BY
                const orderByOptionKey = orderByDataPlacer[0].querySelectorAll("span")[0];
                const orderByOptionValue = orderByDataPlacer[0].querySelectorAll("span")[1];
                if(relatorioOptions.groupby === "motivo") {
                    orderByOptionKey.innerHTML = "MOTIVO: ";
                    orderByOptionValue.innerHTML = departamentoItems[0].motivo_nome.toUpperCase();
                } else if(relatorioOptions.groupby === "agregado_id") {
                    orderByOptionKey.innerHTML = "MOTORISTA: ";
                    const motoristaId = parseInt(departamentoItems[0].agregado_id);
                    let motoristaName = departamentoItems[0].agregado_id + " - Não encontrado";
                    motoristas?.some(motoristaInfo => {
                        if(parseInt(motoristaInfo.ids) === motoristaId) {
                            motoristaName = motoristaInfo.transportador;
                            return true;
                        }
                        return false;
                    })
                    orderByOptionValue.innerHTML = motoristaName.toUpperCase();
                } else if(relatorioOptions.groupby === "equipenome") {
                    orderByOptionKey.innerHTML = "EQUIPE: ";
                    let equipe = "-";
                    if(departamentoItems[0].equipenome) equipe = departamentoItems[0].equipenome.toUpperCase();
                    orderByOptionValue.innerHTML = equipe;
                }

                const groupDataItemStartPlacer = groupData.querySelector("#groupDataItemStartPlacer");
                let startNewGroup = true;
                let groupDataStartTable = null;
                // PLACE LINES
                let k = 0
                for(let groupItem of Object.values(departamentoItems)) {
                    const innerIdSuffix = idSuffix +  `_${k}`;
                    if(startNewGroup) {
                        if(groupDataStartTable) groupDataItemStartPlacer.appendChild(groupDataStartTable);
                        groupDataStartTable = document.querySelector("#groupDataItemStartCloneNode").cloneNode(true);
                        setCloneIdWithSuffix(groupDataStartTable, innerIdSuffix);
                        startNewGroup = false;
                    }
                    const groupItemLine = document.querySelector("#groupItemLineCloneNode").cloneNode(true);
                    setCloneIdWithSuffix(groupItemLine, innerIdSuffix);
                    // PLACE DATA
                    const groupItemLineData = groupItemLine.querySelectorAll("td");
                    groupItemLineData[0].innerHTML = groupItem.NF;
                    groupItemLineData[1].innerHTML = groupItem.cod_cliente;
                    groupItemLineData[2].innerHTML = capitalize(groupItem.nome_cliente);
                    groupItemLineData[3].innerHTML = groupItem.vendedor +" - "+ capitalize(groupItem.nomevendedor);
                    let equipe = "-";
                    if(groupItem.equipenome) equipe = groupItem.equipenome.toUpperCase();
                    groupItemLineData[4].innerHTML = equipe;
                    groupItemLineData[5].innerHTML = groupItem.motivo +" - "+ groupItem.motivo_nome;
                    const avariasAndFeedbackPlacer = groupDataStartTable.querySelector("#avariasAndFeedbackPlacer");
                    if(groupItem.avarias) {
                        try {
                            const avariasTable = document.querySelector("#avariasTableCloneNode").cloneNode(true);
                            setCloneIdWithSuffix(avariasTable, innerIdSuffix);
                            const avarias = await pushAvarias(groupItem.avarias);
                            const avariasProdutoTablePlacer = avariasTable.querySelector("#avariasProdutoTablePlacer");
                            for(let do_avarias of Object.values(avarias)) {
                                if(do_avarias.furado === "") do_avarias.furado = 0;
                                if(do_avarias.vazando === "") do_avarias.vazando = 0;
                                if(do_avarias.vazio === "") do_avarias.vazio = 0;
                                if(do_avarias.molhado === "") do_avarias.molhado = 0;
                                if(do_avarias.rasgado === "") do_avarias.rasgado = 0;
                                if(do_avarias.faltante === "") do_avarias.faltante = 0;
                                const avariasProdutoTable = document.querySelector("#avariasProdutoTableCloneNode").cloneNode(true);
                                setCloneIdWithSuffix(avariasProdutoTable, innerIdSuffix);
                                const avariasProdutoTableDataCells = avariasProdutoTable.querySelectorAll("td");
                                avariasProdutoTableDataCells[0].innerText = do_avarias.produto;
                                avariasProdutoTableDataCells[1].innerText = parseInt(do_avarias.furado);
                                avariasProdutoTableDataCells[2].innerText = parseInt(do_avarias.vazando);
                                avariasProdutoTableDataCells[3].innerText = parseInt(do_avarias.vazio);
                                avariasProdutoTableDataCells[4].innerText = parseInt(do_avarias.molhado);
                                avariasProdutoTableDataCells[5].innerText = parseInt(do_avarias.rasgado);
                                avariasProdutoTableDataCells[6].innerText = parseInt(do_avarias.faltante);
                                avariasProdutoTable.querySelectorAll("div")[0].innerText = do_avarias.obs;
                                avariasProdutoTablePlacer.appendChild(avariasProdutoTable);
                            }
                            avariasAndFeedbackPlacer.appendChild(avariasTable);
                        } catch(e) {
                            console.error(e);
                        }
                        startNewGroup = true;
                        console.log(groupItemLineData[2].innerHTML + " has avaria")
                    }
                    if(groupItem.feedback) {
                        const feedbackContainer = document.querySelector("#feedbackTableCloneNode").cloneNode(true);
                        setCloneIdWithSuffix(feedbackContainer, innerIdSuffix);
                        avariasAndFeedbackPlacer.appendChild(feedbackContainer);
                        startNewGroup = true;
                    }
                    groupDataStartTable.querySelector("#groupItemLinePlacer").appendChild(groupItemLine);
                    k++;
                }
                groupDataItemStartPlacer.appendChild(groupDataStartTable);
                orderByDataPlacer[2].innerHTML = "<strong>Total:</strong> " + departamentoItems.length;
                relatorioContent.appendChild(groupData);
                j++;
            }
            if(relatorioContent.children.length > 1) relatorioContentPlacer.appendChild(relatorioContent);
            else relatorioContent.remove();
            i++;
        }
        if(relatorioContentPlacer.querySelector("div#louder-container").classList.contains("d-flex")) {
            relatorioContentPlacer.querySelector("div#louder-container").classList.remove("d-flex");
            relatorioContentPlacer.querySelector("div#louder-container").classList.add("d-none");
        }
        if(relatorioContentPlacer.children.length === 1) noDataDisponivel("Nenhum dado encontrado")
    } catch(e) {
        console.error(e);
    }
}
/*--------------------------------------------------------->FACTORY<---------------------------------------------------------*/
/*ADICIONAR EQUIPE VENDAS AO OPEN LOOP*/
async function getEquipeVendas(params) {
    var patterns_equipes = patterns_relatorios();
    patterns_equipes.swit = "listar-get-equipes-setor";
    patterns_equipes.module = "usuarios";
    patterns_equipes.path = "../../../usuarios-module/core/listar-usuarios-core.php";
    var nArray = [];
    var configs = {method: "post"};
    for (let index = 0; index < params.length; index++) {
        const equipe_vendas = params[index];
        patterns_equipes.paginations.query = equipe_vendas.vendedor;
        /*FORM DATA*/
        const equipes = new FormData();
        equipes.append("entry", JSON.stringify(patterns_equipes.paginations));
        equipes.append("swit", patterns_equipes.swit);
        configs = {...configs, body: equipes};
        var loud_request_data = loudRequest(patterns_equipes);
        try {
            var results = await fetch(loud_request_data, configs);
            results = await results?.json();
            if(parseInt(results.status) === 0) {
                equipe_vendas_extended = {...equipe_vendas};
                equipe_vendas_extended.nomevendedor = "Ex Funcionário";
            }
            if(parseInt(results.status) === 1){
                const dados_equipe_setor_vendas = results?.data[0];
                equipe_vendas_extended = {...equipe_vendas, ...dados_equipe_setor_vendas};
            }
            nArray.push(equipe_vendas_extended);
        } catch (error) {
            console.log("ERRO ao identificar Equipe/ Setor");
        }
    }
    return nArray;
}
/*AJUSTAR OPEN LOOP TO SORT*/
function array_group_by(params, config) {
    const newObj = params.reduce(function (acc, currentValue) {
        if (!acc[currentValue[config]]) {
            acc[currentValue[config]] = [];
        }
        acc[currentValue[config]].push(currentValue);
        return acc;
    }, {});
    return newObj;    
}

// Filter data
async function filterBy(data, filters) {
    const filteredData = {};
    let i = 0;
    for(let groupData of Object.values(data)) {
        const filteredGroupData = [];
        for(let item of groupData) {
            let addItem = false;
            // Check motivo filter
            if(!filters.motivo || (filters.motivo && filters.motivo.id === item.motivo)) addItem = true;
            // Check empresa filter
            if(addItem && (!filters.empresa || (filters.empresa && filters.empresa.id === item.filial))) addItem = true;
            else addItem = false;
            // Check avaria filter
            if(addItem) {
                if(filters.avaria) {
                    addItem = false;
                    if(item.avarias) {   
                        const avarias = await pushAvarias(item.avarias);
                        for(let avaria of avarias) {
                            const avariaName = filters.avaria.desc.toLowerCase();
                            if(avaria[avariaName]) addItem = true;
                        }
                    }
                }
            }
            // Add to group data filtered items array
            if(addItem) filteredGroupData.push(item);
        }
        // Add the array to the object
        if(filteredGroupData.length > 0) {
            filteredData[i] = filteredGroupData;
            i++;
        }
    }
    return filteredData;
}

// Unserialize avarias
async function pushAvarias(params) {
    var patterns_avarias = patterns_relatorios();
    patterns_avarias.path = "../../../relatorios-module/core/listar-unserie-avarias-core.php";    
    /*LOUD REQUEST*/
    var loud_request = loudRequest(patterns_avarias);
    var idata = new FormData();
    idata.append("entry", params);
    var config = {method: "post", body: idata};
    const avarias_response = await fetch(loud_request, config);
    const avarias = await avarias_response.json();
    return avarias;
}