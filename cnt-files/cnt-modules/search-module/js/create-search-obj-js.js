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
    var saveLocalStorage = localStorage_toSearch(JSON.stringify(nObj), "searchdata", fieldName);
}
/*SET LOCAL STORAGE -> SEARCHDATA*/
function localStorage_toSearch(params, local, property) {    
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
        /**/
        var storage_to_local = JSON.parse(localStorage.getItem(local));
        var obj = new Object(storage_to_local);
        obj[property] = nParans[property];
        return localStorage.setItem(local, JSON.stringify(obj));
    }
    
}
/*---------------------------------------->SEND RESQUEST SEARCH<----------------------------------------*/
/*BUSCAR RETORNO NFE*/
async function buscarRetornosSearch() {
    if(localStorage.getItem("searchdata") != null) {
        var patterns_search = setRetornosNFESearchPatterns(); patterns_search.module = "logistica"; 
        patterns_search.file = "retornos-nfe"; patterns_search.paginations.search = JSON.parse(localStorage.getItem("searchdata"));
        patterns_search.swit = "listar-retornos-nfe-search"; patterns_search.path = createRequestPath(patterns_search);
        /*SEND REQUEST*/
        var send_request = sendRequestSearch(patterns_search);
    }
}

function receiveRequest_search(params, patterns) {
    if(params.data.length === 0) return emptySearch(params);
    if(params.data.length > 0) {
        console.log("populate it");
    }
}

/*EMPTY SEARCH*/
function emptySearch(params) {
    var placers = document.querySelector("table#table-retorno-nfe > tbody");
    var removeLines = placers.querySelectorAll("tr");
    for (let index = 1; index < removeLines.length; index++) {
        const rem = removeLines[index];
        rem.remove();
    }
    placers.appendChild(document.createElement("tr")).setAttribute("id", "emptySearch");
    placers.querySelector("tr#emptySearch").innerHTML = "<td colspan=\"10\"><span class=\"d-flex alert alert-warning w-100\">"+params.msn.split("->")[0]+"</span></td>";
}