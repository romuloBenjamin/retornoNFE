document.onkeydown = emptyLocalStorage_f5;
document.onkeyup = emptyLocalStorage_f5;

var popups_path = "http://127.0.0.1:8080/2.0/retorno-nfes/";

/*IDENTIFICAR F5*/
function emptyLocalStorage_f5(params) {
    if(params.keyCode === 116){
        if(localStorage.hasOwnProperty("listar")) localStorage.removeItem("listar");
        if(localStorage.hasOwnProperty("searchdata")) localStorage.removeItem("searchdata");
    }
}
/*PUSH PAGE -> IR PARA PAGINA*/
function pushPage(params) {
    location.href = params;
}
/*PUSH PAGE -> HISTORY BACK*/
function voltarPaginaAnterior() {
    var nArray = [];
    var location_path = location.pathname.split("/");
    for (let index = 0; index < (location_path.length - 1); index++) {
        const element = location_path[index];
        nArray.push(element);
    }
    location.href = location.origin+nArray.join("/");
}
/*LOUD REQUEST*/
function loudRequest(params) {
    return new Request(params.path.toString());
}
/*SET REQUESTS -> POST*/
async function sendRequest(params) {
    //console.log(params);
    /*FORM DATA*/
    var data = new FormData();
    data.append("swit", params.swit);
    data.append("entry", JSON.stringify(params.paginations));
    /*SET REQUEST*/    
    var config = {method: 'post', body: data};
    var louds = loudRequest(params);
    try {
        var results = await fetch(louds, config);
        results = await results?.json();
        if(params.swit === "listar-funcionarios-short") await receiveRequest(results, params);
        if(params.swit === "listar-retornos-nfe") await receiveRequest(results, params);
        if(params.swit === "listar-retornos-nfe-search") await receiveRequest(results, params, true);
        if(params.swit === "listar-retronos-nfe-paginations") prepare_paginations_object(results, params.paginations);
        if(params.swit === "listar-feedbacks-nfe") await receiveRequest(results, params);
        if(params.swit === "listar-feedbacks-nfe-paginations") setTotalEntries(results);
        if(params.swit === "pesquisar-romaneios") await receiveRequest(results, params);
        if(params.swit === "salvar-retornos-nfe") await receiveRequest_popup(results, params);
        if(params.swit === "listar-relatorio-sintetico") await receiveRequest_relatorios(results, params);
    } catch (error) {
        console.log("erro ao gerar REQUEST Principal");
        setTimeout(()=>{
            //location.reload();
        }, 600);
    }
}
/*GET N REQUEST*/
function createRequestPath(params) {
    var path = "cnt-files/cnt-modules/[MODULES]/[FOLDER]/[FILE]";
    path = path.replace("[MODULES]", params.module+"-module");
    path = path.replace("[FOLDER]", params.folder);
    if(params.extensions === "php") path = path.replace("[FILE]", "listar-"+params.file+"-core.php");
    if(params.extensions === "json") path = path.replace("[FILE]", "listar-"+params.file+"-json.json");
    return path;
}
/*LOUD LISTAS*/
function loudListas(params) {
    var louds = loudRequest(params);
    return louds;
}
/*LOUD MAPS*/
function getMaps(params, mode = "paginations") {
    /*CREATE MAP*/
    var createMAP = new Map();
    params.forEach(data => {
        const nodes = data.split("=");
        createMAP.set(nodes[0], nodes[1]);
    });
    /*RECUPERA INFORMAÇÃO DE PAGINA ATUAL*/
    if(mode === "paginations"){
        return createMAP.get("page");
    }
}
/*SET DATA PATTERNS*/
function setData() {
    var data = new Date();
    console.log(data);
}
/*LOCALSTORAGE NO OVERRIDE*/
function localStorageNoOverride() {
    var nArray = [];
    nArray.push("searchdata");
    nArray.push("listar");
    nArray.push("cadastro_dados_romaneios");
    //nArray.push("listar");
    return nArray;
}
/* Capitalize the first letter of each word */
function capitalize(string, ignoreParticles = false) {
    let pieces = string.split(" ");
    var noCaps = ["da", "das", "de", "o", "a"];
    var n_map = [];
    pieces.forEach(piece => {
        if(!ignoreParticles && noCaps.includes(piece) === true) n_map.push(piece.toString());
        if(noCaps.includes(piece) === false) n_map.push(piece.charAt(0).toString().toUpperCase() + piece.slice(1));
    });
    return n_map.join(" ");
}
/*CALMEL CASE*/
function camel_case(params) {
    var nArray = [];
    splode = params.split("-");
    splode.forEach((data, index) => {        
        if(index > 0){
            data = capitalize(data);
        }
        nArray.push(data);
    });
    return nArray.join("");
}

// Receives a module and a file and returns its data
async function getJsonData(module, file) {
    /* Request config */
    const requestData = {};
    requestData.module = module;
    requestData.folder = "jsons";
    requestData.extensions = "json";
    requestData.file = file;
    requestData.path = createRequestPath(requestData);
    const request = loudRequest(requestData);
    try {
        /* Request the data */
        const response = await fetch(request);
        const json = await response?.json();
        return json?.dataset[0]?.data;
    } catch (e) {
        console.log("Falha ao buscar dados de filiais -> " + requestData.file);
    }
    return null;
}

/*AJUSTAR PARA ENTRADAS UNICAS EM ARRAY*/
function create_array_uniques(params) {
    const nArray = [];
    let merge = {};
    if(params) {
        for (let index = 0; index < params.length; index++) {
            const lines = params[index];
            const copy_lines = {...lines};
            delete copy_lines.data_cli;
            delete copy_lines.data_nfe;
            for (let index2 = 0; index2 < params[index].data_cli.length; index2++) {
                const cli_obj = params[index].data_cli[index2];
                const nfe_obj = params[index].data_nfe[index2];
                merge = {...copy_lines,...cli_obj,...nfe_obj};
                nArray.push(merge);
            }
        }
    }
    return nArray;    
}