<div id="geradorRelatoriosPanel" class="d-absolute w-100">
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
                    <input id="analitico" class="form-control" type="radio" name="mode-options">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Sintetico</span>
                    </div>
                    <input id="sintetico" class="form-control" type="radio" checked="true" name="mode-options">
                </div>
            </div>
            <div id="groupBy" class="d-flex flex-column">
                <h2>Agrupar por:</h2>
                <hr>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Motorista</span>
                    </div> <input id="groupByMotorista" class="form-control" type="radio" name="groupByMotorista">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Equipes</span>
                    </div> <input id="groupByEquipe" class="form-control" type="radio" name="groupByEquipe">
                </div>
                <div class="d-flex input-group input-template input-group-sm justify-content-start align-items-center">
                    <div class="d-flex input-group-prepend">
                        <span class="input-group-text">Motivos</span>
                    </div> <input id="groupByMotivo" class="form-control" type="radio" checked="true" name="groupByMotivo">
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
                            </div> <select id="forEmpresas" class="form-control form-control-sm" name="forEmpresas">
                                <option selected="true" value="0">Escolha...</option>
                                <option value="2">2-Sales Indústria</option>
                                <option value="3">3-Sales Equipamentos</option>
                                <option value="6">6-Comercial Sandalo</option>
                                <option value="7">7-Sandalo Equipamentos</option>
                                <option value="8">8-Dona Descartáveis</option>
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
                                <option value="1">1-Pedido errado ou sem pedido.</option>
                                <option value="2">2-Cliente sem dinheiro.</option>
                                <option value="3">3-Endereço errado.</option>
                                <option value="4">4-Pedido cancelado pelo cliente.</option>
                                <option value="5">5-Duplicidade de Nota Fiscal.</option>
                                <option value="6">6-Demora no recebimento.</option>
                                <option value="7">7-Local fechado.</option>
                                <option value="8">8-Nota fiscal não acompanha boleto.</option>
                                <option value="9">9-Sem responsável para recebimento.</option>
                                <option value="10">10-Endereço não encontrado.</option>
                                <option value="11">11-Local fechado após as 18:00hrs no horário comercial.</option>
                                <option value="12">12-Veículo quebrado e ficou carregado.</option>
                                <option value="13">13-Veículo quebrado e descarregou.</option>
                                <option value="14">14-Alagamento, via sem acesso para o caminhão, manifestações, obras na via, sem sistema, etc...</option>
                                <option value="15">15-Mercadoria não foi carregada no veículo.</option>
                                <option value="16">16-Produto Carregado diferente da Nota Fiscal.</option>
                                <option value="17">17-Produto danificado.</option>
                                <option value="18">18-Nota com Bilhete, ou Programada</option>
                                <option value="19">19-Supervisor pediu para retornar com Nota</option>
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