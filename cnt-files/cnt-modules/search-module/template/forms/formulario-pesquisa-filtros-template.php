<form action="javascript: void(0);" style="margin-left: .5rem;" method="get" class="d-flex filtros-paginas flex-rows" id="filtrar-listagem">
    <!-- Filtros BASICOS -->
    <div class="d-flex container-filtro">
        <select name="forMotorista" id="forMotorista" class="form-control">
            <option value="*">Selecione o Motorista</option>
        </select>
    </div>

    <div class="d-flex container-filtro">
        <select name="forEquipe" id="forEquipe" class="form-control">
            <option value="*">Selecione a equipe</option>
        </select>
    </div>

    <div class="d-flex container-filtro">
        <select name="forMotivos" id="forMotivos" class="form-control">
            <option value="*">Selecione o motivo</option>
        </select>
    </div>

    <div class="d-flex container-filtro">
        <input style="min-width: 20rem;" type="text" name="search" id="search" placeholder="NF|Nº Romaneio|Nº do Motivo" class="form-control">
    </div>

    <div style="margin-left: .5rem;" class="d-flex container-filtro">
        <button id="forSearch" class="btn btn-secondary"><i class="fas fa-search"></i></button>
    </div>
</form>