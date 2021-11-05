<!-- DADOS ENTRADA -->
<div class="d-flex container-dados-entrada">
    <!-- REGISTRO DE ENTRADA -->
    <div class="d-flex input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">
                <i class="fas fa-bars"></i>
                Registro:
            </span>
        </div>
        <div class="form-control">[carregando...]</div>
    </div>
    <!-- REGISTRO DE ENTRADA -->

    <!-- DADOS DO HORARIO DE CADASTRO -->
    <div class="d-flex input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">
                <i class="far fa-calendar-alt"></i>
                Data:
            </span>
        </div>
        <div class="d-flex form-control"><?= date('d/m/Y'); ?></div>
        <div class="d-flex form-control">
            <input type="time" name="horaRetorno" id="horaRetorno" class="border-0">
        </div>
    </div>
    <!-- DADOS DO HORARIO DE CADASTRO -->
</div>
<!-- DADOS TRANSPORTADOR -->
<hr>
<div class="d-flex justify-content-between align-items-end container-dados">
    <div class="d-flex">
        <div class="d-flex flex-column">
            <small>Campos de Pesquisa</small>
            <ul class="list-group">
                <li class="list-group-item">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                Romaneio:
                            </span>
                        </div>
                        <input type="text" id="forRomaneios" name="forRomaneios" placeholder="Nº Romaneio" class="form-control">
                    </div>
                </li>
                <li class="list-group-item">
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
    <div class="d-flex">
        <ul class="list-group">
            <li class="list-group-item">
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
            <li class="list-group-item">
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
    </div>
    <div class="d-flex">
        <ul class="list-group">
            <li class="list-group-item">
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
            <li class="list-group-item"></li>
        </ul>
    </div>
</div>
<!-- DADOS TRANSPORTADOR -->