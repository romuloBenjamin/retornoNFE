<section class="d-flex justify-content-center feedbacks-container">
    <div class="d-flex flex-column text-center container-page">
        <h2>Notas Retornadas Feedback</h2>
        <hr>
        <!-- Pagination Controls -->
        <div class="d-flex flex-grow-1 flex-column align-items-end paginations-controls">
            <?php
            $paginations = new Pagebuilder();
            $paginations->module = "public";
            $paginations->folder = "template/defaults";
            $paginations->file = "container-paginations";
            $paginations->gerador_defaults();
            ?>
        </div>
        <!-- Feedbacks -->
        <?php
        $novo_registro = new Pagebuilder();
        $novo_registro->module = "logistica";
        $novo_registro->folder = "template/view";
        $novo_registro->file = "retorno-nfe-feedback";
        include $novo_registro->loudTemplatePHP_parts();
        ?>
        <!-- Pagination Controls -->
        <div class="d-flex flex-grow-1 flex-column align-items-end paginations-controls">
            <?php
            $paginations = new Pagebuilder();
            $paginations->module = "public";
            $paginations->folder = "template/defaults";
            $paginations->file = "container-paginations";
            $paginations->gerador_defaults();
            ?>
        </div>
    </div>
</section>