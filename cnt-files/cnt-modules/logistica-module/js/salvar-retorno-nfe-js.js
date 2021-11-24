/*------------------------------------------------>SET PATTERNS<------------------------------------------------*/
/*PATTERNS*/
function salvarPatterns() {
    var patterns = {};
    patterns.module = "logistica";
    patterns.folder = "core";
    patterns.file = "retornos-nfe";
    patterns.paginations = {};
    patterns.extensions = "php";
    patterns.swit = "";
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*------------------------------------------------>SET PATTERNS<------------------------------------------------*/
var salvarBTN = document.querySelectorAll("button#salvar-registro");
salvarBTN.forEach((action, index) => {
    action.addEventListener("click", salvarRegistroCadastrado);
    console.log("posicao"+index);
});
/*SALVAR REGISTRO CADASTRADO*/
function salvarRegistroCadastrado() {
    var form_cadastro = document.querySelector("form#cadastros");
    let form_elements = form_cadastro.elements;
    var form_data = gerarFormData(form_elements);
    gerar_obj_salvar(form_data);
}
/*--------------------------------------------------->SALVAR<---------------------------------------------------*/
/*GERAR OBJ SALVAR*/
async function gerar_obj_salvar(params) {
    var salvar_patterns = salvarPatterns();
    /*GET OBJECT*/
    var object = gerar_obj_cadastrar();
    var obj_map = Object.fromEntries(params);
    /*GERA DADOS ROMANEIO*/
    var dados_romaneios = await gerarDadosRomaneios(obj_map);
    var xplode_dados_retornos = await xplodeRetornos(obj_map);
    object.dados_romaneios = dados_romaneios;
    object.nfe_retornadas = xplode_dados_retornos;
    salvar_patterns.paginations.entry = object;
    salvar_patterns.swit = "salvar-retornos-nfe";
    sendRequest(salvar_patterns);
}
/*RECEIVE REQUEST*/
function receiveRequest_popup(params, patterns) {
    console.log(params);
}
/*-------------------------------------------------->FORMDATA<--------------------------------------------------*/
function gerar_obj_cadastrar() {
    var cadastrar = {};
    cadastrar.dados_romaneios = {};
    cadastrar.nfe_retornadas = [];
    return cadastrar;
}
/*-------------------------------------------------->GERAR DATA<--------------------------------------------------*/
/*GERAR FORM DATA*/
function gerarFormData(params) {
    var form_data = new Map();
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        const property = element.id.replace("for", "").toLowerCase();
        if(element.tagName != "BUTTON") form_data.set(property, element.value);
    }
    return form_data;
}
/*GET DADOS ROMANEIOS*/
async function gerarDadosRomaneios(params) {
    var nMap = new Map();
    var nArray = ["romaneios","motorista","saida","qtdnotas","setor","setorid","motoristaid","diaria"];
    var data_cadastro = document.querySelector("li#dataCadastro").textContent;
    var hora_cadastro = document.querySelector("li#horaCadastro").textContent;
    Object.keys(params).forEach(data=>{
        if(nArray.includes(data) === true){
            nMap.set(data, params[data]);
        }
    });
    nMap.set("dataCadastro", data_cadastro);
    nMap.set("horaCadastro", hora_cadastro);
    return Object.fromEntries(nMap);
}
/**/
async function xplodeRetornos(params) {
    var map_int = new Map();
    Object.entries(params).forEach(data => {
        const xplode = data[0].split("-");
        if(xplode.length >= 2){
            map_int.set(xplode.join("-"), params[xplode.join("-")]);
        }
    });
    /*TRANSFORMA MAP -> OBJ*/
    var obj_map = Object.fromEntries(map_int);
    /*TRANSFORMA OBJ -> ARRAY*/
    var obj_array = Object.entries(obj_map);
    /*NUMERO DE NFE*/
    var config = config_split_parts(obj_array);    
    var create_obj = create_obj_retornos_nfe(obj_array, config);
    /*CREATE OBJ RETURNS*/
    return create_obj;
}
/*QTD DE LINHAS EXISTENTES*/
function config_split_parts(params) {
    let max = 0;
    var responser = new Map();
    var nArray = [];
    var init = {position: 0};
    nArray.push(init);
    for (let index = 0; index < params.length; index++) {
        const linhas = params[index][0].split("-")[1];        
        if(parseInt(linhas) != max) {
            responser.set("position", index);
            nArray.push(Object.fromEntries(responser));
            max++;
        }
    }
    return nArray;
}
/*SPLIT DATA IN ARRAY*/
function create_obj_retornos_nfe(params, config) {
    var nArray = [];
    for (let index = 0; index < config.length; index++) {
        const settings = config[index].position;
        const max_entries = params.length;
        var nMap = new Map();
        Object.values(params).forEach((data, indice)=>{
            const xplod = data[0].split("-");
            if(settings != 0) {
                if(indice === settings) nMap.clear();
            }
            if(index === parseInt(xplod[1])){
                nMap.set(xplod[0], data[1]);
            }
        });
        nArray.push(Object.fromEntries(nMap));
    }
    return nArray;
}