<section class="d-flex container-novo-registro">
    <?php
    $novo_registro = new Pagebuilder();
    $novo_registro->module = "logistica";
    $novo_registro->folder = "template/view";
    $novo_registro->file = "retorno-nfe-novo-registro";
    include $novo_registro->loudTemplatePHP_parts();
    ?>
</section>