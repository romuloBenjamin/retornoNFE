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
    place_type.innerHTML = capitalize(storage_data.searchtype).toUpperCase();
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
    console.log(params);
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
function noDataDisponivel(params) {
    var placers = document.querySelector("section#conteudoRelatorio");
    var no_data = "<div class=\"d-flex justify-content-center\"><span class=\"alert alert-warning\">"+params.split(" -> ")[0]+"</span></div>";
    placers.innerHTML = no_data;
}
/*-------------------------------------------------------->TEMPLATE<--------------------------------------------------------*/
async function place_data_inTamplate(params) {
    var dados_storage = JSON.parse(localStorage.popup_windows);
    var placers = document.querySelector("section#conteudoRelatorio");
    Object.values(params).forEach(toDepartamentos => {
        const cloneNode_ul = placers.querySelector("div#cloneNode1").cloneNode("true");
        /*REMOVE ATTRIBUTE CLONE*/
        cloneNode_ul.classList.remove("d-none");
        cloneNode_ul.classList.add("d-flex");
        cloneNode_ul.removeAttribute("id");
        /*PLACE DEPARTAMENTO*/
        var placeDepartamento = cloneNode_ul.querySelector("ul.relatorio-departamentos > li > span");
        if(toDepartamentos[0]?.departamento === undefined) placeDepartamento.innerHTML = "Funcionários Desligados".toUpperCase();
        if(toDepartamentos[0]?.departamento != undefined) placeDepartamento.innerHTML = toDepartamentos[0]?.departamento.toUpperCase();
        /*CREATE SECOND ORDER*/
        var secondOrder = array_group_by(toDepartamentos, dados_storage.groupby);
        secondOrder.then(toGroupBy => {
            Object.values(toGroupBy).forEach(data2 => {
                //console.log(data2.length);
                const cloneNode_div = cloneNode_ul.querySelector("div#cloneNode3").cloneNode(true);
                /*REMOVE ATTRIBUTE CLONE*/
                cloneNode_div.removeAttribute("id");
                cloneNode_div.classList.remove("d-none");
                cloneNode_div.classList.add("d-flex");
                const placeOrderBy = cloneNode_div.querySelectorAll("ul > li");
                /*PLACE ORDER BY*/
                var place_order = placeOrderBy[0].querySelector("span");
                if(dados_storage.groupby === "motivo") place_order.innerHTML = data2[0].motivo_nome;
                /*PLACE LINES*/
                Object.values(data2).forEach(lines => {
                    const add_lines = placeOrderBy[1].querySelector("table > tbody > tr#cloneNode2").cloneNode(true);
                    /*REMOVE ID CLONE*/
                    add_lines.classList.remove("d-none");
                    add_lines.classList.add("d-flex");
                    add_lines.removeAttribute("class");
                    add_lines.removeAttribute("id");
                    /*PLACE DATA*/
                    add_lines.querySelectorAll("td")[0].innerHTML = lines.NF;
                    add_lines.querySelectorAll("td")[1].innerHTML = lines.cod_cliente;
                    add_lines.querySelectorAll("td")[2].innerHTML = lines.nome_cliente;
                    add_lines.querySelectorAll("td")[3].innerHTML = lines.vendedor +" - "+ lines.nomevendedor;
                    if(lines?.equipe === undefined) add_lines.querySelectorAll("td")[4].innerHTML = "-";
                    if(lines?.equipe != undefined) add_lines.querySelectorAll("td")[4].innerHTML = lines.equipe;
                    add_lines.querySelectorAll("td")[5].innerHTML = lines.motivo +" - "+ lines.motivo_nome;
                    var avarias;
                    if(lines?.avarias === undefined) {
                        avarias = "-";
                        add_lines.querySelectorAll("td")[6].innerHTML = "";
                    }
                    if(lines?.avarias != undefined) {
                        avarias = pushAvarias(lines.avarias);                        
                        avarias.then(resp => resp.json())
                        .then(idata => {
                            Object.values(idata).forEach(do_avarias => {
                                console.log(do_avarias);
                                if(do_avarias.furado === "") do_avarias.furado = "0";
                                if(do_avarias.vazando === "") do_avarias.vazando = "0";
                                if(do_avarias.vazio === "") do_avarias.vazio = "0";
                                if(do_avarias.molhado === "") do_avarias.molhado = "0";
                                if(do_avarias.rasgado === "") do_avarias.rasgado = "0";
                                if(do_avarias.faltante === "") do_avarias.faltante = "0";
                                var insert_itable = ""
                                +"<table class=\"table table-striped\">"
                                    +"<thead class=\"thead-primary\">"
                                        +"<tr>"
                                            +"<th scope=\"col\">Produto</th>"
                                            +"<th scope=\"col\">Furado</th>"
                                            +"<th scope=\"col\">Vazando</th>"
                                            +"<th scope=\"col\">Vazio</th>"
                                            +"<th scope=\"col\">Molhado</th>"
                                            +"<th scope=\"col\">Rasgado</th>"
                                            +"<th scope=\"col\">Faltante</th>"
                                        +"</tr>"
                                    +"</thead>" 
                                    +"<tbody>"
                                        +"<tr>"
                                            +"<td>"+do_avarias.produto+"</td>"
                                            +"<td>"+do_avarias.furado+"</td>"
                                            +"<td>"+do_avarias.vazando+"</td>"
                                            +"<td>"+do_avarias.vazio+"</td>"
                                            +"<td>"+do_avarias.molhado+"</td>"
                                            +"<td>"+do_avarias.rasgado+"</td>"
                                            +"<td>"+do_avarias.faltante+"</td>"
                                        +"</tr>"
                                        +"<tr>"
                                            +"<td colspan=\"7\">"+do_avarias.obs+"</td>"
                                        +"</tr>"
                                    +"</tbody>"
                                +"</table>";
                                add_lines.querySelectorAll("td")[6].innerHTML = insert_itable;
                            });
                        });
                    }
                    add_lines.querySelectorAll("td")[7].innerHTML = "-";
                    placeOrderBy[1].querySelector("table > tbody").appendChild(add_lines);
                });
                placeOrderBy[2].innerHTML = "<hr><strong>Total:</strong> "+data2.length+"<hr>";
                cloneNode_ul.appendChild(cloneNode_div);
            });
        });
        placers.appendChild(cloneNode_ul);
        placers.appendChild(document.createElement("hr"));
        if(placers.querySelector("div#louder-container").classList.contains("d-flex")) {
            placers.querySelector("div#louder-container").classList.remove("d-flex");
            placers.querySelector("div#louder-container").classList.add("d-none");
        }
    });    
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
                equipe_vendas_extended.nomevendedor = "Ex. Funcionários";
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
async function array_group_by(params, config) {
    const newObj = params.reduce(function (acc, currentValue) {
        if (!acc[currentValue[config]]) {
            acc[currentValue[config]] = [];
        }
        acc[currentValue[config]].push(currentValue);
        return acc;
    }, {});
    return newObj;    
}
async function pushAvarias(params) {
    var patterns_avarias = patterns_relatorios();
    patterns_avarias.path = "../../../relatorios-module/core/listar-unserie-avarias-core.php";    
    /*LOUD REQUEST*/
    var loud_request = loudRequest(patterns_avarias);
    var idata = new FormData();
    idata.append("entry", params);
    var config = {method: "post", body: idata};
    var avarias_ret = await fetch(loud_request, config);
    return avarias_ret;
}