<section class="d-flex justify-content-center container-retornos">
    <!-- RETORNO PADRÃO NFE -->
    <div class="d-flex flex-column container-page">
        <div class="d-none container-fixed-menu">
            <?php
            $fixedMenu = new Pagebuilder();
            $fixedMenu->module = "menu";
            $fixedMenu->folder = "template/view";
            $fixedMenu->file = "menu-fixed-cadastrar";
            include $fixedMenu->loudTemplatePHP_parts();
            ?>
        </div>
        <h1 id="title-page" class="text-center">Cadastro de Retorno de Notas Fiscais por Romaneio</h1>
        <!-- FORMULARIO DE RETORNO DE DADOS -->
        <form id="cadastros" action="javascript: void(0);" method="post" class="d-flex flex-column justify-content-center">
            <!-- DADOS DE ENTRADA -->
            <div class="d-flex container-retornos-dados">
                <?php
                $dadosEntrada = new Pagebuilder();
                $dadosEntrada->module = "public";
                $dadosEntrada->folder = "template/defaults";
                $dadosEntrada->file = "container-dados-retorno";
                $dadosEntrada->gerador_defaults();
                ?>
            </div>
            <!-- DADOS DE ENTRADA -->
            <!-- LISTAR NOTAS -->
            <div id="painel-novo-registro-nfes">
                <?php
                $dados_nfe = new Pagebuilder();
                $dados_nfe->module = "public";
                $dados_nfe->folder = "template/defaults";
                $dados_nfe->file = "container-retorno-nfe";
                $dados_nfe->gerador_defaults();
                ?>
            </div>
            <!-- LISTAR NOTAS -->
        </form>
        <!-- FORMULARIO DE RETORNO DE DADOS -->
    </div>
    <!-- RETORNO PADRÃO NFE -->

    <!-- RETORNO NFE C/ AVARIAS -->
    <div id="painel-avarias" class="d-none painel-avarias">
        <?php
        $dados_avarias = new Pagebuilder();
        $dados_avarias->module = "public";
        $dados_avarias->folder = "template/defaults";
        $dados_avarias->file = "container-avarias-nfe";
        $dados_avarias->gerador_defaults();
        ?>
    </div>
    <!-- RETORNO NFE C/ AVARIAS -->
</section>