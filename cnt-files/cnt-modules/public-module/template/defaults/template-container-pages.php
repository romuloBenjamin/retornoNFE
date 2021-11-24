<section class="d-flex justify-content-center container-retornos">
    <div class="d-flex flex-column container-page">
        <h1 class="text-center">Retorno de Notas Fiscais</h1>
        <hr>
        <!-- MODULE CONTROLS -->
        <div class="d-flex justify-content-between align-items-center menu-principal">
            <!-- CONTROLS -->
            <div class="d-flex module-controls">
                <?php
                $controls_actions = new Pagebuilder();
                $controls_actions->module = "public";
                $controls_actions->folder = "template/defaults";
                $controls_actions->file = "container-actions";
                $controls_actions->gerador_defaults();
                ?>
            </div>
            <!-- CONTROLS -->
            <!-- PAGINATIONS -->
            <div class="d-flex flex-grow-1 flex-column align-items-end paginations-controls">
                <?php
                $paginations = new Pagebuilder();
                $paginations->module = "public";
                $paginations->folder = "template/defaults";
                $paginations->file = "container-paginations";
                $paginations->gerador_defaults();
                ?>
            </div>
            <!-- PAGINATIONS -->
        </div>
        <!-- MODULE CONTROLS -->
        <hr>
        <!-- FILTROS DE PESQUISA -->
        <div class="d-flex search-filters-container">
            <?php
            $loudSearch = new Pagebuilder();
            $loudSearch->module = "search";
            $loudSearch->folder = "template/forms";
            $loudSearch->file = "pesquisa-filtros";
            include $loudSearch->loudTemplatePHP_parts();
            ?>
        </div>
        <!-- FILTROS DE PESQUISA -->

        <!-- CONTAINER TABLES -->
        <div class="d-flex container-retorno-nfes flex-column">
            <!-- TABLES -->
            <div class="d-flex listagem-retornos justify-content-between">
                <!-- TABLE RETORNO NFE -->
                <div class="d-flex tables-container">
                    <?php
                    $tablesNFE = new Pagebuilder();
                    $tablesNFE->module = "logistica";
                    $tablesNFE->folder = "template/view";
                    $tablesNFE->file = "retornos-nfe";
                    include $tablesNFE->loudTemplatePHP_parts();
                    ?>
                </div>
                <!-- TABLE RETORNO NFE -->
                <div class="d-none details-container flex-column align-items-center">
                    <button type="button" class="d-flex flex-rows btn btn-secondary align-self-end" onClick="close_details();"><strong>X</strong></button>
                    <!-- NFES DETAILS -->
                    <div class="d-flex details-nfe flex-rows">
                        <?php
                        $details = new Pagebuilder();
                        $details->module = "logistica";
                        $details->folder = "template/view";
                        $details->file = "retorno-nfe-details";
                        include $details->loudTemplatePHP_parts();
                        ?>
                    </div>
                    <!-- NFES DETAILS -->
                    <!-- NFES FEEDBACK -->
                    <div class="d-flex feedback-nfe flex-rows">
                        <?php
                        $details = new Pagebuilder();
                        $details->module = "logistica";
                        $details->folder = "template/view";
                        $details->file = "retorno-nfe-feedback";
                        include $details->loudTemplatePHP_parts();
                        ?>
                    </div>
                    <!-- NFES FEEDBACK -->
                    <!-- NFES AVARIAS -->
                    <div class="d-none avarias-nfe flex-rows">
                        <?php
                        $details = new Pagebuilder();
                        $details->module = "logistica";
                        $details->folder = "template/view";
                        $details->file = "retorno-nfe-avarias";
                        include $details->loudTemplatePHP_parts();
                        ?>
                    </div>
                    <!-- NFES AVARIAS -->
                </div>

            </div>
            <!-- TABLES -->
            <!-- PAGINATIONS -->
            <div class="pagination-footer">
                <div class="d-flex flex-grow-1 flex-column align-items-end justify-content-center paginations-controls">
                    <?php
                    $paginations = new Pagebuilder();
                    $paginations->module = "public";
                    $paginations->folder = "template/defaults";
                    $paginations->file = "container-paginations";
                    $paginations->gerador_defaults();
                    ?>
                </div>
            </div>
            <!-- PAGINATIONS -->
        </div>
        <!-- CONTAINER TABLES -->
    </div>
</section>