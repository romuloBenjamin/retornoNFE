<section class="d-flex justify-content-center feedbacks-container">
    <div class="d-flex flex-column container-page">
        <h2 class="text-center">Feedback de Notas Retornadas</h2>
        <div class="d-flex ml-auto align-items-end actions-feedback">
            <ul class="list-group list-group-horizontal">
                <li class="d-flex justify-content-end list-group-item border-0">
                    <?php
                    $btn = new Pagebuilder();
                    $btn->module = "menu";
                    $btn->folder = "template/buttons";
                    $btn->file = "voltar";
                    include $btn->loudTemplateHTML_parts();
                    ?>
                </li>
            </ul>
        </div>
        <hr>
        <!-- Search Filters -->
        <div class="d-flex justify-content-center align-items-center search-filters-container">
            <?php
            $loudSearch = new Pagebuilder();
            $loudSearch->module = "search";
            $loudSearch->folder = "template/forms";
            $loudSearch->file = "pesquisa-filtros-feedback";
            include $loudSearch->loudTemplatePHP_parts();
            ?>
        </div>
        <!-- Load More Script -->
        <script src="<?= DIR_PATH; ?>cnt-modules/public-module/js/load-more-js.js" defer></script>
        <!-- Feedbacks -->
        <?php
        $novo_registro = new Pagebuilder();
        $novo_registro->module = "logistica";
        $novo_registro->folder = "template/view";
        $novo_registro->file = "retorno-nfe-feedback";
        include $novo_registro->loudTemplatePHP_parts();
        ?>
        <!-- Load More Controls -->
        <?php
        $paginations = new Pagebuilder();
        $paginations->module = "public";
        $paginations->folder = "template/defaults";
        $paginations->file = "container-load-more";
        $paginations->gerador_defaults();
        ?>
    </div>
</section>