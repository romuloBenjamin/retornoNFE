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
//console.log(patterns);
var send_request = pre_sendRequest("retornoNFE");
var send_request_paginations = pre_sendRequest("Paginations");

/*PRE SEND REQUEST*/
async function pre_sendRequest(str) {
    var patterns = setRetornosNFEPatterns();
    if(str === "Paginations") patterns.swit = "listar-retronos-nfe-paginations";
    await sendRequest(patterns);
}
/*ONCHANGE DATA LISTAR REGISTROS -> SEND REQUEST*/
//var listarRegistros = document.querySelector("select#forListar");

/*-------------------------->RECEIVE REQUEST DATA<--------------------------*/
/*RECIEVE REQUEST*/
async function receiveRequest(params, patterns, search = false) {
    /*IF EMPTY DATA*/
    if(params.data.length === 0) return emptySearch(params, true);
    if(params.data.length > 0) {
        if(search === true) emptySearch(params);
        /*SET LOOPDATA*/
        var loops = params.data;
        /*SET PLACERS*/
        var placers = document.querySelector("table#table-retorno-nfe > tbody");
        //console.log(params);
        /*BUILD VIEWER*/
        if(search === false) var build_loopdata = build_loopRequest(loops, placers);
        if(search === true) {
            var build_loopdata = build_loopRequest(loops, placers);
            return false;
        }
    } 
}
/*VIEW RECEIVE REQUEST IN FOREACH LOOP*/
function build_loopRequest(params, placers) {
    i = 1;
    Object.values(params).forEach(data => {
        /*SET CLONE*/
        const clone = placers.querySelector("tr#cloneNode").cloneNode(true);
        /*REMOVE ID FROM CLONE*/
        clone.id = ""; clone.removeAttribute("id");
        /*IF EXIST CLASS IN CLONE*/
        if(clone.classList.contains("d-none") === true) {
            clone.classList.remove("d-none");
            clone.removeAttribute("class");
        }
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
        /*ADD SHOW DATA ON CLICK EVENT ON EACH ELEMENT*/
        const items = clone.querySelectorAll("td")[7].getElementsByClassName('list-group-item');
        for(let j = 0; j < items.length; j++) {
            items[j].addEventListener('click', () => show_details(data, j));
        }
        i++;
    });
    /*REMOVE CLONE*/
    if(!placers.querySelector("tr#cloneNode").classList.contains("d-none")) placers.querySelector("tr#cloneNode").classList.add("d-none");
}

/*LISTAR RETORNOS DE NFE*/
function listar_retornos(params) {
    var retornos = [];
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        retornos.push("<ul class=\"list-group\"><li class=\"list-group-item\"><strong>NF:</strong>"+element.NF+" <strong>MOTIVO:</strong> "+element.motivo+"</li></ul>")
    }
    return retornos.join("");
}

/*LISTAR EMPTY DATA NFE*/
function emptySearch(params, mode = false) {
    var placers = document.querySelector("table#table-retorno-nfe > tbody");
    var removeLines = placers.querySelectorAll("tr");
    for (let index = 1; index < removeLines.length; index++) {
        const rem = removeLines[index];
        rem.remove();
    }
    /*IF MODE FALSE*/
    if(mode === true){
        placers.appendChild(document.createElement("tr")).setAttribute("id", "emptySearch");
        placers.querySelector("tr#emptySearch").innerHTML = "<td colspan=\"10\"><span class=\"d-flex alert alert-warning w-100\">"+params.msn.split("->")[0]+"</span></td>";
    }
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