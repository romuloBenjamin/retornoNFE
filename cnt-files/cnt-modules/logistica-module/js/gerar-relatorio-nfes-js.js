// Show the panel
function openGerarRelatorioPanel() {
    // Add event listeners
    const backdrop = document.querySelector("#backdrop");
    backdrop.addEventListener('click', closeGerarRelatorioPanel, false);
    document.querySelector(".close-button").addEventListener('click', closeGerarRelatorioPanel, false);
    document.querySelector("#gerarRelatorioButton").addEventListener('click', gerarRelatorio, false);
    document.querySelector("#dataDe").addEventListener('change', updateDataAMinDate, false);
    document.querySelector("#dataA").addEventListener('change', updateDataDeMaxDate, false);
    document.querySelector("#setModal").classList.remove("d-none");
}

// Hide the panel
function closeGerarRelatorioPanel(e) {
    e?.stopPropagation();
    document.querySelector("#setModal").classList.add("d-none");
}

// Update data a min date
function updateDataAMinDate(e) {
    const target = e.target;
    document.querySelector("#dataA").min = target.value;
}

// Update data de max date
function updateDataDeMaxDate(e) {
    const target = e.target;
    document.querySelector("#dataDe").max = target.value;
}

// Build object which will be used to generate the relatorio
function gerarRelatorio() {
    const form = getFormData();
    if(form) {
        /*CRAETE POPUP WINDOWS to push data*/
        var windows_pop = createWindons(form);
        showLoading();
        setTimeout(() => {
            hideLoading();
            closeGerarRelatorioPanel();
        }, 3000);
    }
}

/*CREATE WINDONS*/
function createWindons(params) {
    localStorage.setItem("popup_windows", JSON.stringify(params));
    window.open(popups_path+"cnt-files/cnt-modules/relatorios-module/template/popups/relatorio.php", "_blank", 'location=yes,height=400,width=800,scrollbars=yes,status=no');
}

// Show the loading spinner
function showLoading() {
    document.querySelector("#gerarRelatorioButton").classList.add("d-none");
    document.querySelector(".loading-container").classList.remove("d-none");
}

// Hide the loading spinner
function hideLoading() {
    document.querySelector(".loading-container").classList.add("d-none");
    document.querySelector("#gerarRelatorioButton").classList.remove("d-none");
}

// Build the form data object that'll be used to generate the graph
function getFormData() {
    const form = document.querySelector("#geradorRelatoriosForm");
    const formElements = form.elements;
    const formData = {};
    for(let element of formElements) {
        let property = element.id.toLowerCase();
        if(element.tagName === "INPUT") {
            // If it's a radio input, add only the checked value
            if(element.type === "radio") {
                if(element.checked) formData[element.name.toLowerCase()] = element.id;
            } else if(element.type === "checkbox") {
                formData[property] = element.checked;
            } else {
                // If the input is required and it's not filled, throw an error
                // Date
                if(!element.reportValidity()) return;
                formData[property] = element.value;
            } 
            // If it's a select, remove the for and the last letter (s) from the name (when it has one)
        } else if(element.tagName === "SELECT") {
            if(element.value !== "0") {
                property = property.replace("for", "");
                if(property[property.length - 1] === "s") property = property.slice(0, -1);
                let optionText = element.options[element.selectedIndex].text;
                if(optionText.includes(" - ")) optionText = optionText.split(" - ")[1];
                formData[property] = {
                    id: element.value,
                    desc: optionText
                }
            }
        }
    }
    // Check if the date is valid
    const dataDe = new Date(formData["datade"]);
    const dataA = new Date(formData["dataa"]);
    if(dataDe > dataA) {
        console.log("Data inicial maior que data final");
        return;
    }
    console.log(formData)
    return formData;
}