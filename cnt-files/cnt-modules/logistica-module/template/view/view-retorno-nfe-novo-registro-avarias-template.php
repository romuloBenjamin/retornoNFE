<div class="d-none">
    <div class="ml-auto flex-column table-container-retorno-avarias" id="avariasContainerCloneNode">
        <!-- Avarias Title -->
        <div id="avariasTitleContainer">
            <h2 class="text-center">Ocorrência de Retorno de Material com Avaria</h2>
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
                                    <input type="number" class="form-control" name="produtoInput" id="produtoInput">
                                </div>
                            </td>
                            <td rowspan="2">
                                <div class="d-flex container-motivos-avaria border">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="d-flex flex-column align-content-center">
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Furado</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasFuradoInput" id="nAvariasFuradoInput">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Vazando</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasVazandoInput" id="nAvariasVazandoInput">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Vazio</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasVazioInput" id="nAvariasVazioInput">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td rowspan="2">
                                <div class="d-flex container-motivos-avaria border">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="d-flex flex-column">
                                            <div class="d-flex flex-rows input-group input-group-sm input-group-container">
                                                <div class="input-group-prepend"> <span class="input-group-text">Molhado</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasMolhadoInput" id="nAvariasMolhadoInput">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Rasgado</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasRasgadoInput" id="nAvariasRasgadoInput">
                                            </div>
                                            <div class="d-flex flex-rows input-group input-group-sm">
                                                <div class="input-group-prepend"> <span class="input-group-text">Faltante</span> </div>
                                                <input type="number" class="form-control" placeholder="QTD" name="nAvariasFaltanteInput" id="nAvariasFaltanteInput">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Observações</td>
                            <td>
                                <textarea name="obsTextarea" id="obsTextarea" class="d-flex form-control" placeholder="Digite as Observações..."></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>