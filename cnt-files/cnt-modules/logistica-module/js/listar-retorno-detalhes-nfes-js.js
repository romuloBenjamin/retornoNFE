/*OBJ PATTERNS OF MODULE*/
var pattern_details = setRetornosNFEDetailsPatterns();
function setRetornosNFEDetailsPatterns() {
    var pattern_details = {};
    pattern_details.module = "logistica";
    pattern_details.folder = "core";
    pattern_details.file = "retornos-nfe";
    pattern_details.extensions = "php";
    pattern_details.swit = "listar-retornos-nfe";
    pattern_details.paginations = setPaginations(0, false);
    pattern_details.path = createRequestPath(pattern_details);
    return pattern_details;
}

/* Close the NFE details */
function close_details() {
    /* Hide the details container by changing the class */
    const details_container = document.getElementsByClassName("details-container")[0];
    details_container.classList.remove("d-flex");
    details_container.classList.add("d-none");
}

/* SHOW NFE DETAILS */
async function show_details(data, item_index) {
    /* Show the details container by changing the class */
    const details_container = document.getElementsByClassName("details-container")[0];
    details_container.classList.remove("d-none");
    details_container.classList.add("d-flex");

    /* Get nfe and cli data of the selected item from the full data by using the item index */
    const nfe_data = data.data_nfe[item_index];
    const cli_data = data.data_cli[item_index];

    /* Init default vendedor and equipe id */
    let nome_vendedor = "Ex Funcionario";
    let id_equipe = 0;

    /* Search vendedor by using its id */
    const vendedor = await buscar_vendedor(cli_data.vendedor);
    /* If a vendedor was located, capitalize its name and get its equipe id */
    if(vendedor) {
        nome_vendedor = capitalize(vendedor.vendedor);
        id_equipe = vendedor.ids;
    }
    /* Search equipe info */
    const info_equipe = await buscar_info_equipe(id_equipe);

    /* Fill the data in the details container's fields */
    document.getElementById("contact_equipe").innerHTML = info_equipe?.equipe + " - " + info_equipe?.lider;
    document.getElementById("contact_vendedor").innerHTML = cli_data.vendedor + " | " + nome_vendedor;
    document.getElementById("contact_nfe").innerHTML = nfe_data.NF;
    document.getElementById("contact_nfe_emissao").innerHTML = nfe_data.emissao;
    document.getElementById("contact_cliente").innerHTML = cli_data.cod_cliente + " " + cli_data.nome_cliente;
    document.getElementById("contact_motivo").innerHTML = nfe_data.motivoDescription;
    document.getElementById("contact_ocorrenciaData").innerHTML = data.romaneio_saida;
}

/* Search vendedor */
async function buscar_vendedor(id) {
    /* Request config */
    var pattern_details = setRetornosNFEDetailsPatterns();
    pattern_details.paginations.search = {};
    pattern_details.paginations.search["vendedor"] = id;
    pattern_details.file = "usuarios";
    pattern_details.module = "usuarios";
    pattern_details.swit = "listar-usuario-vendedor";
    pattern_details.path = createRequestPath(pattern_details);
    const _loadRequest = loudRequest(pattern_details);
    const formData = new FormData();
    formData.append("entry", JSON.stringify(pattern_details.paginations));
    formData.append("swit", pattern_details.swit);
    const config = {
        method: "POST",
        body: formData
    }
    try {
        /* Request the data */
        const response = await fetch(_loadRequest, config);
        const json = await response.json();
        const data = json.data;
        /* If the request succeeded and there's at least one result, return it */
        if(data && data.length > 0) return data[0];
    } catch (e) {
        console.error("Erro ao buscar usuário/equipe");
    }
}

/* Search equipe info */
async function buscar_info_equipe(id) {
    /* Request config */
    var sentdata = {};
    sentdata.module = "usuarios";
    sentdata.folder = "jsons";
    sentdata.extensions = "json";
    sentdata.file = "equipes";
    sentdata.path = createRequestPath(sentdata);
    var _loadRequest = loudRequest(sentdata);

    /* Init default equipe info (equipe name and lider name) */
    const equipeInfo = {
        equipe: "Sem supervisor",
        lider: "Cristiane"
    }

    /* If the id is 0, return the default values */
    if(id === 0) return equipeInfo;

    try {
        /* Request the data */
        const response = await fetch(_loadRequest);
        const json = await response?.json();
        /* Search the equipe name in the received data */
        const dataItem = json?.dataset[0].data.find(item => item.ids === id);
        /* If the equipe name was found, set it */
        if(dataItem) equipeInfo.equipe = dataItem.equipes.toString().toUpperCase();
        /* If the equipe was not found, return the default equipe info */
        else return equipeInfo;
    } catch (e) {
        console.log("Falha ao buscar dados de equipe -> " + sentdata.file);
    }
    
    /* SEARCH THE EQUIPE LEADER INFO */
    /* Modify the previous request config */
    sentdata.file = "lideres";
    sentdata.path = createRequestPath(sentdata);
    _loadRequest = loudRequest(sentdata);
    try {
        /* Request the data */
        const response = await fetch(_loadRequest);
        const json = await response?.json();
        const dataItem = json?.dataset[0].data.find(item => item.ids === id);
        /* If the equipe leader data was found, set its name */
        if(dataItem) equipeInfo.lider = capitalize(dataItem.lider);
    } catch (e) {
        console.log("Falha ao buscar dados de equipe -> "+ sentdata.file);
    }

    return equipeInfo;
}