document.onkeydown = emptyLocalStorage_f5;
document.onkeyup = emptyLocalStorage_f5;

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
    var results = await fetch(louds, config);
    try {
        results = await results?.json();
        //console.log(results);
        if(params.swit === "listar-funcionarios-short") await receiveRequest(results, params);
        if(params.swit === "listar-retornos-nfe") await receiveRequest(results, params);
        if(params.swit === "listar-retornos-nfe-search") await receiveRequest(results, params, true);
        if(params.swit === "listar-retronos-nfe-paginations") await prepare_paginations_object(results, params.paginations);
    } catch (error) {
        console.log("erro ao gerar REQUEST Principal");
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
    return nArray;
}
/* Capitalize the first letter of each word */
function capitalize(string) {
    let pieces = string.split(" ");
    var n_map = [];
    pieces.forEach(piece => {
        n_map.push(piece.charAt(0).toString().toUpperCase() + piece.slice(1));
    });
    return n_map.join(" ");
}