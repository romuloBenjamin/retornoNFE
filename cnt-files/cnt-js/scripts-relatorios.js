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
        await create_array_uniques(set_data);
    }
}
/*NO DATA AVALIBLE*/
function noDataDisponivel(params) {
    var placers = document.querySelector("section#conteudoRelatorio");
    var no_data = "<div class=\"d-flex justify-content-center\"><span class=\"alert alert-warning\">"+params.split(" -> ")[0]+"</span></div>";
    placers.innerHTML = no_data;
}
/*--------------------------------------------------------->FACTORY<---------------------------------------------------------*/
/*AJUSTAR PARA ENTRADAS UNICAS EM ARRAY*/
async function create_array_uniques(params) {
    var nArray = [];
    var in_array = ["uirn_notas_retorno","uirn_notas_cliente"];
    if(params != undefined) {
        for (let index = 0; index < params.length; index++) {
            const array_obj = params[index];
            var obj_primary = new Map();
            Object.keys(array_obj).forEach(tags => {
                /*ENTRADAS SEM MULTI DATA*/
                if(!in_array.includes(tags)) obj_primary.set(tags, array_obj[tags]);
                /*ENTRADA COM MULTI DATA*/
                if(in_array.includes(tags)) {
                    const data_cli = array_obj["uirn_notas_cliente"];
                    const data_nfe = array_obj["uirn_notas_retorno"];
                    if(data_cli.length != data_nfe.length) create_array_diff(array_obj[tags]);
                    if(data_cli.length === data_nfe.length) {
                        for (let index = 0; index < data_nfe.length; index++) {
                            console.log(data_cli[index]);
                            console.log(data_nfe[index]);
                        }
                    }
                }
            });
        }
    }
    //console.log(nArray);
}
/*ARRAY DIFF*/
async function create_array_diff(params) {
    console.log(params);
    return;
}