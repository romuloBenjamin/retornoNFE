<?php
class Usuarios_loopdata
{
    var $entry;
    var $build;
    var $swit;

    public function __contruct()
    {
        $this->build = array();
    }

    public function loopdata_build()
    {
        $loops = new Usuarios_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;

        switch ($this->swit) {
            case 'listar-funcionarios-short':
                $sql = $loops->usuarios_listar_funcionarios();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-funcionarios-short";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-funcionarios-short-search':
                $loops->entry = $this->entry;
                $sql = $loops->usuarios_listar_funcionarios_search();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-funcionarios-short";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'cadastrar-funcionarios':
                $loops->entry = $this->entry;
                $this->build["saveEntry"] = $this->entry;
                $sql = $loops->usuarios_cadastrar_funcionarios();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                if ($result === true) {
                    $sql = $loops->usuarios_ultimo_cadastro();
                    $loops->entry = $sql;
                    $result = $loops->loopdata_execute();
                    $this->build["ultimoCadastro"] = json_decode(json_encode($result->fetch_array()), true)["ui_funcionarios_id"];
                }
                $loops->entry = $this->build["ultimoCadastro"];
                $loops->build = $this->build;
                $sql1 = $loops->usuarios_cadastrar_complemento_funcionarios();
                $loops->entry = $sql1;
                $result = $loops->loopdata_execute();
                if ($result === false) $resultSet = json_encode(array("status" => "0", "msn" => "Desculpe, não foi possível cadastrar o Funcionário!"));
                if ($result === true) $resultSet = json_encode(array("status" => "1", "msn" => "Funcionario Cadastrado com Sucesso!"));
                break;
            case 'listar-usuario-vendedor':
                $loops->entry = $this->entry;
                $sql = $loops->usuarios_listar_vendedor();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-usuario-vendedor";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-get-equipes-setor':
                $loops->entry = $this->entry;
                $sql = $loops->usuarios_get_equipes();
                $loops->entry = $sql;
                $results = $loops->loopdata_execute();
                if ($results->num_rows == 0) $resultSet = json_encode(array("status" => "0", "msn" => "Desculpe, não foi possivel identificar a equipe!"));
                if ($results->num_rows != 0) {
                    $loops->entry = $results;
                    $loops->build = $this->build;
                    $resultSet = $loops->loopdata_buildset();
                }
                break;
            case 'listar-aniversariantes':
                $sql = $loops->usuarios_listar_aniversariantes();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-aniversariantes";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-cargos':
                $sql = $loops->usuarios_listar_cargos();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-cargos";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-departamentos':
                $sql = $loops->usuarios_listar_departamentos();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-departamentos";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-filiais':
                $sql = $loops->usuarios_listar_filiais();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-filiais";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-equipes':
                $sql = $loops->usuarios_listar_equipes();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-equipes";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-lideres':
                $sql = $loops->usuarios_listar_lideres();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-lideres";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-generos':
                $sql = $loops->usuarios_listar_generos();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-generos";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-periodos':
                $sql = $loops->usuarios_listar_periodos();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-periodos";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-ramais-batua':
                $loops->entry = "1";
                $sql = $loops->usuarios_listar_ramais();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-ramais-batua";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-ramais-hasegawa':
                $loops->entry = "2";
                $sql = $loops->usuarios_listar_ramais();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $loops->entry = $result;
                $loops->swit = "listar-ramais-hasegawa";
                $resultSet = $loops->loopdata_buildset();
                break;
            case 'listar-status':
                $resultSet = $loops->loopdata_fixed_buildset();
                break;
            case 'listar-paginations-max-view':
                $sql = $loops->usuarios_listar_registros();
                $loops->entry = $sql;
                $result = $loops->loopdata_execute();
                $resultSet = $result->num_rows;
                break;
                /*default:break;*/
        }
        return $resultSet;
    }
    /*SQL -> LISTAR REGISTROS*/
    public function usuarios_listar_registros()
    {
        $sql = "SELECT ui_funcionarios_id FROM uni_intra_funcionarios";
        $sql .= " WHERE ui_funcionarios_STATUS = '1'";
        return $sql;
    }
    /*SQL -> LISTAR FUNCIONARIOS*/
    public function usuarios_listar_funcionarios()
    {
        $paginations = json_decode($this->entry);
        /*SQL*/
        $sql = "SELECT ui_funcionarios_id, ui_funcionarios_nome, ui_funcionarios_apelido, ui_funcionarios_ramal, ui_funcionarios_email, ui_funcionarios_cargo_id, ui_funcionarios_departamento_id, ui_funcionarios_filial_id, ui_funcionarios_nascimento, ui_funcionarios_matricula";
        $sql .= " FROM uni_intra_funcionarios WHERE ";
        $sql .= "ui_funcionarios_STATUS = '1' ";
        if (isset($paginations->current)) {
            $calculo = ((intval($paginations->current) * intval($paginations->max)) - intval($paginations->max));
            $sql .= "LIMIT " . trim($calculo) . ", " . trim($paginations->max);
        }
        if (!isset($paginations->current)) {
            $sql .= "LIMIT " . trim($paginations->ini) . ", " . trim($paginations->max);
        }
        return $sql;
    }
    /*SQL -> GET EQUIPE*/
    public function usuarios_get_equipes()
    {
        $patterns = json_decode($this->entry);
        /*SQL*/
        $sql = "SELECT ui_funcionarios_id, ui_funcionarios_apelido, uie_id, uie_setor_id, uie_nome, uid_id, uid_name FROM uni_intra_funcionarios";
        $sql .= " INNER JOIN ";
        $sql .= "uni_intra_equipes";
        $sql .= " ON ";
        $sql .= "uni_intra_funcionarios.ui_funcionarios_equipe_id = uni_intra_equipes.uie_id";
        $sql .= " INNER JOIN ";
        $sql .= "uni_intra_departamentos";
        $sql .= " ON ";
        $sql .= "uni_intra_funcionarios.ui_funcionarios_departamento_id = uni_intra_departamentos.uid_id";
        $sql .= " WHERE ";
        $sql .= "uni_intra_funcionarios.ui_funcionarios_id = '" . trim($patterns->query) . "'";
        $sql .= " AND ";
        $sql .= "uni_intra_funcionarios.ui_funcionarios_STATUS = '1'";
        return $sql;
    }
    /*SQL -> LISTAR VENDEDOR */
    public function usuarios_listar_vendedor()
    {
        $paginations = json_decode($this->entry);
        /*SQL*/
        $sql = "SELECT ui_funcionarios_equipe_id, ui_funcionarios_apelido";
        $sql .= " FROM uni_intra_funcionarios WHERE ";
        $sql .= "ui_funcionarios_id = " . $paginations->search->vendedor;
        $sql .= " AND ";
        $sql .= "ui_funcionarios_STATUS = '1'";
        return $sql;
    }

