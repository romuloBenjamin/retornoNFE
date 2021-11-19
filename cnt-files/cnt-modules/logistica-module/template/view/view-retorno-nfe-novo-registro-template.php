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
                        <div class="item w-10">
                            <div class="item-name">NFe</div>
                            <div class="input-group input-group-sm">
                                <input type="number" name="nfeInput" id="nfeInput" class="form-control">
                            </div>
                        </div>
                        <!-- Emissão -->
                        <div class="item w-13">
                            <div class="item-name">Emissão</div>
                            <div class="input-group input-group-sm">
                                <input type="date" name="emissaoInput" id="emissaoInput" class="form-control">
                            </div>
                        </div>
                        <!-- Cliente -->
                        <div class="item w-50">
                            <div class="item-name">Cliente</div>
                            <div class="d-flex input-group input-group-sm">
                                <input type="number" name="codClienteInput" id="codClienteInput" placeholder="Cod." class="form-control text-center cod-cliente-input w-25">
                                <div class="cliente-view w-75" id="nomeClienteView"></div>
                            </div>
                        </div>
                        <!-- Vendedor -->
                        <div class="item w-10">
                            <div class="item-name">Vendedor</div>
                            <div class="input-group input-group-sm">
                                <input type="text" name="vendedorInput" id="vendedorInput" class="form-control">
                            </div>
                        </div>
                        <!-- Filiais -->
                        <div class="item w-20">
                            <div class="item-name">Filial</div>
                            <div class="input-group input-group-sm">
                                <select name="forEmpresa" id="forEmpresa" class="form-control">
                                    <option id="filial-[index]" value="0">Escolha a Filial</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-grow-1 resizable-container">
                        <!-- Motivo -->
                        <div class="item">
                            <div class="item-name">Motivo</div>
                            <div class="align-items-center input-group input-group-sm motivo-tr">
                                <input type="number" name="codMotivoInput" id="codMotivoInput" placeholder="Cod. Motivo" class="form-control text-center">
                            </div>
                        </div>
                        <!-- MOTIVOS -->
                        <div class="d-none item" id="dataDeParaView">
                            <div id="dataDeParaViewHeader" class="item-name">Periodo</div>
                            <div class="input-group input-group-sm">
                                <input type="date" name="dataRetornoDeInput" id="dataRetornoDeInput" class="form-control">
                                <input type="date" name="dataRetornoParaInput" id="dataRetornoParaInput" class="form-control">
                            </div>
                        </div>
                        <div class="d-none item" id="horaDeParaView">
                            <div id="horaDeParaViewHeader" class="item-name">Periodo</div>
                            <div class="input-group input-group-sm">
                                <input type="time" name="horaRetornoDeInput" id="horaRetornoDeInput" class="form-control">
                                <input type="time" name="horaRetornoParaInput" id="horaRetornoParaInput" class="form-control">
                            </div>
                        </div>
                        <div class="d-none item flex-grow-1" id="liberadoPorView">
                            <div id="liberadoPorViewHeader" class="item-name">Liberado por</div>
                            <div class="input-group input-group-sm">
                                <input type="text" name="liberadoPorInput" id="liberadoPorInput" class="form-control">
                            </div>
                        </div>
                        <div class="d-none item" id="nfesRetornadasView">
                            <div id="nfesRetornadasViewHeader" class="item-name">Qtd NFe</div>
                            <div class="input-group input-group-sm">
                                <input type="number" name="nfesRetornadasInput" id="nfesRetornadasInput" class="form-control">
                            </div>
                        </div>
                        <div class="d-none item flex-grow-1" id="descontoView">
                            <div id="descontoViewHeader" class="d-none item-name">Desconto</div>
                            <div class="input-group input-group-sm">
                                <input type="text" name="descontoInput" id="descontoInput" disabled="" class="form-control" value="R$ 0,00">
                            </div>
                        </div>
                    </div>
                    <div class="d-none">
                        <div class="item-name w-16">
                            Descrição do motivo
                        </div>
                        <div class="description-view w-84" id="motivoDescView">Motivo</div>
                        <div class="item flex-grow-1">
                            <div id="avariasViewHeader" class="d-none view-avarias"></div>
                            <div class="d-none view-avarias">
                                <button class="btn btn-secondary btn-view-avarias">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Avarias Container Placer -->
            <div id="avariasContainerPlacer" class="d-none"></div>
        </div>
    </div>
</div>
<script src="cnt-files/cnt-modules/search-module/js/create-select-list-js.js" defer></script>
<script src="cnt-files/cnt-modules/logistica-module/js/cadastro-retorno-nfes-js.js" defer></script>