function initGerarRelatoriosPanel () {
    document.querySelector("#geradorRelatoriosPanel").querySelector("#forEmpresas").addEventListener('click', onEmpresaSelectClick, false);
    document.querySelector("#setModal").classList.remove("d-none");
}

//initGerarRelatoriosPanel();

function gerarRelatorio() {
    initGerarRelatoriosPanel();
}