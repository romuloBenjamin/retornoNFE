<?php
class Logistica_loopdata
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }
    /*LOOPDATA COMPOUND*/
    public function loopdata_compound()
    {
        $loops = new Logistica_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-retornos-nfe':
                $sql = $loops->loopdata_sql_retorno_nfes();
                $loops->entry = $sql;
                $results = $loops->loopdata_exec();
                $loops->build = $this->build;
                if ($results->num_rows == 0) $resultSet = $loops->loopdata_no_build();
                if ($results->num_rows > 0) {
                    $loops->entry = $results;
                    $resultSet = $loops->loopdata_build();
                }
                break;
            case 'listar-retornos-nfe-search':
                $sql = $loops->loopdata_sql_retorno_nfes_search();
                $loops->entry = $sql;
                $results = $loops->loopdata_exec();
                $loops->build = $this->build;
                if ($results->num_rows == 0) $resultSet = $loops->loopdata_no_build();
                if ($results->num_rows > 0) {
                    $loops->entry = $results;
                    $resultSet = $loops->loopdata_build();
                }
                break;
            case 'listar-regioes-transportadas':
                $sql = $loops->loopdata_sql_regioes_transportadas();
                $loops->entry = $sql;
                $results = $loops->loopdata_exec();
                $loops->build = $this->build;
                if ($results->num_rows == 0) $resultSet = $loops->loopdata_no_build();
                if ($results->num_rows > 0) {
                    $loops->entry = $results;
                    $resultSet = $loops->loopdata_build();
                }
                break;
            case 'listar-transportadores':
                $sql = $loops->loopdata_sql_lista_transportadores();
                $loops->entry = $sql;
                $results = $loops->loopdata_exec();
                $loops->build = $this->build;
                if ($results->num_rows == 0) $resultSet = $loops->loopdata_no_build();
                if ($results->num_rows > 0) {
                    $loops->entry = $results;
                    $resultSet = $loops->loopdata_build();
                }
                break;
            case 'listar-motivos-retorno-nfe':
                $sql = $loops->loopdata_sql_lista_motivos_retornos();
                $loops->entry = $sql;
                $results = $loops->loopdata_exec();
                $loops->build = $this->build;
                if ($results->num_rows == 0) $resultSet = $loops->loopdata_no_build();
                if ($results->num_rows > 0) {
                    $loops->entry = $results;
                    $resultSet = $loops->loopdata_build();
                }
                break;
            case 'listar-retronos-nfe-paginations':
                $sql = $loops->loopdata_listar_registros_nfe();
                $loops->entry = $sql;
                $result = $loops->loopdata_exec();
                $resultSet = $result->num_rows;
                break;
            case 'salvar-retornos-nfe':
                $verifica = json_decode($loops->verifica_if_returns());
                if ($verifica->status == "1") {
                    $sql = $loops->loopdata_insert_registros_nfe();
                    $loops->entry = $sql;
                    $inserts = $loops->loopdata_exec();
                    if ($inserts == "") $resultSet = $inserts;
                    if ($inserts != "") $resultSet = json_encode(array("status" => "0", "msn" => "Desculpe. Não foi possível cadastrar."));
                }
                if ($verifica->status == "0") $result = json_encode($verifica);
                $resultSet = $result;
                break;
                /*default:break; */
        }
        return $resultSet;
    }

    /*SQL*/
    public function loopdata_sql_retorno_nfes()
    {
        $patterns = json_decode($this->entry);
        $ini = ((intval($patterns->ini) * intval($patterns->max)) - (intval($patterns->max) - 1));
        if (isset($patterns->current)) $ini = ((intval($patterns->current) * intval($patterns->max)) - (intval($patterns->max) - 1));

        if ($ini < 0) $ini = 0;

        $sql = "SELECT * FROM uni_intra_retorno_nfes";
        $sql .= " ";
        $sql .= "LIMIT " . trim($ini) . ", " . trim($patterns->max);
        return $sql;
    }
    /*SQL*/
    public function loopdata_sql_retorno_nfes_search()
    {
        /*PREPARE DATA TO SEARCH*/
        $patterns = json_decode($this->entry);
        $patterns_search = json_decode($this->entry);
        $removes = array("a:2:", ";}", "{");

        /*SQL INIT*/
        $sql = "SELECT * FROM uni_intra_retorno_nfes";
        $sql .= " WHERE ";
        /*IF EXIST PROPERTY -> motorista*/
        if (property_exists($patterns_search->search, "motorista") == true) {
            $sql .= "uirn_agregado_id = '" . trim($patterns_search->search->motorista->id) . "'";
            if (count(get_object_vars($patterns_search->search)) > 1) $sql .= " AND ";
        }
        /*IF EXIST PROPERTY -> equipe*/
        if (property_exists($patterns_search->search, "equipe") == true) {
            $search_part = serialize(json_decode(json_encode($patterns_search->search->equipe, true), true));
            $search_part = str_replace($removes, "", $search_part);
            $sql .= "uirn_notas_cliente LIKE '%" . $search_part . "%'";
            if (count(get_object_vars($patterns_search->search)) > 2) $sql .= " AND ";
        }
        /*IF EXIST PROPERTY -> motivo*/
        if (property_exists($patterns_search->search, "motivos") == true) {
            $search_part2 = $patterns_search->search->motivos->name;
            $sql .= "uirn_notas_retorno LIKE '%" . trim($search_part2) . "%'";
            if (count(get_object_vars($patterns_search->search)) > 3) $sql .= " AND ";
        }
        $sql .= " LIMIT " . trim($patterns->ini) . ", " . trim($patterns->max);
        return $sql;
    }
    /*SQL*/
    public function loopdata_insert_registros_nfe()
    {
        $patterns = json_decode($this->entry);
        /*SQL*/
        $sql = "INSERT INTO uni_intra_retorno_nfes VALUES ";
        $sql .= "(";
        $sql .= "'NULL',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->dataCadastro) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->horaCadastro) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->motoristaid) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->qtdnotas) . "',";
        $sql .= "'uirn_notas_retorno',";
        $sql .= "'uirn_notas_cliente',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->saida) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->romaneios) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->setorid) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->diaria) . "'";
        $sql .= ")";
        return $sql;
    }
    /*SQL*/
    public function loopdata_sql_regioes_transportadas()
    {
        $sql = "SELECT uirt_id, uirt_regiao FROM uni_intra_regioes_transportadas";
        $sql .= " WHERE ";
        $sql .= "uirt_status = '1'";
        return $sql;
    }
    /*SQL*/
    public function loopdata_listar_registros_nfe()
    {
        $sql = "SELECT uirn_id FROM uni_intra_retorno_nfes";
        return $sql;
    }
    /*SQL*/
    public function loopdata_sql_lista_transportadores()
    {
        $sql = "SELECT uia_id, uia_name, uia_apelido FROM uni_intra_agregados";
        $sql .= " WHERE ";
        $sql .= "uia_status = '1'";
        return $sql;
    }
    /*SQL*/
    public function loopdata_sql_lista_motivos_retornos()
    {
        $sql = "SELECT uirnm_id, uirnm_nome FROM uni_intra_retorno_nfes_motivos";
        $sql .= " WHERE ";
        $sql .= "uirnm_status = '1'";
        return $sql;
    }
    /*EXECUTE LOOPDATA*/
    public function loopdata_exec()
    {
        $exec = new Main();
        $exec->sql = $this->entry;
        return $exec->executeQuery();
    }
    /*BUILD LOOPDATA*/
    public function loopdata_build()
    {
        $nArray = array();
        $array_combine = array();
        $i = 0;
        $array_combine["status"] = 1;
        while ($itens = $this->entry->fetch_array()) {
            foreach ($itens as $tags => $content) {
                if (!is_int($tags)) $nArray[$tags] = $content;
            }
            $array_combine["data"][] = array_combine($this->build["patterns"], $nArray);
            if ($this->swit == "listar-retornos-nfe") {
                $array_combine["data"][$i]["data_cli"] = unserialize($array_combine["data"][$i]["data_cli"]);
                $array_combine["data"][$i]["data_nfe"] = unserialize($array_combine["data"][$i]["data_nfe"]);
            }
            if ($this->swit == "listar-retornos-nfe-search") {
                $array_combine["data"][$i]["data_cli"] = unserialize($array_combine["data"][$i]["data_cli"]);
                $array_combine["data"][$i]["data_nfe"] = unserialize($array_combine["data"][$i]["data_nfe"]);
            }
            $i++;
        }
        $array_combine["msn"] = "Sucesso! -> " . $this->swit . "";
        return json_encode($array_combine);
    }
    /*BUILD NO LOOPDATA*/
    public function loopdata_no_build()
    {
        $array_combine = array();
        $array_combine["status"] = 1;
        $array_combine["data"] = array();
        $array_combine["msn"] = "Desculpe, não foi possível localizar os dados solicitados! -> " . $this->swit . "";
        return json_encode($array_combine);
    }
    /*FACTORY*/
    public function verifica_if_returns()
    {
        $patterns = json_decode($this->entry);
        /*RETURN SE VAZIO*/
        $retorno_ate = json_decode(json_encode($patterns->entry->dados_romaneios), true);
        foreach ($retorno_ate as $tags => $content) {
            if ($content == "") return json_encode(array("status" => "0", "msn" => "Desculpe, para inserir não pode haver campos vazios!"));
        }
        return json_encode(array("status" => "1", "msn" => "Sucesso! pode Cadastrar."));
    }
}
