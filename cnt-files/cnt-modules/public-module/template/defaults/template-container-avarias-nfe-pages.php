<section class="d-flex container-nova-avaria">
    <?php
    $avarias = new Pagebuilder();
    $avarias->module = "logistica";
    $avarias->folder = "template/view";
    $avarias->file = "retorno-nfe-novo-registro-avarias";
    include $avarias->loudTemplatePHP_parts();
    ?>
</section>
<script src="cnt-files/cnt-modules/logistica-module/js/cadastro-avarias-nfes-js.js" defer></script>