/* New NFes register */

/*OBJ PATTERNS OF MODULE*/
function patternNovoRegistro() {
    const pattern_details = {};
    return pattern_details;
}

const AVARIAS_CONTAINER_PLACER_ID = "avariasContainerPlacer";
// Buttons
const ADD_NFE_BUTTON_ID = "addNFEButton";
const DELETE_NFE_BUTTON_ID = "deleteNFEButton";
const SHOW_AVARIAS_BUTTON_ID = "showAvariasButton";
// Views
const NOME_CLIENTE_VIEW_ID = "nomeClienteView";
const MOTIVO_DESC_VIEW_ID = "motivoDescView";
// Hidden views
const DATA_DE_PARA_VIEW_ID = "dataDeParaView";
const HORA_DE_PARA_VIEW_ID = "horaDeParaView";
const LIBERADO_POR_VIEW_ID = "liberadoPorView";
const NFES_RETORNADAS_VIEW_ID = "nfesRetornadasView";
const DESCONTO_VIEW_ID = "descontoView";
// Inputs
const NFE_INPUT_ID = "nfeInput";
const EMISSAO_INPUT_ID = "emissaoInput";
const COD_CLIENTE_INPUT_ID = "codClienteInput";
const COD_MOTIVO_INPUT_ID = "codMotivoInput";
const VENDEDOR_INPUT_ID = "vendedorInput";
// Hidden Inputs
const DATA_RETORNO_DE_INPUT_ID = "dataRetornoDeInput";
const DATA_RETORNO_PARA_INPUT_ID = "dataRetornoParaInput";
const HORA_RETORNO_DE_INPUT_ID = "horaRetornoDeInput";
const HORA_RETORNO_PARA_INPUT_ID = "horaRetornoParaInput";
const LIBERADO_POR_INPUT_ID = "liberadoPorInput";
const NFES_RETORNADAS_INPUT_ID = "nfesRetornadasInput";
const DESCONTO_INPUT_ID = "descontoInput";

// Append the passed suffix to the element id
function appendSuffixToElementId(elementId, container, suffix) {
    const element = container.querySelector("#" + elementId);
    element.id += suffix;
}

// Append the passed suffix to the input id and name
function appendSuffixToInput(elementId, container, suffix) {
    const input = container.querySelector("#" + elementId);
    input.id += suffix;
    input.name += suffix;
}

