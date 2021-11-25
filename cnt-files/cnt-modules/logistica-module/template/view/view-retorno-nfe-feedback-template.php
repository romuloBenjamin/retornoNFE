<div class="d-flex flex-column">
    <table id="table-feedbacks-nfe" class="table table-hover table-striped">
        <thead class="thead-light">
            <tr>
                <th scope="col" class="nfe-col">NFe</th>
                <th scope="col" class="vendedor-col">Vendedor</th>
                <th scope="col" class="cliente-col">Cliente</th>
                <th scope="col" class="filial-col">Filial</th>
                <th scope="col" class="motivos-col">Motivos</th>
                <th scope="col" class="feedback-col">Feedback</th>
            </tr>
        </thead>
        <tbody id="feedbackPlacer">
        </tbody>
    </table>
</div>

<!-- Clones container -->
<div class="d-none">
    <table>
        <tbody>
            <!-- Feedback table line to clone -->
            <tr id="feedbackCloneNode">
                <td></td>
                <td>
                    <div class="d-flex"></div>
                </td>
                <td></td>
                <td>
                    <div class="d-flex"></div>
                </td>
                <td></td>
                <td>
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column justify-content-center textarea-container" id="textareaPlacer">
                        </div>
                        <div class="d-flex flex-column justify-content-center button-container">
                            <button class="d-block btn btn-outline-primary feedback-button" id="editButton">
                                <i class="far fa-edit"></i>
                            </button>
                            <button class="d-block btn btn-outline-primary feedback-button" id="saveButton">
                                <i class="far fa-save"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <textarea class="d-flex form-control feedback-textarea" id="feedbackTextareaCloneNode" name="feedbackTextarea" placeholder="Digite o Feedback"></textarea>
</div>

<script src="<?= DIR_PATH; ?>cnt-modules/logistica-module/js/listar-feedbacks-nfes-js.js" defer></script>