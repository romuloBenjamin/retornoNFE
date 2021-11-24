// Show the panel
function openGerarRelatorioPanel() {
    // Add event listeners
    const backdrop = document.querySelector("#backdrop");
    backdrop.addEventListener('click', closeGerarRelatorioPanel, false);
    document.querySelector("#geradorRelatoriosPanel").querySelector("#forEmpresas").addEventListener('click', onEmpresaSelectClick, false);
    document.querySelector(".close-button").addEventListener('click', closeGerarRelatorioPanel, false);
    document.querySelector("#gerarRelatorioButton").addEventListener('click', gerarRelatorio, false);
    document.querySelector("#dataDe").addEventListener('change', updateDataAMinDate, false);
    document.querySelector("#setModal").classList.remove("d-none");
}

// Hide the panel
function closeGerarRelatorioPanel(e) {
    e.stopPropagation();
    document.querySelector("#setModal").classList.add("d-none");
}

function updateDataAMinDate(e) {
    const target = e.target;
    document.querySelector("#dataA").min = target.value;
}

// Build object which will be used to generate the relatorio
function gerarRelatorio() {
    const formData = getFormData();
    console.log(formData);
}

function getFormData () {
    const form = document.querySelector("#geradorRelatoriosForm");
    const formElements = form.elements;
    const formData = {};
    for(let element of formElements) {
        let property = element.id.toLowerCase();
        if(element.tagName === "INPUT") {
            // If it's a radio input, add only the checked value
            if(element.type === "radio") {
                if(element.checked) formData[element.name] = element.id;
            } else if(element.type === "checkbox") {
                formData[property] = element.checked;
            } else {
                // If the element is required and it's not filled, throw an error
                if(!element.reportValidity()) throw new Error("Preencha o período");
                formData[property] = element.value;
            } 
            // If it's a select, remove the for and the last letter (s) from the name
        } else if(element.tagName === "SELECT") {
            if(element.value !== "0") {
                property = property.replace("for", "").slice(0, -1);
                let optionText = element.options[element.selectedIndex].text;
                if(optionText.includes(" - ")) optionText = optionText.split(" - ")[1];
                formData[property] = element.value + "," + optionText;
            } else {
                formData[property] = element.value;
            }
        }
    }
    return formData;
}