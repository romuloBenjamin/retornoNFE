/*---------------------------->SET PATTERNS NFE CADASTRAR<----------------------------*/
var patterns_cadastrar = patternsCadastrarDados();
/*PATTERNS DATA*/
function patternsCadastrarDados() {
    var patterns = {};
    patterns.module = "search";
    patterns.folder = "core";
    patterns.file = "search-old-data";
    patterns.extensions = "php";
    patterns.swit = false;
    patterns.path = createRequestPath(patterns);
    return patterns;
}
/*---------------------------->SET PATTERNS NFE CADASTRAR<----------------------------*/
document.querySelector("input#forRomaneios").addEventListener("keyup", createObj_search);
/*------------------------------->CREATE OBJECT SEARCH<-------------------------------*/
/*CREATE OBJ*/
function createObj_search() {
    /*GET PATTERNS*/
    var oldData = patternsCadastrarDados();
    oldData.paginations.search = this.value;
    oldData.swit = "pesquisar-romaneios-db-antigo"
    /*SEND OLD DATA*/
    var pesquisarOldData = sendOldRequest(oldData);
}