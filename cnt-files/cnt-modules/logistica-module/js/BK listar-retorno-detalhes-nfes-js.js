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

/* SHOW NFE DETAILS */
async function show_details(data, item_index) {
    const details_container = document.getElementsByClassName("details-container")[0];
    details_container.classList.remove("d-none");
    details_container.classList.add("d-flex");

    const nfe_data = data.data_nfe[item_index];
    const cli_data = data.data_cli[item_index];
    
    const vendedor = await buscar_vendedor("vendedor", cli_data.vendedor);
    let nome_vendedor = "Ex Funcionario";
    if(vendedor) {
        nome_vendedor = capitalize(vendedor.vendedor);
    }
    var id_equipe = vendedor?.ids
    if(id_equipe === undefined) id_equipe = 0;
    var info_equipe = await buscar_info_equipe(id_equipe);
    //console.log(info_equipe);

    document.getElementById("contact_equipe").innerHTML = info_equipe?.equipe + " - " + info_equipe?.lider;
    document.getElementById("contact_vendedor").innerHTML = cli_data.vendedor + " | " + nome_vendedor;
    document.getElementById("contact_nfe").innerHTML = nfe_data.NF;
    document.getElementById("contact_nfe_emissao").innerHTML = nfe_data.emissao;
    document.getElementById("contact_cliente").innerHTML = cli_data.cod_cliente + " " + cli_data.nome_cliente;
    document.getElementById("contact_motivo").innerHTML = nfe_data.motivo;
    document.getElementById("contact_ocorrenciaData").innerHTML = data.romaneio_saida;
}

/* Search vendedor */
async function buscar_vendedor(property, id) {
    var pattern_details = setRetornosNFEDetailsPatterns();
    pattern_details.paginations.search = {};
    pattern_details.paginations.search[property] = id;
    pattern_details.file = "usuarios";
    pattern_details.module = "usuarios";
    pattern_details.swit = "listar-usuario-vendedor";
    pattern_details.path = createRequestPath(pattern_details);
    if(property === "vendedor") {
        var formData = new FormData();
        formData.append("entry", JSON.stringify(pattern_details.paginations));
        formData.append("swit", pattern_details.swit);
        var config = {
            method: "POST",
            body: formData
        }
        var _loadRequest = loudRequest(pattern_details);
        try {
            const response = await fetch(_loadRequest, config);
            const json = await response.json();
            const data = json.data;
            if(data && data.length > 0) return data[0];
            return null;
        } catch (e) {
            console.error("Erro ao buscar usuário/equipe");
        }
    }
}

/* Buscar informações de equipe */
async function buscar_info_equipe(id) {
    var sentdata = {};
    sentdata.module = "usuarios";
    sentdata.folder = "jsons";
    sentdata.extensions = "json";
    sentdata.file = "equipes";
    sentdata.path = createRequestPath(sentdata);

    if(id === 0) return {equipe: "Sem Supervisor", lider: "Cristiane"};
    
    var _loadRequest = loudRequest(sentdata);
    let equipe;
    try {
        const response = await fetch(_loadRequest);
        const json = await response.json();
        const dataItem = json.dataset[0].data.find(item => item.ids === id);
        equipe = dataItem.equipes.toUpperCase();
    } catch (e) {
        console.log("Falha ao buscar dados de equipe -> "+ sentdata.file);
        return null;
    }
    
    /* Buscar líder da equipe */
    sentdata.file = "lideres";
    sentdata.path = createRequestPath(sentdata);
    _loadRequest = loudRequest(sentdata);
    let lider = "Sem supervisor | Cristiane";
    try {
        const response = await fetch(_loadRequest);
        const json = await response.json();
        const dataItem = json.dataset[0].data.find(item => item.ids === id);
        if(dataItem) {
            lider = capitalize(dataItem.lider);
        }
    } catch (e) {
        console.log("Falha ao buscar dados de equipe -> "+ sentdata.file);
    }

    return {
        equipe,
        lider
    };
}