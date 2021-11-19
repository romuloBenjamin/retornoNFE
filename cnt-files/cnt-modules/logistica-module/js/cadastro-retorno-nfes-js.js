/* New NFes register */

/*OBJ PATTERNS OF MODULE*/
var pattern_details = setNovoRegistroNFEs();
function setNovoRegistroNFEs() {
    const pattern_details = {};
    return pattern_details;
}

const init = () => {
    // Init the starting register nfe table line
    addNewNfe();
}

init();

/* Return the current number of NFes tables */
function getNumberOfNFes() {
    return document.getElementsByClassName("table-new-registro").length - 1;
}

function setMotivoIdsAndListeners(tableClone, id) {
    const motivoContainer = tableClone.querySelector("#motivoContainer");
    motivoContainer.id = motivoContainer.id + id;
    // Add on key up event on motivo input
    motivoContainer.querySelector("#motivoInput").addEventListener('keyup', (e) => setMotivo(e.currentTarget));
}

/* Add new nfe register line */
function addNewNfe() {
    const originalTable =  document.querySelector("table", "#tableNewRegistroCloneNode");
    // Deeply clone the table
    const tableClone = originalTable.cloneNode(true);
    // Hide the original table
    originalTable.classList.add("d-none");
    const index = getNumberOfNFes();
    tableClone.id = "table-" + index;

    // Add on click event listeners on add/remove nfe table buttons
    tableClone.querySelector("#addNFETable").addEventListener('click', addNewNfe);
    tableClone.querySelector("#deleteNFETable").addEventListener('click', (e) => deleteNfe(e.currentTarget));

    setMotivoIdsAndListeners(tableClone, index);

    // Add on key up event on cliente input
    tableClone.querySelector("#clienteInput").addEventListener('keyup', (e) => setCliente(e.currentTarget));

    // Put the on click event listener on the filial select element
    tableClone.getElementsByTagName("select")[0].addEventListener('click', onEmpresaSelectClick);

    // Get all the tables
    const tables = document.getElementsByClassName("table-new-registro");
    // If there's more than one, select the previous table
    if(tables.length > 1) {
        const previousTable = tables[tables.length-1];
        // Hide add button and show remove button
        previousTable.querySelector("#addNFETable").classList.add("d-none");
        previousTable.querySelector("#deleteNFETable").classList.remove("d-none");
    }
    
    // Adds the clone to the table container
    document.getElementById("table-container-cadastro-nfe").appendChild(tableClone);
    // Show the new table
    tableClone.classList.remove("d-none");
}

/* Remove nfe register line table */
function deleteNfe(element) {
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
    console.log(element)
    // Get the motivo view
    const motivoView = element.parentNode.querySelector("#motivoView");
    if(motivoView) {
        // Get the motivos from json data
        const motivos = await getJsonData("logistica", "motivos-retorno-nfe");
        motivos?.forEach(motivo => {
            // If it matches the code, set it
            if(motivo.ids === element.value) motivoView.innerText = motivo.motivo;
        });
        // Show the motivos view
        motivoView.classList.remove("d-none");
        if(parseInt(element.value) === 3) {
            const liberadoPor = motivoView.parentNode.parentNode.parentNode.querySelector("#liberadoPor");
            liberadoPor.classList.remove("d-none");
            console.log(liberadoPor);
        }
    }
}

async function setCliente(element) {
    // Get the motivo view
    const clienteView = element.parentNode.querySelector("#clienteView");
    if(clienteView) {
        console.log("setCliente")
        // Get the motivos from json data
        /*
        const clientes = await getJsonData("logistica", "motivos-retorno-nfe");
        clientes?.forEach(motivo => {
            // If it matches the code, set it
            if(clientes.ids === element.value) clienteView.innerText = clientes.motivo;
        });
        // Show the motivos view
        clienteView.classList.remove("d-none");
        */
    }
}