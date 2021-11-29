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
        var sort_loop = await setSortLoop(open_loop, config);
        //await place_data_inTamplate(sort_loop);
    }
}
/*NO DATA AVALIBLE*/
function noDataDisponivel(params) {
    var placers = document.querySelector("section#conteudoRelatorio");
    var no_data = "<div class=\"d-flex justify-content-center\"><span class=\"alert alert-warning\">"+params.split(" -> ")[0]+"</span></div>";
    placers.innerHTML = no_data;
}
/*-------------------------------------------------------->TEMPLATE<--------------------------------------------------------*/
function place_data_inTamplate(params) {
    var placers = document.querySelector("section#conteudoRelatorio");
    groupBY("", "config");
    //console.log(params);
}
/*--------------------------------------------------------->FACTORY<---------------------------------------------------------*/
/*AJUSTAR PARA ENTRADAS UNICAS EM ARRAY*/
async function create_array_uniques(params) {
    var nArray = [];
    var merge = {};
    if(params != undefined) {
        for (let index = 0; index < params.length; index++) {
            const lines = params[index];
            const copy_lines = {...lines};
            delete copy_lines.uirn_notas_cliente;
            delete copy_lines.uirn_notas_retorno;
            for (let index2 = 0; index2 < params[index]["data_cli"].length; index2++) {
                const cli_obj = params[index]["data_cli"][index2];
                const nfe_obj = params[index]["data_nfe"][index2];
                merge = {...copy_lines,...cli_obj,...nfe_obj};
                nArray.push(merge);
            }
        }
    }
    return nArray;    
}
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
            if(parseInt(results.status) === 0) return equipe_vendas.nomevendedor = "Ex. Funcionários";
            if(parseInt(results.status) === 1){
                const dados_equipe_setor_vendas = results?.data[0];
                const equipe_vendas_extended = {...equipe_vendas, ...dados_equipe_setor_vendas};
                return equipe_vendas_extended;
            }
        } catch (error) {
            console.log("ERRO ao identificar Equipe/ Setor");
        }
    }
}
/*AJUSTAR OPEN LOOP TO SORT*/
async function setSortLoop(params, config) {
    var sort = "motivo";
    sort = config.groupby;
    if(config.groupby === "motorista") sort = "uirn_agregado_id";    
    /*SORT DATA*/
    params.sort((first, second) => {
        if(parseInt(first[sort]) < parseInt(second[sort])) return -1;
        if(parseInt(first[sort]) > parseInt(second[sort])) return 1;
    });
    return params;
}