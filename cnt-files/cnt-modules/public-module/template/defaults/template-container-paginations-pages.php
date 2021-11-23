<small class="d-flex flex-column justify-content-center align-content-center qtd-registros" id="qtdRegistros"></small>
<div class="d-flex justify-content-end align-items-center paginations-container">
    <!-- PAGINATIONS CONTROL -> PREV -->
    <ul class="d-none list-group prev-controls list-group-horizontal">
        <li id="pageFST" class="list-group-item firstHref"><a href="#"><i class="fas fa-angle-double-left"></i></a></li>
        <li id="pagePRV" class="list-group-item prevHref"><a href="#"><i class="fas fa-angle-left"></i></a></li>
    </ul>
    <!-- PAGINATIONS CONTROL -> PAGES -->
    <ul id="pageCarrousel" class="list-group pages-control list-group-horizontal"></ul>
    <!-- PAGINATIONS CONTROL -> NEXT -->
    <ul class="list-group next-controls list-group-horizontal">
        <li id="pageNXT" class="list-group-item"><a href="#"><i class="fas fa-angle-right"></i></a></li>
        <li id="pageLST" class="list-group-item"><a href="#"><i class="fas fa-angle-double-right"></i></a></li>
    </ul>
</div>
<script src="<?= DIR_PATH; ?>cnt-modules/public-module/js/paginations-js.js" defer></script>