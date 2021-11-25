<title>Gerador de Relatórios</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<link rel="stylesheet" href="../../../../cnt-assets/fontawesome/css/all.css">
<link rel="stylesheet" href="../../../../css/style.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<script src="../../../../cnt-js/script.js" defer></script>
<script src="../../../../cnt-js/scripts-relatorios.js" defer></script>

<main id="container-relatorio" class="d-flex flex-column justify-content-center container-relatorio">
    <!-- HEADER RELATORIO -->
    <header id="headerRelatorio" class="d-flex justify-content-center">
        <ul class="list-group list-group-horizontal">
            <li class="d-flex align-items-center list-group-item border-0" id="relatorioTitulo">RETORNO DE NOTAS</li>
            <li class="d-flex flex-column list-group-item border-0" id="relatorioPeriodo"><small><b>PERIODO:</b></small> <span>[ini] as [fin]</span></li>
            <li class="d-flex align-items-center list-group-item border-0" id="relatorioTipo">[type]</li>
        </ul>
    </header>
    <hr>
    <!-- CONTEUDO RELATORIO SINTETICO -->
    <section id="conteudoRelatorio" class="d-flex flex-column">
        <div id="cloneNode1" class="d-flex flex-column conteudo-interno-relatorios">
            <ul class="list-group flex-column list-group-horizontal relatorio-departamentos">
                <li class="list-group-item border-0">
                    <strong>DEPARTAMENTO:</strong>
                    <span></span>
                </li>
            </ul>
            <div class="d-flex flex-column container-relatorio-sintetico-sort">
                <ul class="list-group flex-column list-group-horizontal">
                    <li class="list-group-item border-0">
                        <strong id="sortLabels">MOTIVOS:</strong>
                        <span id="sortTitles"></span>
                    </li>
                    <li class="list-group-item border-0">
                        <div class="table-container">
                            <table class="table table-striped">
                                <thead class="thead-primary">
                                    <tr>
                                        <th scope="col">NFE</th>
                                        <th scope="col">COD. CLIENTE</th>
                                        <th scope="col">CLIENTE</th>
                                        <th scope="col">COD. VEND.</th>
                                        <th scope="col">EQUIPE</th>
                                        <th scope="col">MOTIVO</th>
                                        <th scope="col">AVARIAS</th>
                                        <th scope="col">FEEDBACK</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="cloneNode2">
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li class="list-group-item border-0"></li>
                </ul>
            </div>
        </div>
    </section>
    <hr>
    <footer></footer>
</main>