    /*SQL -> GET LAST CADASTRO*/
    public function usuarios_ultimo_cadastro()
    {
        $sql = "SELECT ui_funcionarios_id FROM uni_intra_funcionarios ORDER BY ui_funcionarios_id DESC LIMIT 0, 1";
        return $sql;
    }
    /*SQL -> LISTAR FUNCIONARIOS PESQUISADOS*/
    public function usuarios_listar_funcionarios_search()
    {
        $sql = "SELECT ui_funcionarios_id, ui_funcionarios_nome, ui_funcionarios_apelido, ui_funcionarios_ramal, ui_funcionarios_email, ui_funcionarios_cargo_id, ui_funcionarios_departamento_id, ui_funcionarios_filial_id, ui_funcionarios_nascimento, ui_funcionarios_matricula FROM uni_intra_funcionarios";
        $sql .= " WHERE ";
        if (!empty($this->entry["searchdata"])) {
            $patterns = json_decode(json_encode($this->entry["searchdata"]));
            foreach ($patterns as $tags => $content) {
                if ($tags === "site") $sql .= "ui_funcionarios_filial_id = '" . $content . "' AND ";
                if ($tags === "depto") $sql .= "ui_funcionarios_departamento_id = '" . $content . "' AND ";
                if ($tags === "cargo") $sql .= "ui_funcionarios_cargo_id = '" . $content . "' AND ";
                if ($tags === "equipe") $sql .= "ui_funcionarios_equipe_id = '" . $content . "' AND ";
                if ($tags === "search") $sql .= "ui_funcionarios_nome LIKE '%" . $content . "%' OR ui_funcionarios_apelido LIKE '%" . $content . "%' AND ";
                if ($tags === "status") $sql .= "ui_funcionarios_STATUS = '" . $content . "' ";
            }
        } else {
            $sql .= "ui_funcionarios_STATUS = '1' ";
        }
        $sql .= "LIMIT " . $this->entry["ini"] . ", " . $this->entry["listar"];
        return $sql;
    }
    /*SQL -> CADASTRAR FUNCIONARIOS*/
    public function usuarios_cadastrar_funcionarios()
    {
        $patterns = json_decode($this->entry);
        $sql = "INSERT INTO uni_intra_funcionarios VALUES ";
        $sql .= "(";
        $sql .= "NULL,";
        $sql .= "'" . date('Y-m-d') . "',";
        $sql .= "'" . date('H:i:s') . "',";
        $sql .= "'" . $patterns->forsite . "',";
        $sql .= "'" . $patterns->fordepto . "',";
        $sql .= "'" . $patterns->forcargo . "',";
        if ($patterns->forequipe == "*") $sql .= "NULL,";
        if ($patterns->forequipe != "*") $sql .= "'" . $patterns->forequipe . "',";
        if (empty($patterns->formatricula)) $sql .= "'0000',";
        if (!empty($patterns->formatricula)) $sql .= "'" . $patterns->formatricula . "',";
        $sql .= "'" . trim($patterns->forname) . "',";
        $sql .= "'" . $patterns->forgenero . "',";
        $sql .= "'" . $patterns->fornascimento . "',";
        $sql .= "'" . $patterns->forperiodo . "',";
        $sql .= "'" . trim($patterns->forapelido) . "',";
        $sql .= "'" . trim($patterns->foremail) . "',";
        if (empty($patterns->forramal)) $sql .= "NULL,";
        if (!empty($patterns->forramal)) $sql .= "'" . $patterns->forramal . "',";
        $sql .= "'" . $patterns->foradmissao . "',";
        $sql .= "'" . date('H:i:s') . "',";
        $sql .= "NULL,";
        $sql .= "NULL,";
        $sql .= "1";
        $sql .= ")";
        return $sql;
    }
    /*SQL -> CADASTRAR COMPLEMENTO FUNCIONARIOS*/
    public function usuarios_cadastrar_complemento_funcionarios()
    {
        $patterns = json_decode($this->build["saveEntry"]);
        $sql = "INSERT INTO uni_intra_funcionarios_complementos VALUES ";
        $sql .= "(";
        $sql .= "NULL,";
        $sql .= "'" . $this->entry . "',";
        if (empty($patterns->forcep)) $sql .= "NULL,";
        if (!empty($patterns->forcep)) $sql .= "'" . $patterns->forcep . "',";
        if (empty($patterns->forendereco)) $patterns->forendereco = "-";
        $sql .= "'" . trim($patterns->forendereco) . "',";
        if (empty($patterns->fornumero)) $sql .= "NULL,";
        if (!empty($patterns->fornumero)) $sql .= "'" . $patterns->fornumero . "',";
        if (empty($patterns->forbairro)) $patterns->forbairro = "-";
        $sql .= "'" . trim($patterns->forbairro) . "',";
        if (empty($patterns->forcidade)) $patterns->forcidade = "-";
        $sql .= "'" . trim($patterns->forcidade) . "',";
        if (empty($patterns->foruf)) $patterns->foruf = "-";
        $sql .= "'" . trim($patterns->foruf) . "',";
        if (empty($patterns->forobs)) $sql .= "NULL,";
        if (!empty($patterns->forobs)) $sql .= "'" . trim($patterns->forobs) . "',";
        if (empty($patterns->fortelefone)) $sql .= "NULL,";
        if (!empty($patterns->fortelefone)) $sql .= "'" . trim($patterns->fortelefone) . "',";
        if (empty($patterns->forcelular)) $sql .= "NULL,";
        if (!empty($patterns->forcelular)) $sql .= "'" . trim($patterns->forcelular) . "',";
        $sql .= "'1'";
        $sql .= ")";
        return $sql;
    }
    /*SQL -> LISTAR CARGOS DISPONIVEIS*/
    public function usuarios_listar_cargos()
    {
        $sql = "SELECT uic_id, uic_cargos_slug FROM uni_intra_cargos WHERE uic_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR ANIVERSARIANTES*/
    public function usuarios_listar_aniversariantes()
    {
        $sql = "SELECT ui_funcionarios_id, ui_funcionarios_nascimento, ui_funcionarios_apelido FROM uni_intra_funcionarios WHERE ui_funcionarios_STATUS = '1'";
        return $sql;
    }
    /*SQL -> LISTAR DEPARTAMENTOS DISPONIVEIS*/
    public function usuarios_listar_departamentos()
    {
        $sql = "SELECT uid_id, uid_name FROM uni_intra_departamentos WHERE uid_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR FILIAIS*/
    public function usuarios_listar_filiais()
    {
        $sql = "SELECT uif_id, uif_name FROM uni_intra_filial WHERE uif_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR EQUIPES*/
    public function usuarios_listar_equipes()
    {
        $sql = "SELECT uie_id, uie_nome FROM uni_intra_equipes WHERE uie_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR LIDERES*/
    public function usuarios_listar_lideres()
    {
        $sql = "SELECT uie_id, uie_nome, ui_funcionarios_apelido ";
        $sql .= "FROM uni_intra_equipes ";
        $sql .= "INNER JOIN uni_intra_funcionarios ";
        $sql .= "ON uni_intra_equipes.uie_id = uni_intra_funcionarios.ui_funcionarios_equipe_id ";
        $sql .= "WHERE ";
        $sql .= "uni_intra_funcionarios.ui_funcionarios_cargo_id = '5' AND uni_intra_equipes.uie_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR GENEROS*/
    public function usuarios_listar_generos()
    {
        $sql = "SELECT uifg_id, uifg_tipo FROM uni_intra_generos WHERE uifg_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR PERIODOS*/
    public function usuarios_listar_periodos()
    {
        $sql = "SELECT uip_id, uip_name FROM uni_intra_periodos WHERE uip_status = '1'";
        return $sql;
    }
    /*SQL -> LISTAR RAMAIS*/
    public function usuarios_listar_ramais()
    {
        $sql = "SELECT uir_id, uir_ramal, uir_preferencia FROM uni_intra_ramais";
        $sql .= " WHERE ";
        $sql .= "uir_site = '" . trim($this->entry) . "'";
        $sql .= " AND ";
        $sql .= "uir_status = '1'";
        return $sql;
    }
    /*EXECUTE*/
    public function loopdata_execute()
    {
        $executeQ = new Main();
        $executeQ->sql = $this->entry;
        return $executeQ->executeQuery();
    }
    /*BUILDSETTER*/
    public function loopdata_buildset()
    {
        /*PATTERNS*/
        $getPatterns = json_decode($this->build["patterns"]);
        /*LOOPDATA*/
        $nArray = array();
        $array_combine = array();

        if ($this->entry->num_rows > 0) {
            $array_combine["status"] = "1";
            $array_combine["msn"] = "Loopdata gerado com Sucesso! ->" . $this->swit;
            $array_combine["totalRegistros"] = $this->entry->num_rows;
            $array_combine["data"] = array();
            while ($itens = $this->entry->fetch_array()) {
                foreach ($itens as $tags => $content) {
                    if (!is_int($tags)) {
                        if ($tags == "ui_funcionarios_ramal") {
                            $nArray[$tags] = unserialize($content);
                        } else {
                            $nArray[$tags] = $content;
                        }
                    }
                }
                $array_combine["data"][] = array_combine($getPatterns, $nArray);
            }
        } else {
            $array_combine["status"] = "0";
            $array_combine["msn"] = "Desculpe, erro ao Gerar loopdata em usuarios ->" . $this->swit;
        }
        return json_encode($array_combine);
    }
    /*BUILDSETTER -> FIXED*/
    public function loopdata_fixed_buildset()
    {
        /*PATTERNS*/
        $getPatterns = json_decode($this->build["patterns"]);
        /*LOOPDATA*/
        $nArray = array("ativo", "inativos", "ocultos");
        $array_combine = array();

        $array_combine["status"] = "1";
        $array_combine["msn"] = "Loopdata gerado com Sucesso! ->" . $this->swit;
        $array_combine["totalRegistros"] = count($nArray);
        $array_combine["data"] = array();

        for ($i = 0; $i < count($nArray); $i++) {
            $array_combine["data"][$i] = array("ids" => $i + 1, "status" => $nArray[$i]);
        }
        return json_encode($array_combine);
    }
}
