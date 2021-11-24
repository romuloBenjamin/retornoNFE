/*---------------------------->SET PATTERNS NFE CADASTRAR<----------------------------*/
var patterns_cadastrar = patternsCadastrarDados();
/*PATTERNS DATA*/
function patternsCadastrarDados() {
    var patterns = {};
    patterns.module = "search";
    patterns.folder = "core";
    patterns.file = "search-data";
    patterns.extensions = "php";
    patterns.paginations = {};
    patterns.swit = false;
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*---------------------------->SET PATTERNS NFE CADASTRAR<----------------------------*/
document.querySelector("input#forRomaneios").addEventListener("keyup", createObj_search);
/*------------------------------->CREATE OBJECT SEARCH<-------------------------------*/
var area_pesquisa = document.querySelector("div.cadastro-pesquisa-retorno > div.pesquisa-cadastro-romaneios > div.container-results");
/*CREATE OBJ*/
async function createObj_search() {
    var digitar = this.value;
    if(digitar === ""){
        await empty_search_lines();
        hide_search_area();
        digitar = "";
    }
    /*GET PATTERNS*/
    var patternsCadastrar = patternsCadastrarDados();
    patternsCadastrar.paginations.search = digitar;
    patternsCadastrar.swit = "pesquisar-romaneios";
    /*SEND DATA*/
    if(digitar != "") { await getRequest(patternsCadastrar); }
}
async function getRequest(params) {
    sendRequest(params);
}
/*------------------------------->RECEIVE OBJECT SEARCH<-------------------------------*/
/*RECEIVE OBJ*/
async function receiveRequest(params, patterns) {
    /*IF PLACER IS 'D-NONE'*/
    view_search_area();
    /*dados vazios*/
    if(parseInt(params.status) === 0) {
        receive_no_data(params);
    }
    /*LIMPAR CAMPOS para RECEBER DATA*/
    await empty_search_lines();
    /*listar dados recebidos*/
    listar_receivedRequest(params);
}
/*RECEIVE NO DATA*/
function receive_no_data(params) {
    var placers = area_pesquisa.querySelector("ul");
    const clone = placers.querySelector("li#cloneNode");
    clone.innerHTML = params.msn.toString();
    placers.appendChild(clone);
    return false;
}
/*RECEIVE DATA*/
function receive_data(params) {
    /*CONFIG*/
    var placers = document.querySelector("div#container-results > ul");
    /*PLACE CLONE INTO PLACERS*/
    params.forEach(data => {
        console.log(data);
        const clone = placers.querySelector("li#cloneNode").cloneNode(true);
        const dados = ["<b>Motorista:</b>", data.transportador, " <b>Romaneio:</b>", data.romaneio, "<b>Saída:</b>", data["data-saida"].split("-").reverse().join("/").toString()];
        if(clone.classList.contains("d-none")) clone.classList.remove("d-none");
        clone.removeAttribute("id");
        clone.innerHTML = dados.join(" ");
        clone.dataset.romaneio = data.romaneio;
        clone.dataset.transportador = data.transportador;
        clone.dataset.nfesqtd = data.qtd;
        clone.dataset.vlrbruto = data.diaria;
        clone.dataset.setor = data.setor;
        clone.dataset.saida = data["data-saida"].split("-").reverse().join("/").toString();
        clone.setAttribute("onClick", "select_this_one(this);");
        placers.appendChild(clone);
    });
    /*OCULTA O CLONE*/
    if(placers.querySelector("li#cloneNode").classList.contains("d-none") === false){
        placers.querySelector("li#cloneNode").classList.add("d-none");
    }

}
/*LISTAR SEARCH DATA*/
function listar_receivedRequest(params) {
    const array_pesquisa = params?.data;
    if(array_pesquisa === undefined) receive_no_data(params);
    if(array_pesquisa != undefined) receive_data(array_pesquisa);
}
/*--------------------------------------->INTERAÇÂO PAGINA<---------------------------------------*/
/*LIMPAR LINHAS*/
async function empty_search_lines() {
    var placers = document.querySelector("div#container-results > ul");
    var area_pesquisa = placers.querySelectorAll("li");
    if(area_pesquisa.length != 1) {
        area_pesquisa.forEach(data => {data.remove();});
    }
    await place_clone_again();
}
async function place_clone_again() {
    var placers = document.querySelector("div#container-results > ul");
    if(placers.querySelectorAll("li").length === 0){
        placers.appendChild(document.createElement("li")).id = "cloneNode";
        placers.querySelector("li#cloneNode").classList.add("list-group-item");
    }
}
/*HIDE AREA DE PESQUISA*/
function hide_search_area() {
    var a_pesquisa = area_pesquisa.parentElement.parentElement;
    if(!a_pesquisa.classList.contains("d-none")) return a_pesquisa.classList.add("d-none");
}
/*VISUALIZAR AREA DE PESQUISA*/
function view_search_area() {
    var a_pesquisa = area_pesquisa.parentElement.parentElement;
    if(a_pesquisa.classList.contains("d-none")) return a_pesquisa.classList.remove("d-none");
}
/*PREENCHER DADOS PESQUISA INICIAL*/
async function select_this_one(params) {
    const getDataset = params.dataset;
    /*PLACE Nº ROMANEIO*/
    if(getDataset?.romaneio != null){
        document.querySelector("input#forRomaneios").value = getDataset?.romaneio;
    }
    /*PLACE DATA SAIDA*/
    if(getDataset?.saida != null){
        document.querySelector("input#forSaida").value = getDataset?.saida;
    }
    /*PLACE QTD NFE DO ROMANEIO*/
    if(getDataset?.nfesqtd != null){
        document.querySelector("input#forQtdNotas").value = getDataset?.nfesqtd;
    }
    /*PLACE SETOR NOME*/
    if(getDataset?.setor != null){
        const nome_setor = await getExtented_data(getDataset?.setor, "regioes-transportadas");
        document.querySelector("input#forSetor").value = nome_setor;
        document.querySelector("input#forSetorId").value = getDataset?.setor;
    }
    /*PLACE DIARIA CAMINHAO*/
    if(getDataset?.vlrbruto != null){
        document.querySelector("input#forDiaria").value = getDataset.vlrbruto;
    }
    /*PLACE NOME DO TRANSPORTADOR*/
    if(getDataset?.transportador != null){
        const nome_transportador = await getExtented_data(getDataset?.transportador, "transportadores");
        document.querySelector("input#forMotorista").value = nome_transportador;
        document.querySelector("input#forMotoristaId").value = getDataset?.transportador;
    }
    /*APAGAR DADOS DE PESQUISA*/
    await empty_search_lines();
    /*OCULTAR CAMPO DE PESQUISA*/    
    hide_search_area();
}
/*GET TRANSPORTADOR NOME FORM LISTA*/
async function getExtented_data(params, files) {
    var extended = patternsCadastrarDados();
    extended.module = "logistica"; extended.folder = "jsons";
    extended.file = files; extended.extensions = "json";
    extended.path = createRequestPath(extended);
    /*GET DATA*/
    var nome_extended = "Não Identificado";
    var loud_request = await loudRequest(extended);
    var results = await fetch(loud_request);
    try {
        results = await results?.json();
        const registros = results.dataset[0]?.data;
        registros.forEach(data => {
            if(data.ids === params){
                if(files === "regioes-transportadas") nome_extended = data.regioes;
                if(files === "transportadores") nome_extended = capitalize(data.transportador);
            }            
        });
        return nome_extended;
    } catch (error) {
        console.log("ERRO AO IDENTIFICAR TRANSPORTADOR/ REGIãO");
    }   
}