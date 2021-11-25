/* Pattern/model of the page requests */
const feedbackPattern = getFeedbacksPattern();
function getFeedbacksPattern() {
    const pattern = {};
    pattern.module = "logistica";
    pattern.folder = "core";
    pattern.file = "retornos-nfe";
    pattern.extensions = "php";
    pattern.swit = "listar-retornos-nfe";
    pattern.paginations = setPaginations(0, true);
    pattern.path = createRequestPath(pattern);
    return pattern;
}

// Send a request with the passed data
sendRequest(feedbackPattern);

// Prepare pagination
prepare_paginations_object(null, feedbackPattern.paginations, true);

// Receive the request that was sent
function receiveRequest(params) {
    if(params) listarFeedbacks(params.data);
}

// Build the feedbacks list
async function listarFeedbacks(data) {
    const placer = document.querySelector("#feedbackPlacer");
    for(const [index, dataItem] of data.entries()) {
        for(const [nfeIndex, nfeData] of dataItem.data_nfe.entries()) {
            // Cliente data
            const clienteData = dataItem.data_cli[nfeIndex];
            // Clone the original node
            const originalFeedbackLine = document.querySelector("#feedbackCloneNode");
            const feedbackClone = originalFeedbackLine.cloneNode(true);
            const idSuffix = `-${index}`;
            // Set clone id
            feedbackClone.id = feedbackClone.id.replace("CloneNode", "") + idSuffix;
            const dataCells = feedbackClone.querySelectorAll("td");
            if(index === 0) console.log(dataItem);
            // NF number
            dataCells[0].innerHTML = nfeData.NF;
            // Vendedor
            dataCells[1].innerHTML = clienteData.vendedor + " - " + "Nome Vendedor";
            // Cliente
            dataCells[2].innerHTML = clienteData.cod_cliente + " - " + clienteData.nome_cliente;
            // Filial
            const filialId = parseInt(nfeData.filial);
            dataCells[3].innerHTML = filialId + " - " + await getFilialName(filialId);
            // Motivo
            dataCells[4].innerHTML = parseInt(nfeData.motivo) + " - " + nfeData.motivo_nome;
            // Feedbacks
            const feedbacks = nfeData.feedbacks;
            const feedbackContainer = dataCells[5].querySelector("#textareaPlacer");
            feedbackContainer.id += idSuffix;
            if(feedbacks) {
                // Append the feedbacks
            } else {
                // Test
                const random = Math.floor(Math.random() * 3) + 1;
                for(let i = 0; i < random; i++) {
                    addFeedbackTextarea(feedbackContainer, true);
                }
            }
            // Edit Button
            const editButton = dataCells[5].querySelector("#editButton");
            editButton.id += idSuffix;
            editButton.addEventListener('click', editFeedback, false);
            // Save Button
            const saveButton = dataCells[5].querySelector("#saveButton")
            saveButton.id += idSuffix;
            saveButton.addEventListener('click', saveFeedback, false);
            // Append it to the placer
            placer.appendChild(feedbackClone);
        }
    }
}

// Add a new feedback textarea element
function addFeedbackTextarea(feedbackContainer, readOnly = false) {
    const originalFeedbackTextarea = document.querySelector("#feedbackTextareaCloneNode");
    const feedbackTextareaClone = originalFeedbackTextarea.cloneNode();
    feedbackTextareaClone.readOnly = readOnly;
    feedbackContainer.appendChild(feedbackTextareaClone);
}

function getFeedbackContainer(index) {
    return document.querySelector("#textareaPlacer-" + index);
}

// Edit feedback
function editFeedback(event) {
    // Find the feedback container
    const feedbackContainer = getFeedbackContainer(event.currentTarget.id.split("-")[1]);
    // Select the correct feedback according to user permission and allow editing
    const feedback = feedbackContainer.children[0];
    feedback.readOnly = false;
}

// Save edited feedback
function saveFeedback(event) {
    // Find the feedback container
    const feedbackContainer = getFeedbackContainer(event.currentTarget.id.split("-")[1]);
    // Select the correct feedback according to user permission and save it
    const feedback = feedbackContainer.children[0];
    feedback.readOnly = true;
}

// Store the filiais data locally
let filiaisData;

// Get the name of the filial with the passed id
async function getFilialName(id) {
    // If the filiaisData is empty, get the data
    if(!filiaisData) filiaisData = await getJsonData("public", "empresas");
    let filialName = "Não encontrada";
    // Search for the filial name
    filiaisData?.some(filialData => {
        if(parseInt(filialData.ids) === id) {
            filialName = filialData.empresa;
            return true;
        }
        return false;
    });
    return filialName;
}