<div class="d-none">
    <div class="ml-auto flex-column table-container-retorno-avarias" id="avariasContainerCloneNode">
        <!-- Avarias Title -->
        <div id="avariasTitleContainer" class="d-flex justify-content-center">
            <h6 class="text-center avarias-title">Ocorrência de Retorno de Materiais com Avaria</h6>
        </div>

        <!-- Avarias Table -->
        <table id="avariasTable" class="table avarias-table">
            <tbody id="avariasDataRowPlacer">
                <!-- Insert Avarias Table Data Rows (tr) Here -->
            </tbody>
        </table>
    </div>
</div>

<!-- Avarias Table Data Row Clone Node (tr) -->
<table class="d-none">
    <tbody>
        <tr id="avariasDataRowCloneNode" class="avarias-data-row">
            <td class="table-container">
                <table class="table">
                    <tbody>
                        <tr class="container-header">
                            <td rowspan="3" class="button-container border">
                                <button id="addAvariaButton" class="btn add-avaria-btn" type="button">
                                    <i class="fas fa-plus-circle"></i>
                                </button>
                                <button id="deleteAvariaButton" class="d-none btn delete-avaria-btn" type="button">
                                    <i class="fa fa-minus-circle"></i>
                                </button>
                            </td>
                            <td scope="col" colspan="2" class="item-name-avarias border">Info</td>
                            <td scope="col" colspan="2" class="item-name-avarias text-center border">Avarias</td>
                        </tr>
                        <tr>
                            <td>Cód. do Produto</td>
                            <td>
                                <div class="input-group input-group-sm">
                                    <input type="number" class="d-flex form-control" name="produto" id="produto" placeholder="Cód. Produto" min="0">
                                </div>
                            </td>
                            <td rowspan="2" class="border border-right-0 motivos-avaria-td">
                                <div class="d-flex container-motivos-avaria border">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="d-flex flex-column align-content-center">
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Furado</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasFurado" id="nAvariasFurado" min="0">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Vazando</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasVazando" id="nAvariasVazando" min="0">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Vazio</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasVazio" id="nAvariasVazio" min="0">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td rowspan="2" class="border border-left-0 motivos-avaria-td">
                                <div class="d-flex container-motivos-avaria border">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="d-flex flex-column">
                                            <div class="d-flex flex-rows input-group input-group-sm input-group-container">
                                                <div class="input-group-prepend"> <span class="input-group-text">Molhado</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasMolhado" id="nAvariasMolhado" min="0">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Rasgado</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasRasgado" id="nAvariasRasgado" min="0">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Faltante</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasFaltante" id="nAvariasFaltante" min="0">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Observações</td>
                            <td>
                                <textarea name="obsTextarea" id="obsTextarea" class="form-control" placeholder="Digite as Observações"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>