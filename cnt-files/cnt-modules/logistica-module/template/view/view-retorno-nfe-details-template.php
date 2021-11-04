<div class="d-flex flex-column details-viewer">
    <h2 class="text-center"><u>Complementos</u></h2>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">Equipe:</b> </div>
            <span id="contact_equipe" class="form-control">[equipe] - [supervisor]</span>
        </div>
    </div>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">Vendedor:</b> </div>
            <span id="contact_vendedor" class="form-control">[codVendedor]</span>
        </div>
    </div>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">NF:</b> </div>
            <span id="contact_nfe" class="form-control">[NFeFiscal]</span>
        </div>
    </div>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">Emissão:</b> </div>
            <span id="contact_nfe_emissao" class="form-control">[emissao]</span>
        </div>
    </div>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">Cliente:</b> </div>
            <span id="contact_cliente" class="form-control">[codCliente] [cliente]</span>
        </div>
    </div>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">Motivo:</b> </div>
            <span id="contact_motivo" class="form-control">[codMotivo] [motivo]</span>
        </div>
    </div>
    <div class="d-flex flex-rows">
        <div class="input-group input-group-sm">
            <div class="input-group-prepend"> <b class="input-group-text">Data:</b> </div>
            <span id="contact_ocorrenciaData" class="form-control">[dataOcorrencia]</span>
        </div>
    </div>
</div>
<script src="<?= DIR_PATH; ?>cnt-modules/logistica-module/js/listar-retorno-detalhes-nfes-js.js" defer></script>