/* Add new nfe register line */
function addNewNfe() {
    const originalContainer =  document.querySelector("#newRegistroNFEContainerCloneNode");
    // Deeply clone the table
    const containerClone = originalContainer.cloneNode(true);
    // Hide the original table
    originalContainer.classList.add("d-none");

    const containers = document.getElementsByClassName("new-registro-nfe-container");
    const amount = containers.length;
    let index = 0;

    // If there's more than one, select the previous table
    if(amount > 1) {
        const previous = containers[amount - 1];
        // Set index as next integer
        index = parseInt(previous.id.split("-")[1]) + 1;
        // Hide add button and show remove button
        previous.querySelector(".add-nfe-btn").classList.add("d-none");
        previous.querySelector(".delete-nfe-btn").classList.remove("d-none");
    }

    // Add the id to the elements
    const idSuffix = "-" + index;
    containerClone.id = containerClone.id.replace("CloneNode", "") + idSuffix;
    appendSuffixToInput(DATA_RETORNO_DE_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(DATA_RETORNO_PARA_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(HORA_RETORNO_DE_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(HORA_RETORNO_PARA_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(LIBERADO_POR_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(NFES_RETORNADAS_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(DESCONTO_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(NFE_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(EMISSAO_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(COD_CLIENTE_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(COD_MOTIVO_INPUT_ID, containerClone, idSuffix);
    appendSuffixToInput(VENDEDOR_INPUT_ID, containerClone, idSuffix);
    appendSuffixToElementId(AVARIAS_CONTAINER_PLACER_ID, containerClone, idSuffix);
    appendSuffixToElementId(ADD_NFE_BUTTON_ID, containerClone, idSuffix);
    appendSuffixToElementId(DELETE_NFE_BUTTON_ID, containerClone, idSuffix);
    appendSuffixToElementId(SHOW_AVARIAS_BUTTON_ID, containerClone, idSuffix);
    appendSuffixToElementId(NOME_CLIENTE_VIEW_ID, containerClone, idSuffix);
    appendSuffixToElementId(MOTIVO_DESC_VIEW_ID, containerClone, idSuffix);
    appendSuffixToElementId(DATA_DE_PARA_VIEW_ID, containerClone, idSuffix);
    appendSuffixToElementId(HORA_DE_PARA_VIEW_ID, containerClone, idSuffix);
    appendSuffixToElementId(LIBERADO_POR_VIEW_ID, containerClone, idSuffix);   
    appendSuffixToElementId(NFES_RETORNADAS_VIEW_ID, containerClone, idSuffix);
    appendSuffixToElementId(DESCONTO_VIEW_ID, containerClone, idSuffix);

    // Add event listeners
    containerClone.querySelector("#" + ADD_NFE_BUTTON_ID + idSuffix).addEventListener('click', addNewNfe, false);
    containerClone.querySelector("#" + DELETE_NFE_BUTTON_ID + idSuffix).addEventListener('click', deleteNfe, false);
    containerClone.querySelector("#" + COD_MOTIVO_INPUT_ID + idSuffix).addEventListener('input', (e) => setMotivo(e.currentTarget), false);
    containerClone.querySelector("#" + COD_CLIENTE_INPUT_ID + idSuffix).addEventListener('input', (e) => setCliente(e.currentTarget), false);
    containerClone.getElementsByTagName("select")[0].addEventListener('click', onEmpresaSelectClick, false);
    
    // Adds the clone to the table container
    document.getElementById("newRegistroNFEsContainer").appendChild(containerClone);
    // Show the new table
    containerClone.classList.remove("d-none");
    containerClone.scrollIntoView();
}

/* Remove nfe register line table */
function deleteNfe(element) {
    const index = element.currentTarget.id.split("-")[1];
    document.querySelector("#newRegistroNFEContainer-" + index).remove();
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

// Show the table column with the passed id
function showElement(name, index) {
    const element = document.querySelector("#" + name + "-" + index);
    element.classList.remove("d-none");
}

// Hide the table column with the passed id
function hideElement(name, index) {
    const element = document.querySelector("#" + name + "-" + index);
    element.classList.add("d-none");
}

// Set the motivo that matches the selected code
async function setMotivo(element) {
    const index = element.id.split("-")[1];
    // Get the motivo view
    const motivoDescView = document.querySelector("#" + MOTIVO_DESC_VIEW_ID + "-" + index);
    // Get the motivos from json data
    const motivos = await getJsonData("logistica", "motivos-retorno-nfe");
    motivos?.some(motivo => {
        // If it matches the code, set it
        if(motivo.ids === element.value){
            motivoDescView.innerText = motivo.motivo;
            return true; // stop loop
        }
        return false;
    });
    // Show the motivos view
    motivoDescView.parentNode.classList.remove("d-none");
    motivoDescView.parentNode.classList.add("d-flex");
    const value = parseInt(element.value);
    // Hide currently displayed views
    hideElement(SHOW_AVARIAS_BUTTON_ID, index);
    hideAvariaOptions(index);
    hideElement(LIBERADO_POR_VIEW_ID, index);
    hideElement(HORA_DE_PARA_VIEW_ID, index);
    hideElement(DATA_DE_PARA_VIEW_ID, index);
    hideElement(NFES_RETORNADAS_VIEW_ID, index);
    // Show the views according to the code of the motivo
    if(value === 3 || value === 6 || value === 10 || value === 14 || value === 18 || value === 19) showElement(LIBERADO_POR_VIEW_ID, index);
    if(value === 6 || value === 7 || value === 8) showElement(HORA_DE_PARA_VIEW_ID, index);
    if(value === 12 || value === 13) showElement(NFES_RETORNADAS_VIEW_ID, index);
    if(value === 17 || value === 20) {
        showElement(SHOW_AVARIAS_BUTTON_ID, index);
        showAvariaOptions(index);
    }
    if(value === 19) showElement(DATA_DE_PARA_VIEW_ID, index);
}

async function setCliente(element) {
    const index = element.id.split("-")[1];
    // Get the motivo view
    const nomeClienteView = element.parentNode.querySelector("#" + NOME_CLIENTE_VIEW_ID + "-" + index);
    console.log("setCliente")
    nomeClienteView.innerText = "Nome do cliente";
    // Get the motivos from json data
    const patterns = patternNovoRegistro();
    patterns.module = "clientes";
    patterns.folder = "core";
    patterns.file = "clientes";
    patterns.extensions = "php";
    patterns.swit = "listar-clientes";
    patterns.path = createRequestPath(patterns);
    /*FORM DATA*/
    var data = new FormData();
    data.append("swit", patterns.swit);
    data.append("entry", element.value);
    /*SET REQUEST*/    
    var config = {method: 'post', body: data};
    var loadRequest = loudRequest(patterns);
    try {
        const response = await fetch(loadRequest, config);
        const result = await response.json();
        console.log(result);
    } catch(error) {

    }
    /*
    const clientes = await getJsonData("logistica", "");
    clientes?.forEach(motivo => {
        // If it matches the code, set it
        if(clientes.ids === element.value) clienteView.innerText = clientes.motivo;
    });
    */
    // Show the motivos view
    nomeClienteView.classList.remove("d-none");
}

const initCadastroNFEs = () => {
    // Init the starting register nfe table line
    addNewNfe();
}

initCadastroNFEs();