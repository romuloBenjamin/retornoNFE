/*OBJ PATTERNS OF MODULE*/
var patterns = setRetornosNFEPatterns();
function setRetornosNFEPatterns() {
    var patterns = {};
    patterns.module = "logistica";
    patterns.folder = "core";
    patterns.file = "retornos-nfe";
    patterns.extensions = "php";
    patterns.swit = "listar-retornos-nfe";
    patterns.paginations = setPaginations(0, false);
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*-------------------------->SEND REQUEST DATA<--------------------------*/
/*DEFAULT DATA LISTAR REGISTROS -> SEND REQUEST*/
console.log(patterns);
var sendRequest = sendRequest(patterns);
/*ONCHANGE DATA LISTAR REGISTROS -> SEND REQUEST*/
//var listarRegistros = document.querySelector("select#forListar");

/*-------------------------->RECEIVE REQUEST DATA<--------------------------*/
/*RECIEVE REQUEST*/
function receiveRequest(params, patterns) {
    /*SET LOOPDATA*/
    var loops = params.data;
    /*SET PLACERS*/
    var placers = document.querySelector("table#table-retorno-nfe > tbody");
    /*BUILD VIEWER*/
    var build_loopdata = build_loopRequest(loops, placers);
    /*PREPARE PAGINATIONS*/
    patterns.swit = "listar-retronos-nfe-paginations";
    var setDefaultPaginations = prepare_paginations(patterns, false);
}
/*VIEW RECEIVE REQUEST IN FOREACH LOOP*/
function build_loopRequest(params, placers) {
    i = 1;
    Object.values(params).forEach(data => {
        //console.log(data);
        /*SET CLONE*/
        const clone = placers.querySelector("tr#cloneNode").cloneNode(true);
        /*REMOVE ID FROM CLONE*/
        clone.id = ""; clone.removeAttribute("id");
        clone.querySelectorAll("td")[0].innerHTML = "#"+i.toString().padStart(2,"0");
        clone.querySelectorAll("td")[1].innerHTML = data.cadastro_data;
        clone.querySelectorAll("td")[2].innerHTML = data.agregado_id;
        clone.querySelectorAll("td")[3].innerHTML = data.romaneio_registro;
        clone.querySelectorAll("td")[4].innerHTML = data.romaneio_saida;
        listar_regiao(data.setor_id, clone.querySelectorAll("td")[5]);
        clone.querySelectorAll("td")[6].innerHTML = "not implemented";
        clone.querySelectorAll("td")[7].innerHTML = "<div id=\"placers-nfes\" class=\"container-nfes-data\">"+listar_retornos(data.data_nfe)+"</div>";
        clone.querySelectorAll("td")[8].innerHTML = "not implemented";
        clone.querySelectorAll("td")[9].innerHTML = "not implemented";
        placers.appendChild(clone);
        i++;
    });
    /*REMOVE CLONE*/
    if(!placers.querySelector("tr#cloneNode").classList.contains("d-none")) placers.querySelector("tr#cloneNode").classList.add("d-none");
}

/*LISTAR RETORNOS DE NFE*/
function listar_retornos(params) {
    console.log("log");
    var retornos = [];
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        retornos.push("<ul class=\"list-group\"><li class=\"list-group-item\"><strong>NF:</strong>"+element.NF+" <strong>MOTIVO:</strong> "+element.motivo+"</li></ul>")
    }
    return retornos.join("");
}
/*LISTAR NFES*/
function listar_regiao(params, clone) {
    var patterns = setRetornosNFEPatterns();
    patterns.folder = "jsons"; patterns.file = "regioes-transportadas"; patterns.extensions = "json";
    patterns.path = createRequestPath(patterns);
    /*CONECT TO LISTAS*/
    var loud_listas = loudListas(patterns);
    fetch(loud_listas)
        .then(response => response.json())
        .then(data => {
            const regioes = data.dataset[0].data;
            regioes.forEach(regs => {
                if(parseInt(params) === parseInt(regs.ids)) clone.innerHTML = regs.regioes.toString().toUpperCase();
            });
        })
        .catch(()=>{console.log("erro ao gerar o Regiao transportada");});  
}