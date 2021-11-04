<section class="d-flex container-actions">
    <ul class="list-group list-group-horizontal">
        <li class="list-group-item border-0">
            <?php
            $btn = new Pagebuilder();
            $btn->module = "menu";
            $btn->folder = "template/buttons";
            $btn->file = "novo";
            include $btn->loudTemplateHTML_parts();
            ?>
        </li>
        <li class="list-group-item border-0">
            <?php
            $btn = new Pagebuilder();
            $btn->module = "menu";
            $btn->folder = "template/buttons";
            $btn->file = "gerar-relatorio";
            include $btn->loudTemplateHTML_parts();
            ?>
        </li>
    </ul>
</section>