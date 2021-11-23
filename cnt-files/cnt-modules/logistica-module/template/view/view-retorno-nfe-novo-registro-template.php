<div class="d-block table-container-cadastro-nfe" id="newRegistroNFEsContainer">
    <div id="newRegistroNFEContainerCloneNode" class="new-registro-nfe-container">
        <div id="tableNewRegistro" class="d-flex flex-column justify-content-center new-registro">
            <div class="d-flex new-registro-container">
                <div class="d-flex border">
                    <!-- Add new nfe item -->
                    <button id="addNFEButton" type="button" class="btn add-nfe-btn">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                    <!-- Remove nfe item -->
                    <button id="deleteNFEButton" type="button" class="d-none btn delete-nfe-btn">
                        <i class="fa fa-minus-circle"></i>
                    </button>
                </div>
                <div class="d-flex flex-column flex-grow-1">
                    <div class="d-flex flex-grow-1">
                        <!-- NFe -->
                        <div class="item nfe-container">
                            <div class="d-flex item-name">NFe</div>
                            <div class="input-group input-group-sm">
                                <input type="number" min="0" name="nfe" id="nfe" placeholder="Núm. NFe" class="form-control text-center">
                            </div>
                        </div>
                        <!-- Emissão -->
                        <div class="item emissao-container">
                            <div class="d-flex item-name">Emissão</div>
                            <div class="input-group input-group-sm">
                                <input type="date" name="emissao" id="emissao" class="text-center form-control">
                            </div>
                        </div>
                        <!-- Cliente -->
                        <div class="item cliente-container">
                            <div class="d-flex item-name">Cliente</div>
                            <div class="d-flex input-group input-group-sm">
                                <input type="number" min="1" name="codCliente" id="codCliente" placeholder="Cod. Cliente" class="form-control text-center w-25">
                                <input type="string" name="nomeCliente" id="nomeCliente" disabled="true" class="form-control cliente-name-view w-75">
                            </div>
                        </div>
                        <!-- Vendedor -->
                        <div class="item vendedor-container">
                            <div class="d-flex item-name">Vendedor</div>
                            <div class="input-group input-group-sm">
                                <input type="number" min="0" name="vendedor" id="vendedor" placeholder="Cod. Vendedor" class="form-control text-center">
                            </div>
                        </div>
                        <!-- Filiais -->
                        <div class="item filiais-container">
                            <div class="d-flex item-name">Filial</div>
                            <div class="input-group input-group-sm">
                                <select name="forEmpresa" id="forEmpresa" class="form-control empresa-select">
                                    <option id="filial" value="0">Escolha a Filial</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <!-- Motivo -->
                        <div class="item motivo-container">
                            <div class="item-name">Motivo</div>
                            <div class="align-items-center input-group input-group-sm">
                                <input type="number" min="1" name="codMotivo" id="codMotivo" placeholder="Cod. Motivo" class="form-control text-center">
                            </div>
                        </div>
                        <div class="d-flex motivo-data-container">
                            <div class="d-flex resizable-container">
                                <!-- MOTIVOS -->
                                <div class="d-none item data-container" id="dataDeParaView">
                                    <div id="dataDeParaViewHeader" class="d-flex item-name">Periodo</div>
                                    <div class="input-group input-group-sm">
                                        <input type="date" name="dataRetornoDe" id="dataRetornoDe" class="text-center form-control">
                                        <input type="date" name="dataRetornoPara" id="dataRetornoPara" class="text-center form-control">
                                    </div>
                                </div>
                                <div class="d-none item hora-container" id="horaDeParaView">
                                    <div id="horaDeParaViewHeader" class="d-flex item-name">Periodo</div>
                                    <div class="input-group input-group-sm">
                                        <input type="time" name="horaRetornoDe" id="horaRetornoDe" class="text-center form-control">
                                        <input type="time" name="horaRetornoPara" id="horaRetornoPara" class="text-center form-control">
                                    </div>
                                </div>
                                <div class="d-none item liberado-por-container" id="liberadoPorView">
                                    <div id="liberadoPorViewHeader" class="d-flex item-name">Liberado por</div>
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="liberadoPor" id="liberadoPor" class="form-control">
                                    </div>
                                </div>
                                <div class="d-none item nfes-retornadas-container" id="nfesRetornadasView">
                                    <div id="nfesRetornadasViewHeader" class="d-flex item-name">Qtd NFe</div>
                                    <div class="input-group input-group-sm">
                                        <input type="number" name="nfesRetornadas" id="nfesRetornadas" class="form-control">
                                    </div>
                                </div>
                                <div class="d-none item desconto-container" id="descontoView">
                                    <div id="descontoViewHeader" class="d-flex item-name">Desconto</div>
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="desconto" id="desconto" disabled="true" class="form-control" value="R$ 0,00">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none">
                        <div class="d-flex align-items-center item-name">
                            Descrição do motivo
                        </div>
                        <input class="motivo-desc-view form-control" id="motivoDesc" name="motivoDesc" disabled="true">
                        <div class="d-none avarias-button" id="showAvariasButton">
                            <div class="d-flex align-items-center show-avarias-button-container">
                                <button class="btn btn-secondary">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Avarias Container Placer -->
            <div id="avariasContainerPlacer" class="d-none avarias-container-placer"></div>
        </div>
    </div>
</div>
<script src="cnt-files/cnt-modules/search-module/js/create-select-list-js.js" defer></script>
<script src="cnt-files/cnt-modules/logistica-module/js/cadastro-retorno-nfes-js.js" defer></script>