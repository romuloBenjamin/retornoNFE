<!-- DADOS ENTRADA -->
<div class="d-flex container-dados-entrada">
    <!-- DADOS DO HORARIO DE CADASTRO -->
    <div class="d-flex flex-column calendar-time-cadastro">
        <small>Data e Hora Cadastro:</small>
        <div id="dataCadastro" class="d-flex form-control">
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item border-0"><i class="far fa-calendar-alt"></i> <?= date('d/m/Y'); ?></li>
                <li class="list-group-item border-0"><i class="far fa-clock"></i> <?= date('H:i:s'); ?></li>
            </ul>
        </div>
    </div>
    <!-- DADOS DO HORARIO DE CADASTRO -->
    <!-- ACTIONS CADASTRAR -->
    <div class="d-flex ml-auto align-items-end actions-cadastro">
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item border-0">
                <?php
                $btn = new Pagebuilder();
                $btn->module = "menu";
                $btn->folder = "template/buttons";
                $btn->file = "voltar";
                include $btn->loudTemplateHTML_parts();
                ?>
            </li>
            <li class="list-group-item border-0">
                <?php
                $btn = new Pagebuilder();
                $btn->module = "menu";
                $btn->folder = "template/buttons";
                $btn->file = "salvar";
                include $btn->loudTemplateHTML_parts();
                ?>
            </li>
        </ul>
    </div>
    <!-- ACTIONS CADASTRAR -->
</div>
<!-- DADOS TRANSPORTADOR -->
<hr>
<div class="d-flex container-dados">
    <!-- CONTAINER DADOS RETORNO -->
    <div class="d-flex flex-row align-items-end container-dados-retorno">
        <!-- SEARCH COLUMNS -->
        <div id="search-romaneios" class="d-flex search-romaneios flex-column">
            <small>Campos de Pesquisa</small>
            <div class="d-flex container-pesquisa">
                <ul class="list-group">
                    <li class="list-group-item border-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    Romaneio:
                                </span>
                            </div>
                            <input type="text" id="forRomaneios" name="forRomaneios" placeholder="Nº Romaneio" class="form-control">
                        </div>
                    </li>
                    <li class="list-group-item border-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    Motorista:
                                </span>
                            </div>
                            <input type="text" id="forMotorista" name="forMotorista" placeholder="Qual Motorista?" class="form-control">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- DATA COLUMNS -->
        <div class="d-flex dados-retornos-nfe flex-column">
            <div class="d-flex flex-column container-dados-retornos-nfe">
                <!-- SAIDA E QTD -->
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item border-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="far fa-calendar-alt"></i>
                                    Saida:
                                </span>
                            </div>
                            <input type="text" id="forSaida" name="forSaida" class="form-control">
                        </div>
                    </li>
                    <li class="list-group-item border-0 spacer"></li>
                    <li class="list-group-item border-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="far fa-calendar-alt"></i>
                                    QTD Notas:
                                </span>
                            </div>
                            <input type="text" id="forQtdNotas" name="forQtdNotas" class="form-control">
                        </div>
                    </li>
                </ul>
                <!-- REGIOES -->
                <ul class="list-group">
                    <li class="list-group-item border-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="far fa-calendar-alt"></i>
                                    Setor:
                                </span>
                            </div>
                            <input type="text" id="forSetor" name="forSetor" class="form-control">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<hr>
<!-- DADOS TRANSPORTADOR -->