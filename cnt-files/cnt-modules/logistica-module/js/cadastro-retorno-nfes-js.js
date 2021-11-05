/* New NFes register */

/*OBJ PATTERNS OF MODULE*/
var pattern_details = setNovoRegistroNFEs();
function setNovoRegistroNFEs() {
    var pattern_details = {};
    return pattern_details;
}

/* Return the current number of NFes tables */
function getNumberOfNFes() {
    return document.getElementById("table-container-cadastro-nfe").children.length - 1;
}

init_table();

function init_table() {
    const originalTable =  document.getElementById("table-[index]");
    const tableClone = originalTable.cloneNode(true);
    tableClone.id = "table-0";
    originalTable.classList.add("d-none");
    document.getElementById("table-container-cadastro-nfe").appendChild(tableClone);
}

/* Add new nfe register line */
function add_new_nfe() {
    const index = getNumberOfNFes();
    const originalTable =  document.getElementById("table-[index]");
    // Deeply clone the table
    const tableClone = originalTable.cloneNode(true);
    tableClone.id = "table-" + index;
    const previousTable = document.getElementById("table-" + i);
    // Hide add button and show remove button of the previous table
    //previousTable.querySelector("#add-new-line").classList.add("d-none");
    //previousTable.querySelector("#delete-new-line").classList.remove("d-none");
    tableClone.classList.remove("d-none");
    // Adds the clone to the table container
    document.getElementById("table-container-cadastro-nfe").appendChild(tableClone);
}

/* Remove nfe register line */
function remove_nfe(element) {
    console.log("Remove nfe line");
    element.parentNode.parentNode.parentNode.parentNode.remove();
}

async function fillSelectFilialOptions() {
    const filiais = await getFiliais();
    console.log(filiais);
    filiais.forEach((filialInfo, index) => {
        const optionClone = document.getElementById("filial-[index]").cloneNode();
        optionClone.id="filial-" + index;
        optionClone.textContent = filialInfo.ids + " - " + filialInfo.filial;
        document.getElementById("select-filial").appendChild(optionClone);
    });
}

/* Return an array with of filiais */
async function getFiliais() {
    /* Request config */
    var sentdata = {};
    sentdata.module = "usuarios";
    sentdata.folder = "jsons";
    sentdata.extensions = "json";
    sentdata.file = "filiais";
    sentdata.path = createRequestPath(sentdata);
    var _loadRequest = loudRequest(sentdata);

    try {
        /* Request the data */
        const response = await fetch(_loadRequest);
        const json = await response?.json();
        return json?.dataset[0]?.data;
    } catch (e) {
        console.log("Falha ao buscar dados de filiais -> " + sentdata.file);
    }
}