// Buttons
const ADD_AVARIA_BUTTON_ID = "addAvariaButton";
const DELETE_AVARIA_BUTTON_ID = "deleteAvariaButton";
// Inputs
const PRODUTO_INPUT_ID = "produtoInput";
const N_AVARIAS_FURADO_INPUT_ID = "nAvariasFuradoInput";
const N_AVARIAS_VAZANDO_INPUT_ID = "nAvariasVazandoInput";
const N_AVARIAS_VAZIO_INPUT_ID = "nAvariasVazioInput";
const N_AVARIAS_MOLHADO_INPUT_ID = "nAvariasMolhadoInput";
const N_AVARIAS_RASGADO_INPUT_ID = "nAvariasRasgadoInput";
const N_AVARIAS_FALTANTE_INPUT_ID = "nAvariasFaltanteInput";
// Text area
const OBS_TEXTAREA_ID = "obsTextarea";

function createAvariasContainer(index) {
    // Clone the avariasContainer
    const originalAvariasContainer = document.querySelector("#avariasContainerCloneNode");
    const avariasContainerClone = originalAvariasContainer.cloneNode(true);
    avariasContainerClone.id = avariasContainerClone.id.replace("CloneNode", "") + "-" + index;
    const avariasContainerPlacer = document.querySelector("#" + AVARIAS_CONTAINER_PLACER_ID + "-" + index);
    avariasContainerPlacer.appendChild(avariasContainerClone);

    // Add at least one data row
    const avariasDataRowPlacer = avariasContainerClone.querySelector("#avariasDataRowPlacer");
    avariasDataRowPlacer.id += "-" + index;
    addAvaria(avariasDataRowPlacer, index);

    // Show avarias container td
    avariasContainerPlacer.classList.remove("d-none");
}

function onShowAvariasButtonClick(element) {
    const index = element.currentTarget.id.split("-")[1];
    const avariasContainer = document.querySelector("#avariasContainer-" + index);
    if(!avariasContainer.classList.contains("d-none")) avariasContainer.classList.add("d-none");
    else avariasContainer.classList.remove("d-none");
}

// Shows the avaria options container if it exists or creates a new one if not
function showAvariaOptions(index) {
    const avariasContainer = document.querySelector("#avariasContainer-" + index);
    if(!avariasContainer) createAvariasContainer(index);
    else avariasContainer.classList.remove("d-none");
}

// Hide the avaria options container
function hideAvariaOptions(index) {
    const avariasContainer = document.querySelector("#avariasContainer-" + index);
    if(avariasContainer) avariasContainer.classList.add("d-none");
}

// Add avaria row
function addAvaria(element, containerIndex) {
    let avariasDataRowPlacer;
    if(!element.id) {
        // If it's a button, get the placer by using the container id
        containerIndex = element.currentTarget.id.split("-")[1].split("_")[0];
        avariasDataRowPlacer = document.querySelector("#avariasDataRowPlacer-" + containerIndex);
    } else {
        avariasDataRowPlacer = element;
    }
    
    // Clone data row
    const originalNode = document.querySelector("#avariasDataRowCloneNode");
    const cloneNode = originalNode.cloneNode(true);

    // Get current index
    let index = 0;

    // Get all rows
    const avariaRows = avariasDataRowPlacer.children;
    const amount = avariaRows.length;

    // If there's more than one, select the previous element
    if(amount > 0) {
        const previous = avariaRows[amount - 1];
        // Set index as next integer
        index = parseInt(previous.id.split("_")[1]) + 1;
        // Hide add button and show remove button
        previous.querySelector(".add-avaria-btn").classList.add("d-none");
        previous.querySelector(".delete-avaria-btn").classList.remove("d-none");
    }

    // Add indexes (container-index_current-index) to the elements
    const idSuffix = "-" + containerIndex + "_" + index;
    cloneNode.id = cloneNode.id.replace("CloneNode", "") + idSuffix;
    appendSuffixToElementId(ADD_AVARIA_BUTTON_ID, cloneNode, idSuffix);
    appendSuffixToElementId(DELETE_AVARIA_BUTTON_ID, cloneNode, idSuffix);
    appendSuffixToElementId(OBS_TEXTAREA_ID, cloneNode, idSuffix);
    appendSuffixToInput(PRODUTO_INPUT_ID, cloneNode, idSuffix);
    appendSuffixToInput(N_AVARIAS_FURADO_INPUT_ID, cloneNode, idSuffix);
    appendSuffixToInput(N_AVARIAS_VAZANDO_INPUT_ID, cloneNode, idSuffix);
    appendSuffixToInput(N_AVARIAS_VAZIO_INPUT_ID, cloneNode, idSuffix);
    appendSuffixToInput(N_AVARIAS_MOLHADO_INPUT_ID, cloneNode, idSuffix);
    appendSuffixToInput(N_AVARIAS_RASGADO_INPUT_ID, cloneNode, idSuffix);
    appendSuffixToInput(N_AVARIAS_FALTANTE_INPUT_ID, cloneNode, idSuffix);

    // Add event listeners to the buttons
    cloneNode.querySelector("#" + ADD_AVARIA_BUTTON_ID + idSuffix).addEventListener('click', addAvaria, false);
    cloneNode.querySelector("#" + DELETE_AVARIA_BUTTON_ID + idSuffix).addEventListener('click', deleteAvaria, false);
    const container = document.querySelector("#newRegistroNFEContainer-" + containerIndex);
    container.querySelector("#" + SHOW_AVARIAS_BUTTON_ID + "-" + containerIndex).addEventListener('click', onShowAvariasButtonClick, false);

    avariasDataRowPlacer.appendChild(cloneNode);
    cloneNode.scrollIntoView();
}

// Delete avaria row
function deleteAvaria(element) {
    const index = element.currentTarget.id.split("-")[1];
    document.querySelector("#avariasDataRow-" + index).remove();
}