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
function createObj_search() {
    /*GET PATTERNS*/
    var patternsCadastrar = patternsCadastrarDados();
    patternsCadastrar.paginations.search = this.value;
    patternsCadastrar.swit = "pesquisar-romaneios"
    if(this?.value === "") {
        console.log("empty");
        empty_search_lines();
        hide_search_area();
        return;
    }
    /*SEND DATA*/
    if(this?.value != "") sendRequest(patternsCadastrar);
}
/*------------------------------->RECEIVE OBJECT SEARCH<-------------------------------*/
/*RECEIVE OBJ*/
async function receiveRequest(params, patterns) {
    /*IF PLACER IS 'D-NONE'*/
    view_search_area();
    /*dados vazios*/
    if(parseInt(params.status) === 0) {
        await receive_no_data(params);
        return;
    }
    /*LIMPAR CAMPOS para RECEBER DATA*/
    await empty_search_lines();
    /*listar dados recebidos*/
    await listar_receivedRequest(params);
}
/*RECEIVE NO DATA*/
async function receive_no_data(params) {
    var placers = area_pesquisa.querySelector("ul");
    const clone = placers.querySelector("li#cloneNode");
    clone.innerHTML = params.msn.toString();
    placers.appendChild(clone);
}
/*LISTAR SEARCH DATA*/
async function listar_receivedRequest(params) {
    const dataLI = params?.data;
    var placers = area_pesquisa.querySelector("ul");
    /*VALUE RETURNED*/
    dataLI.forEach(data => {
        const dados = ["<b>Motorista:</b>", data.transportador, "<b>Romaneio:</b>", data.romaneio, "<b>Saída:</b>", data["data-saida"].split("-").reverse().join("/").toString()];
        const clone = area_pesquisa.querySelector("li#cloneNode").cloneNode(true);
        if(clone.classList.contains("d-none")) clone.classList.remove("d-none");
        clone.removeAttribute("id");
        clone.innerHTML = dados.join(" ");
        clone.dataset.romaneio = data.romaneio;
        clone.dataset.transportador = data.transportador;
        clone.dataset.nfesqtd = data.qtd;
        clone.dataset.setor = data.setor;
        clone.dataset.saida = data["data-saida"].split("-").reverse().join("/").toString();
        clone.setAttribute("onClick", "select_this_one(this);");
        placers.appendChild(clone);
    });
    /*OCULTA O CLONE*/
    if(area_pesquisa.querySelector("li#cloneNode").classList.contains("d-none") === false){
        area_pesquisa.querySelector("li#cloneNode").classList.add("d-none");
    }
    return;
}
/*--------------------------------------->INTERAÇÂO PAGINA<---------------------------------------*/
/*LIMPAR LINHAS*/
async function empty_search_lines() {
    var a_pesquisa = area_pesquisa.querySelectorAll("ul > li");
    if(a_pesquisa.length > 1) {
        a_pesquisa.forEach((data, index) => { if(index != 0) data.remove(); })
    }
    return;
}
/*HIDE AREA DE PESQUISA*/
async function hide_search_area() {
    var a_pesquisa = area_pesquisa.parentElement.parentElement;
    if(!a_pesquisa.classList.contains("d-none")) return a_pesquisa.classList.add("d-none");
    return;
}
/*VISUALIZAR AREA DE PESQUISA*/
async function view_search_area() {
    var a_pesquisa = area_pesquisa.parentElement.parentElement;
    if(a_pesquisa.classList.contains("d-none")) return a_pesquisa.classList.remove("d-none");
    return;
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
    }
    /*PLACE NOME DO TRANSPORTADOR*/
    if(getDataset?.transportador != null){
        const nome_transportador = await getExtented_data(getDataset?.transportador, "transportadores");
        document.querySelector("input#forMotorista").value = nome_transportador;
    }
    /*APAGAR DADOS DE PESQUISA*/
    empty_search_lines();
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