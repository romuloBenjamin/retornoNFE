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
var area_pesquisa = document.querySelector("div.cadastro-pesquisa-retorno > div#container-results");
/*CREATE OBJ*/
function createObj_search() {
    /*GET PATTERNS*/
    var patternsCadastrar = patternsCadastrarDados();
    patternsCadastrar.paginations.search = this.value;
    patternsCadastrar.swit = "pesquisar-romaneios"
    if(this?.value === "") {
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
    /*limpar campos para novas entradas*/
    await empty_search_lines();
    params?.data.forEach(data => {
        const dados = ["<b>Motorista:</b>", data.transportador, "<b>Romaneio:</b>", data.romaneio, "<b>Saída:</b>", data["data-saida"].split("-").reverse().join("/").toString()];
        const clone = area_pesquisa.querySelector("li#cloneNode").cloneNode(true);
        if(clone.classList.contains("d-none")) clone.classList.remove("d-none");
        clone.removeAttribute("id");
        clone.innerHTML = dados.join(" ");
        area_pesquisa.querySelector("ul").appendChild(clone);
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
    area_pesquisa.querySelectorAll("ul > li").forEach((data, positions)=>{
        if(positions > 0) return data.remove();
    });
}

/*HIDE AREA DE PESQUISA*/
async function hide_search_area() {
    if(!area_pesquisa.parentElement.classList.contains("d-none")) area_pesquisa.parentElement.classList.add("d-none");
    return;
}

/*VISUALIZAR AREA DE PESQUISA*/
async function view_search_area() {
    if(area_pesquisa.parentElement.classList.contains("d-none")) return area_pesquisa.parentElement.classList.remove("d-none");
    return;
}