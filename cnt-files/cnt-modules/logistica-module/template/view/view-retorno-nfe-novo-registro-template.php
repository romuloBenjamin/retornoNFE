<div class="d-flex flex-column table-container-cadastro-nfe" id="table-container-cadastro-nfe">
    <table id="table-[index]" class="table table-calc cadastro-nfe-retorno">
        <thead class="thead-light">
            <tr>
                <th scope="col"></th>
                <th scope="col">NFe</th>
                <th scope="col">Emissão</th>
                <th scope="col">Cliente</th>
                <th scope="col">Vendedor</th>
                <th scope="col">Filial</th>
                <th scope="col">Motivo</th>
                <!--
                <th id="data_de_para" class="d-none table_line_oculta" scope="col">Periodo</th>
                <th id="hora_de_para" class="d-none table_line_oculta" scope="col">Periodo</th>
                <th id="liberadopor" class="d-none table_line_oculta" scope="col">Liberado por</th>
                <th id="qtd_retorno" class="d-none table_line_oculta" scope="col">Qtd NFe</th>
                <th class="d-none" scope="col">Desconto</th>
                <th id="vv_avarias" class="d-none view-avarias" scope="col"></th>
                -->
            </tr>
        </thead>
        <tbody id="baseCopy">
            <tr id="item-line-[index]">
                <td>
                    <!-- Add new nfe item -->
                    <button id="add-new-line" onclick="add_new_nfe(this);" class="btn" style="padding:0;">
                        <i class="fas fa-plus-circle"></i>
                    </button>
                    <!-- Remove nfe item -->
                    <button id="delete-new-line" onclick="remove_nfe(this)" class="d-none btn" style="padding:0;">
                        <i class="fa fa-minus-circle"></i>
                    </button>
                </td>
                <!-- NFe -->
                <td style="width: 7rem;">
                    <div class="input-group input-group-sm">
                        <input type="number" name="nfe-[index]" id="nfe-[index]" class="form-control">
                    </div>
                </td>
                <!-- Emissão -->
                <td>
                    <div class="input-group input-group-sm">
                        <input type="date" name="emissao-[index]" id="emissao-[index]" class="form-control">
                    </div>
                </td>
                <!-- Cliente -->
                <td>
                    <div style="height: auto;" class="input-group align-items-center form-control input-group-sm">
                        <input onkeyup="live_clientes(this);" type="number" name="codCliente-[index]" id="codCliente-[index]" placeholder="Cod. Cliente" class="form-control nf-informa text-center border-0">
                        <div style="height: auto;" class="d-none form-control border-0 container-vv cliente-view-[index]" id="cliente-view-[index]"></div>
                        <input type="hidden" name="cliente-nome-[index]" id="cliente-nome-[index]">
                    </div>
                </td>
                <!-- Vendedor -->
                <td>
                    <div class="input-group input-group-sm"><input type="text" name="vendedor-[index]" id="vendedor-[index]" class="form-control"></div>
                </td>
                <!-- Filiais -->
                <td>
                    <div class="input-group input-group-sm">
                        <select name="forEmpresa" id="forEmpresa" class="form-control">
                            <option id="filial-[index]" value="0">Escolha a Filial</option>
                        </select>
                    </div>
                </td>
                <!-- Motivo -->
                <td>
                    <div style="height: auto;" class="input-group align-items-center container-motivos form-control input-group-sm">
                        <input style="max-width: auto;" onkeyup="live_motivos(this);" type="number" name="motivo-[index]" id="motivo-[index]" placeholder="Cod. Motivo" class="form-control text-center border-0">
                        <div style="height: auto;" class="d-none border-0 form-control container-vv motivo-view-[index]" id="motivo-view-[index]"></div>
                        <input type="hidden" name="motivoName-[index]" id="motivoName-[index]">
                    </div>
                </td>
                <!-- MOTIVOS -->
                <!--
                <td class="d-none table_line_oculta" id="data_de_para" style="width: 16rem;">
                    <div class="input-group input-group-sm">
                        <input type="date" name="dataRetornoDe-[index]" id="dataRetornoDe-[index]" class="form-control">
                        <input type="date" name="dataRetornoPara-[index]" id="dataRetornoPara-[index]" class="form-control">
                    </div>
                </td>
                <td class="d-none table_line_oculta" id="hora_de_para" style="width: 11rem;">
                    <div class="input-group input-group-sm">
                        <input type="time" name="horaRetornoDe-[index]" id="horaRetornoDe-[index]" class="form-control">
                        <input type="time" name="horaRetornoPara-[index]" id="horaRetornoPara-[index]" class="form-control">
                    </div>
                </td>
                <td class="d-none table_line_oculta" id="liberadopor">
                    <div class="input-group input-group-sm">
                        <input type="text" name="liberadoPor-[index]" id="liberadoPor-[index]" class="form-control">
                    </div>
                </td>
                <td class="d-none table_line_oculta" id="qtd_retorno">
                    <div class="input-group input-group-sm">
                        <input type="number" name="nfeRetornadas-[index]" id="nfeRetornadas-[index]" class="form-control">
                    </div>
                </td>
                <td class="d-none">
                    <div class="input-group input-group-sm">
                        <input type="text" name="desconto-[index]" id="desconto-[index]" disabled="" class="form-control" value="R$ 0,00">
                    </div>
                </td>
                -->
                <td class="d-none view-avarias"><button class="btn btn-secondary btn-view-avarias"><i class="fas fa-ellipsis-v"></i></button></td>
            </tr>
        </tbody>
    </table>
</div>
<script src="cnt-files/cnt-modules/search-module/js/create-select-list-js.js" defer></script>
<script src="cnt-files/cnt-modules/logistica-module/js/cadastro-retorno-nfes-js.js" defer></script>