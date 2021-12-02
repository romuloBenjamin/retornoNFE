/*OBJ PATTERNS OF MODULE*/
function setRetornosNFEPatterns() {
    var patterns = {};
    patterns.module = "logistica";
    patterns.folder = "core";
    patterns.file = "retornos-nfe";
    patterns.extensions = "php";
    patterns.swit = "listar-retornos-nfe";
    patterns.paginations = setPaginations();
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*-------------------------->SEND REQUEST DATA<--------------------------*/
/*DEFAULT DATA LISTAR REGISTROS -> SEND REQUEST*/
function prepare_sendRequest() {
    var patterns = setRetornosNFEPatterns();
    sendRequest(patterns);
}
prepare_sendRequest();
/*-------------------------->RECEIVE REQUEST DATA<--------------------------*/
/*RECIEVE REQUEST*/
async function receiveRequest_listar_nfe(params, patterns) {
    /*PRIMARY RESULTSET*/
    if(patterns.paginations?.search === undefined){
        /*SET LOOPDATA*/
        var loops = params.data;
        /*SET PLACERS*/
        var placers = document.querySelector("table#table-retorno-nfe > tbody");
        //console.log(params);
        build_loopRequest(loops, placers);
    }
    /*SEARCH RESULTSET*/
    if(patterns.paginations?.search != undefined){
        await emptySearch();
        /*SET LOOPDATA*/
        var loops = params.data;
        /*SET PLACERS*/
        var placers = document.querySelector("table#table-retorno-nfe > tbody");
        //console.log(params);
        build_loopRequest(loops, placers);
    }
    /*START PAGINATIONS*/
    prepare_paginations(patterns);    
}

/*VIEW RECEIVE REQUEST IN FOREACH LOOP*/
async function build_loopRequest(params, placers) {
    i = 1;
    for(let data of Object.values(params)) {
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
        let motoristaName = await getExtented_data(data.agregado_id, "transportadores");
        if(!motoristaName) motoristaName = "Motorista não encontrado";
        clone.querySelectorAll("td")[2].innerHTML = motoristaName;
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
    }
    /*REMOVE CLONE*/
    if(!placers.querySelector("tr#cloneNode").classList.contains("d-none")) placers.querySelector("tr#cloneNode").classList.add("d-none");
}
/*LISTAR RETORNOS DE NFE*/
function listar_retornos(params) {
    var retornos = [];
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        retornos.push(
            "<ul class=\"list-group\">"
                + "<li class=\"list-group-item\">"
                    + "<strong>NF: </strong>" + element.NF + "<strong> MOTIVO:</strong> " + parseInt(element.motivo) + "<br>"
                    + "<small>" + element.motivo_nome + "</small>"
                + "</li>"
            + "</ul>");
    }
    return retornos.join("");
}

/*LISTAR EMPTY DATA NFE*/
async function emptySearch() {
    var placers = document.querySelector("table#table-retorno-nfe > tbody");
    var removeLines = placers.querySelectorAll("tr");
    removeLines.forEach((rem, indice) => {
        if(indice != 0) rem.remove();
    });
    return;
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