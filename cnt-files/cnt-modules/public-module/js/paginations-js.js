/*SET PAGINATIONS PATTERNS*/
var paginations = setPaginationsPatterns();
function setPaginationsPatterns() {
    var patterns = {};
    patterns.module = "public";
    patterns.folder = "core";
    patterns.file = "paginations";
    patterns.extensions = "php";
    patterns.swit = false;
    patterns.paginations = setPaginations(0, false);
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*SET DEFAULT PAGINATIONS*/
function setPaginations(params, mode = false) {
    var pages = {ini:0, max:15};
    /*GET URL PAGINATIONS PATTERNS*/
    if(location.search != "") {
        var getMaps = new Map();
        var refineLocationSearch = location.search.replace("?", "");
        var xplode = refineLocationSearch.split("&");
        xplode.forEach(mps => { const iSplit = mps.split("="); getMaps.set(iSplit[0], iSplit[1]); });
        /*SET PAGINATIONS CURRENT PAGE*/
        if(getMaps.has("page")) pages.current = parseInt(getMaps.get("page"));
    }
    /*SET MAX LISTAR*/
    if(mode === "max") {
        if(pages.hasOwnProperty("current")) delete pages.current;
        pages.max = parseInt(params);
        return pages;
    }
    /*CHECK STORAGE IF PROPERTY LISTAR EXISTS*/
    if(localStorage.hasOwnProperty("listar")) {
        pages.max = parseInt(localStorage.getItem("listar"));
        return pages;
    }
    return pages;
}
/*PAGINATIONS LOUDER*/
function paginationsLouderCarrousel(mode = "put") {
    var placers = document.querySelector("ul#pageCarrousel");
    if(mode === "put") {
        placers.appendChild(document.createElement("li")).setAttribute("id", "louderPaginations");
        placers.querySelector("li#louderPaginations").setAttribute("class", "list-group-item louder-paginations");
        placers.querySelector("li#louderPaginations").innerHTML = "<div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div>";
    }
    if(mode === "remove") placers.querySelector("li#louderPaginations").remove();
}
/*---------------------->INIT PAGINATIONS<----------------------*/
/*PREPARE PAGINATIONS*/
async function prepare_paginations_object(params, paginations, autoloud = false) {
    /*PATTERNS PAGINATIONS*/
    var paginations = setPaginationsPatterns();
    /*CREATE OBJ PAGINATIONS*/
    var obj_paginations = {registrosTotais:"", registrosPorPagina:"", registroInit:"", registroAtual:"", paginasDisponiveis:""};
    obj_paginations.registrosTotais = params;
    obj_paginations.registrosPorPagina = paginations.paginations.max;
    obj_paginations.registroInit = paginations.paginations.ini;
    obj_paginations.registroAtual = paginations.paginations.current;
    /*CALCULAR QTD DE PAGINAS*/
    let qtd = params/paginations.paginations.max;
    if(qtd % 1 != 0) qtd = Math.ceil(qtd);
    /*PLACE QTD DE PAGINAS*/
    obj_paginations.paginasDisponiveis = qtd;
    //if(params.swit != false) paginations.swit = params.swit;
    if(autoloud === false) await setDefaultPaginations(obj_paginations);
    //if(autoloud === true) setInfinitePaginations(paginations);
}
function placeSmalls(params) {
    //console.log(params);
    if(params.registroAtual === undefined) params.registroAtual = 1;
    /*PLACERS*/
    var min_titulos = document.querySelectorAll("small#qtdRegistros");
    /*CALCULOS*/
    let regsitro_ini_pagina = (params.registroAtual*params.registrosPorPagina) - (params.registrosPorPagina - 1);
    if(regsitro_ini_pagina < 0) regsitro_ini_pagina = 1;
    /*PLACE DATA IN SMALL -> DETALHES DA PAGINATIONS*/
    min_titulos.forEach(placers => {
        placers.innerHTML = "<span>"+regsitro_ini_pagina+" de "+params.registrosTotais+" registros</span>";
        placers.innerHTML += "<span><i>Total de <b>"+params.paginasDisponiveis+" páginas!</b></i></span>";
    });
    return null;
}
/*------------------->DEFAULT PAGINATIONS DATA<-------------------*/
/*DEFAULT PAGINATIONS*/
async function setDefaultPaginations(params) {
    console.log(params);
    /*PLACE SMALL DATA*/
    var place_smalls = placeSmalls(params);
    /*PLACE PAGE CARROSSEL*/
    var place_pageCarrousel = placePageCarrousel(params);
    /*ACTIVE NEXT AND LAST PAGES BUTTON*/
    var active_next = activePageControls(params, "next");
    var active_last = activePageControls(params, "last");
    /*ACTIVE PREV AND FIRST PAGES BUTTON*/
    var active_prev = activePageControls(params, "prev");
    var active_first = activePageControls(params, "first");
}
/*PLACE PAGE CARROUSSEL*/
function placePageCarrousel(params) {
    if(params.registroAtual === undefined) params.registroAtual = 1;
    /*SET LOUDER PAGINATIONS -> PUT MODE*/
    var louderCarrousel = paginationsLouderCarrousel("put");
    /*PLACE PAGE CURRENT*/
    var placers = document.querySelectorAll("ul#pageCarrousel");
    placers.forEach(carrol => {
        carrol.appendChild(document.createElement("li")).setAttribute("id", "pageCurrent");
        carrol.querySelector("li#pageCurrent").classList.add("list-group-item");
        carrol.querySelector("li#pageCurrent").innerHTML = "<a href='?page="+params.registroAtual+"'>"+params.registroAtual+"</a>";
        /*PLACE PAGE SND*/
        carrol.appendChild(document.createElement("li")).setAttribute("id", "pageSND");
        carrol.querySelector("li#pageSND").classList.add("list-group-item");
        carrol.querySelector("li#pageSND").innerHTML = "<a href='?page="+(params.registroAtual+1)+"'>"+(params.registroAtual+1)+"</a>";
        if((params.registroAtual+1) >= params.paginasDisponiveis) {
            if(carrol.querySelector("li#pageSND").classList.contains("d-none") === false) carrol.querySelector("li#pageSND").classList.add("d-none");
        }
        if((params.registroAtual+1) <= params.paginasDisponiveis) {
            if(carrol.querySelector("li#pageSND").classList.contains("d-none") === true) carrol.querySelector("li#pageSND").classList.remove("d-none");
        }
        /*PLACE PAGE THR*/
        carrol.appendChild(document.createElement("li")).setAttribute("id", "pageTHR");
        carrol.querySelector("li#pageTHR").classList.add("list-group-item");
        carrol.querySelector("li#pageTHR").innerHTML = "<a href='?page="+(params.registroAtual+2)+"'>"+(params.registroAtual+2)+"</a>";
        if((params.registroAtual+2) >= params.paginasDisponiveis) {
            if(carrol.querySelector("li#pageTHR").classList.contains("d-none") === false) carrol.querySelector("li#pageTHR").classList.add("d-none");
        }
        if((params.registroAtual+2) <= params.paginasDisponiveis) {
            if(carrol.querySelector("li#pageTHR").classList.contains("d-none") === true) carrol.querySelector("li#pageTHR").classList.remove("d-none");
        }
    });
    /*SET LOUDER PAGINATIONS -> REMOVE MODE*/
    var louderCarrousel = paginationsLouderCarrousel("remove");
}
/*ACTIVE PAGE CONTROLS*/
function activePageControls(params, mode = "next") {
    /*VISUALIZAR NEXT AND LAST*/
    if((params.registroAtual + 2) <= params.paginasDisponiveis) {
        var placers = document.querySelectorAll("ul.next-controls");
        placers.forEach(data => { 
            if(data.classList.contains("d-none") === true) data.classList.remove("d-none"); 
        });
    }else{
        var placers = document.querySelectorAll("ul.next-controls");
        placers.forEach(data => { 
            if(data.classList.contains("d-none") === false) data.classList.add("d-none"); 
        });
    }
    /*VISUALIZAR PREV AND FIRST*/
    if((params.registroAtual - 2) <= params.registroInit) {
        var placers = document.querySelectorAll("ul.prev-controls");
        placers.forEach(data => {
            if(data.classList.contains("d-none") === false) data.classList.add("d-none");
        });
    }else{
        var placers = document.querySelectorAll("ul.prev-controls");
        placers.forEach(data => {
            if(data.classList.contains("d-none") === true) data.classList.remove("d-none");
        });
    }
    /*PLACE PAGE IN NEXT PAGINATIONS*/
    if(mode === "next") {
        var placers = document.querySelectorAll("ul.next-controls > li#pageNXT > a");
        placers.forEach(nxt => {
            nxt.setAttribute("href", "?page="+(params.registroAtual+1)+"");
        });
    }
    /*PLACE PAGE IN LAST PAGINATIONS*/
    if(mode === "last") {
        var placers = document.querySelectorAll("ul.next-controls > li#pageLST > a");
        placers.forEach(lst => {
            lst.setAttribute("href", "?page="+params.paginasDisponiveis+"");
        });
    }
    /*PLACE PAGE IN PREV PAGINATIONS*/
    if(mode === "prev") {
        var placers = document.querySelectorAll("ul.prev-controls > li#pagePRV > a");
        placers.forEach(prev => {
            prev.setAttribute("href", "?page="+(params.registroAtual-1)+"");
        });
    }
    /*PLACE PAGE IN FIRST PAGINATIONS*/
    if(mode === "first") {
        var placers = document.querySelectorAll("ul.prev-controls > li#pageFST > a");
        var href = location.origin + location.pathname;
        placers.forEach(frst => {
            frst.setAttribute("href", href);
        });
    }
}
/*------------------->INFINITE PAGINATIONS DATA<-------------------*/
/*INFINITE PAGINATIONS*/
function setInfinitePaginations(params) {
    console.log("not implemented");
}