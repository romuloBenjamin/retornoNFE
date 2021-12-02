<title>Gerador de Relatórios</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<link rel="stylesheet" href="../../../../cnt-assets/fontawesome/css/all.css">
<link rel="stylesheet" href="../../../../css/style.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<script src="../../../../cnt-js/script.js" defer></script>
<script src="../../../../cnt-js/scripts-relatorios.js" defer></script>

<main id="container-relatorio" class="d-flex flex-column container-relatorio vh-100">
    <!-- HEADER RELATORIO -->
    <header id="headerRelatorio" class="d-flex align-items-center justify-content-center">
        <ul class="list-group list-group-horizontal">
            <li class="d-flex align-items-center list-group-item border-0" id="relatorioTitulo">RETORNO DE NOTAS</li>
            <li class="d-flex flex-column list-group-item border-0" id="relatorioPeriodo">
                <small><b>PERÍODO:</b></small>
                <span>[ini] a [fin]</span>
            </li>
            <li class="d-flex align-items-center list-group-item border-0" id="relatorioTipo"></li>
        </ul>
    </header>
    <!-- CONTEUDO RELATORIO SINTETICO -->
    <section id="relatorioContentPlacer" class="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <div id="louder-container" class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <span class="loading-text">Gerando Relatório...</span>
        </div>
    </section>
    <footer></footer>
</main>

<!-- Clone nodes -->
<div class="d-none">
    <!-- Relatório content -->
    <div id="relatorioContentCloneNode" class="d-flex flex-column conteudo-interno-relatorios clone-node-3-placer w-100">
        <ul class="list-group flex-column list-group-horizontal relatorio-departamentos">
            <li class="list-group-item border-0 text-center">
                <strong>DEPARTAMENTO:</strong>
                <span></span>
            </li>
        </ul>
    </div>
    <!-- Group data item start (with header) -->
    <div class="d-flex flex-column table-container" id="groupDataItemStartCloneNode">
        <div class="flex-grow-1 main-table">
            <table class="table">
                <thead class="thead-primary">
                    <tr>
                        <th scope="col">NFE</th>
                        <th scope="col">CÓD. CLIENTE</th>
                        <th scope="col">CLIENTE</th>
                        <th scope="col">CÓD. VEND.</th>
                        <th scope="col">EQUIPE</th>
                        <th scope="col">MOTIVO</th>
                    </tr>
                </thead>
                <tbody id="groupItemLinePlacer"></tbody>
            </table>
        </div>
        <div id="avariasAndFeedbackPlacer" class="d-flex flex-grow-1 align-items-start avarias-and-feedback-placer"></div>
    </div>
    <!-- Group Item line -->
    <table>
        <tbody>
            <tr id="groupItemLineCloneNode">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <!-- Group data -->
    <div id="groupDataCloneNode" class="d-flex flex-column container-relatorio-sintetico-sort">
        <ul class="list-group flex-column list-group-horizontal">
            <li class="list-group-item border-0 text-center">
                <strong id="sortLabels"><span></span></strong><span id="sortTitles"></span>
            </li>
            <li class="list-group-item border-0" id="groupDataItemStartPlacer">
            </li>
            <li class="list-group-item border-0 text-center"></li>
        </ul>
    </div>
    <!-- Produto avarias info -->
    <div id="avariasProdutoTableCloneNode" class="d-flex justify-content-start align-items-center">
        <table class="table table-borderless text-center avarias-produto-table">
            <thead class="thead-primary">
                <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Furado</th>
                    <th scope="col">Vazando</th>
                    <th scope="col">Vazio</th>
                    <th scope="col">Molhado</th>
                    <th scope="col">Rasgado</th>
                    <th scope="col">Faltante</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div class="obs-textarea"></div>
    </div>
    <!-- Avarias table -->
    <table class="table table avarias-table" id="avariasTableCloneNode">
        <thead class="thead-primary">
            <tr>
                <th scope="col">AVARIAS</th>
            </tr>
        </thead>
        <tbody>
            <tr class="d-flex justify-content-center align-items-center">
                <td id="avariasProdutoTablePlacer">
                    <!-- Produtos tables go here -->
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Feedback -->
    <table class="table table feedback-table" id="feedbackTableCloneNode">
        <thead class="thead-primary">
            <tr>
                <th scope="col">FEEDBACK</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="feedbackPlacer">
                    <!-- Feedbacks go here -->
                </td>
            </tr>
        </tbody>
    </table>
</div>