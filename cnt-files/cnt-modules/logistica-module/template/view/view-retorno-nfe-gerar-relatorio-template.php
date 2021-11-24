<div id="geradorRelatoriosPanel" class="position-absolute w-100">
    <form id="geradorRelatoriosForm" class="d-flex flex-column" action="javascript: void(0);" method="post">
        <div id="periodoContainer" class="d-flex w-100">
            <h2>Definir Período</h2>
            <hr>
            <div id="dataDeAContainer" class="d-flex">
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">De</span>
                    </div>
                    <input id="dataDe" class="form-control form-control-sm" type="date" name="dataDe">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">à</span>
                    </div>
                    <input id="DataA" class="form-control form-control-sm" type="date" name="DataA">
                </div>
            </div>
            <hr>
        </div>
        <div id="modeContainer" class="d-flex w-100">
            <div id="searchType" class="d-flex flex-column">
                <h2>Modo:</h2>
                <hr>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Analitico</span>
                    </div>
                    <input id="analitico" class="form-control" type="radio" name="searchType">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Sintetico</span>
                    </div>
                    <input id="sintetico" class="form-control" type="radio" checked="true" name="searchType">
                </div>
            </div>
            <div id="groupBy" class="d-flex flex-column">
                <h2>Agrupar por:</h2>
                <hr>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Motorista</span>
                    </div> <input id="groupByMotorista" class="form-control" type="radio" name="groupBy">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Equipes</span>
                    </div> <input id="groupByEquipe" class="form-control" type="radio" name="groupBy">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Motivos</span>
                    </div> <input id="groupByMotivo" class="form-control" type="radio" checked="true" name="groupBy">
                </div>
            </div>
        </div>
        <hr>
        <div id="searchOptions" class="d-flex w-100">
            <h2>Restringir relatorio em:</h2>
            <hr>
            <div id="optionsContainer" class="d-flex flex-rows">
                <div id="optionsColumn1" class="d-flex flex-column">
                    <div id="container-empresas" class="d-flex flex-column">
                        <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                            <div class="d-flex input-group-prepend">
                                <span class="input-group-text">Empresa</span>
                            </div>
                            <select id="forEmpresas" class="form-control form-control-sm" name="forEmpresas">
                                <option value="0">Escolha...</option>
                            </select>
                        </div>
                    </div>
                    <div id="motivosContainer" class="d-flex flex-column">
                        <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                            <div class="d-flex input-group-prepend">
                                <span class="input-group-text">Motivos</span>
                            </div>
                            <select id="forMotivos" class="form-control form-control-sm" name="forMotivos">
                                <option selected="true" value="0">Escolha...</option>
                            </select>
                        </div>
                    </div>
                    <div id="extraOptionsContainer" class="d-flex flex-column"></div>
                </div>
                <div id="optionsColumn2" class="d-flex flex-column">
                    <div id="avariasOptionContainer" class="d-flex flex-column">
                        <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                            <div class="d-flex input-group-prepend">
                                <span class="input-group-text">Avarias</span>
                            </div>
                            <select id="forAvarias" class="form-control form-control-sm" name="forAvarias">
                                <option selected="true" value="0">Escolha...</option>
                                <option value="furado">Furado</option>
                                <option value="vazando">Vazando</option>
                                <option value="vazio">Vazio</option>
                                <option value="molhado">Molhado</option>
                                <option value="rasgado">Rasgado</option>
                                <option value="faltante">Faltante</option>
                            </select>
                        </div>
                    </div>
                    <div id="graphContainer" class="d-flex flex-column">
                        <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                            <div class="d-flex input-group-prepend">
                                <span class="input-group-text">Gerar Gráfico</span>
                            </div>
                            <input id="generateGraph" class="form-control" type="checkbox" name="generateGraph">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="generateGraphButtonContainer" class="d-flex w-100">
            <hr>
            <div>
                <div class="d-flex justify-content-start align-items-center">
                    <div class="spinner-border" role="status"><span class="visually-hidden"></span></div>
                    <span class="loading-text">Carregando...</span>
                </div>
            </div>
        </div>
    </form>
</div>
<script src="cnt-files/cnt-modules/logistica-module/js/gerar-relatorio-nfes-js.js"></script>