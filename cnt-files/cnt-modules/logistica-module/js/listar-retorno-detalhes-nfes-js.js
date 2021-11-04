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
    console.log(data);
    const details_container = document.getElementsByClassName("details-container")[0];
    details_container.classList.remove("d-none");
    details_container.classList.add("d-flex");
    const nfe_data = data.data_nfe[item_index];
    const cli_data = data.data_cli[item_index];

    var vendedor = await buscar_vendedor("vendedor", cli_data.vendedor);
    console.log(vendedor);
    var nome_vendedor = "Ex Funcionário";
    if(vendedor) {
        vendedor_split = vendedor.vendedor.split(" ");
        var n_map = [];
        vendedor_split.forEach(name => {
            n_map.push(name.charAt(0).toString().toUpperCase() + name.slice(1));
        });
        nome_vendedor = n_map.join(" ");
    }
    var id_equipe = vendedor.ids;
    console.log(id_equipe);

    document.getElementById("contact_equipe").innerHTML = "NA";
    document.getElementById("contact_vendedor").innerHTML = cli_data.vendedor + " " + nome_vendedor;
    document.getElementById("contact_nfe").innerHTML = nfe_data.NF;
    document.getElementById("contact_nfe_emissao").innerHTML = nfe_data.emissao;
    document.getElementById("contact_cliente").innerHTML = cli_data.cod_cliente + " " + cli_data.nome_cliente;
    document.getElementById("contact_motivo").innerHTML = nfe_data.motivo;
    document.getElementById("contact_ocorrenciaData").innerHTML = "NA";
}

async function buscar_vendedor(property, id) {
    var pattern_details = setRetornosNFEDetailsPatterns();
    pattern_details.paginations.search = {};
    pattern_details.paginations.search[property] = id;
    pattern_details.file = "usuarios";
    pattern_details.module = "usuarios";
    pattern_details.swit = "listar-usuario-vendedor";
    pattern_details.path = createRequestPath(pattern_details);
    console.log(pattern_details);
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