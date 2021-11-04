/*------------------------------------------>PATTERNS<------------------------------------------*/
var patterns_search = setRetornosNFESearchPatterns();
function setRetornosNFESearchPatterns() {
    var patterns = {};
    patterns.module = "search";
    patterns.folder = "core";
    patterns.file = false;
    patterns.extensions = "php";
    patterns.swit = false;
    patterns.paginations = setPaginations(0, false);
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*---------------------------------------->INIT SCRIPT<----------------------------------------*/
document.querySelector("select#forMotorista").addEventListener("change", createSearchMap);
document.querySelector("select#forEquipe").addEventListener("change", createSearchMap);
document.querySelector("select#forMotivos").addEventListener("change", createSearchMap);
document.querySelector("input#search").addEventListener("keyup", createSearchMap);
document.querySelector("button#forSearch").addEventListener("click", buscarRetornosSearch);
/*CRAETE OBJ*/
function createSearchMap() {
    /*INIT PATTERNS*/
    var patterns_search = setRetornosNFESearchPatterns();    
    /*VALORES IDENTIFICADOS*/
    const fieldName = this.name.replace("for", "").toString().toLowerCase();
    const idSelect = this.value;
    const nameSelect = this.selectedOptions[0].textContent;    
    const values = {id:idSelect, name:nameSelect};
    /*CREATE OBJ & GENERATE OBJ*/
    var nObj = new Object();
    nObj[fieldName] = values;
    /*SET LOCALSTORAGE*/
    if(nObj[fieldName].id === "*") var saveLocalStorage = localStorage_toSearch_removeProperty(JSON.stringify(nObj), "searchdata", fieldName);
    if(nObj[fieldName].id != "*") var saveLocalStorage = localStorage_toSearch(JSON.stringify(nObj), "searchdata", fieldName);
}
/*SET LOCAL STORAGE -> SEARCHDATA*/
async function localStorage_toSearch(params, local, property) {    
    /*REMOVE STORAGE SQL IF EXIST'S*/
    var localstorage_noOverride = localStorageNoOverride();
    Object.keys(localStorage).forEach(tags => {
        if(!localstorage_noOverride.includes(tags)) localStorage.removeItem(tags);
    });
    /*IF LOCAL STORAGE IS NULL OR EMPTY*/
    if(localStorage.getItem(local) === null) return localStorage.setItem(local, params);    
    /*IF LOCAL STORAGE IS NOT NULL AND UPDATE OBJ*/
    if(localStorage.getItem(local) != null) {
        /*DESTRINGFY OBJ*/
        const nParans = JSON.parse(params);
        /*CREATE OBJ IN LOCAL STORAGE*/
        var storage_to_local = JSON.parse(localStorage.getItem(local));
        var obj = new Object(storage_to_local);
        obj[property] = nParans[property];
        return localStorage.setItem(local, JSON.stringify(obj));
    }
    
}
/*REMOVE LOCAL STORAGE -> SEARCHDATA*/
async function localStorage_toSearch_removeProperty(params, local, property) {
    /*GET LOCAL STORAGE DATA*/
    var obj_storage = JSON.parse(localStorage[local]);
    /*REMOVE PROPERTY IF '*'*/
    delete obj_storage[property];
    localStorage.setItem(local, JSON.stringify(obj_storage));
}
/*---------------------------------------->SEND RESQUEST SEARCH<----------------------------------------*/
/*BUSCAR RETORNO NFE*/
async function buscarRetornosSearch() {
    if(localStorage.getItem("searchdata") != null) {
        /*CALL PATTERNS PAGE*/
        var patterns_search = setRetornosNFESearchPatterns(); patterns_search.module = "logistica"; 
        patterns_search.file = "retornos-nfe"; patterns_search.paginations.search = JSON.parse(localStorage.getItem("searchdata"));
        patterns_search.swit = "listar-retornos-nfe-search"; patterns_search.path = createRequestPath(patterns_search);
        /*SEND REQUEST*/
        //var send_request = sendRequestSearch(patterns_search);
        await sendRequest(patterns_search);
    }
}