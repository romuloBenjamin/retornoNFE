/* New NFes register */

/*OBJ PATTERNS OF MODULE*/
var pattern_details = setNovoRegistroNFEs();
function setNovoRegistroNFEs() {
    const pattern_details = {};
    return pattern_details;
}

// Init the starting register nfe table line
add_new_nfe();

/* Return the current number of NFes tables */
function getNumberOfNFes() {
    return document.getElementsByClassName("table-new-registro").length - 1;
}

/* Add new nfe register line */
function add_new_nfe() {
    const index = getNumberOfNFes();
    const originalTable =  document.querySelector("table", "#table-[index]");
    // Deeply clone the table
    const tableClone = originalTable.cloneNode(true);
    // Hide the original table
    originalTable.classList.add("d-none");
    tableClone.id = "table-" + index;
    // Put the on click event listener on the filial select element
    tableClone.getElementsByTagName("select")[0].addEventListener('click', onEmpresaSelectClick);
    // Get all the tables
    const tables = document.getElementsByClassName("table-new-registro");
    // If there's more than one, select the previous table
    if(tables.length > 1) {
        const previousTable = tables[tables.length-1];
        // Hide add button and show remove button
        previousTable.querySelector("#add-new-line").classList.add("d-none");
        previousTable.querySelector("#delete-new-line").classList.remove("d-none");
    }
    tableClone.classList.remove("d-none");
    // Adds the clone to the table container
    document.getElementById("table-container-cadastro-nfe").appendChild(tableClone);
}

/* Remove nfe register line table */
function remove_nfe(element) {
    // element (button) > td > tr > tbody > table
    element.parentNode.parentNode.parentNode.parentNode.remove();
}

// Receives a module and a file and returns its data
async function getJsonData(module, file) {
    /* Request config */
    const requestData = {};
    requestData.module = module;
    requestData.folder = "jsons";
    requestData.extensions = "json";
    requestData.file = file;
    requestData.path = createRequestPath(requestData);
    const request = loudRequest(requestData);
    try {
        /* Request the data */
        const response = await fetch(request);
        const json = await response?.json();
        return json?.dataset[0]?.data;
    } catch (e) {
        console.log("Falha ao buscar dados de filiais -> " + requestData.file);
    }
    return null;
}

// Set the motivo that matches the selected code
async function setMotivo(element) {
    // Get the motivo view
    const motivoView = element.parentNode.querySelector("#motivo-view");
    if(motivoView) {
        // Get the motivos from json data
        const motivos = await getJsonData("logistica", "motivos-retorno-nfe");
        motivos?.forEach(motivo => {
            // If it matches the code, set it
            if(motivo.ids === element.value) motivoView.innerText = motivo.motivo;
        });
        // Show the motivos view
        motivoView.classList.remove("d-none");
    }
}