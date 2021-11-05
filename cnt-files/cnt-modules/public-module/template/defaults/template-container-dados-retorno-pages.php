<section class="d-flex container-dados-nfe-retornadas flex-column">
    <!-- PARTE FORMULARIO CADASTRO -->
    <div class="d-flex form-parts-transportador-cadastro flex-column">
        <?php
        $btn = new Pagebuilder();
        $btn->module = "logistica";
        $btn->folder = "template/forms";
        $btn->file = "retorno-nfe-dados-transportador";
        include $btn->loudTemplatePHP_parts();
        ?>
    </div>
    <!-- PARTE FORMULARIO CADASTRO -->
    <!-- PARTE DA PESQUISA -->
    <div class="d-none cadastro-pesquisa-retorno">
        <?php
        $btn = new Pagebuilder();
        $btn->module = "search";
        $btn->folder = "template/view";
        $btn->file = "retorno-nfe-container-results";
        include $btn->loudTemplateHTML_parts();
        ?>
    </div>
    <!-- PARTE DA PESQUISA -->
</section>
<script src="<?= DIR_PATH; ?>cnt-modules/logistica-module/js/listar-retornos-search-js.js" defer></script>