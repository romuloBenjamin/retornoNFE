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
            case 'listar-retronos-nfe-paginations-search':
                $loops->build = $this->build;
                $sql = $loops->loopdata_listar_registros_nfe_search();
                $loops->entry = $sql;
                $result = $loops->loopdata_exec();
                $resultSet = $result->num_rows;
                break;
            case 'salvar-retornos-nfe':
                $verifica = json_decode($loops->verifica_if_returns());
                if ($verifica->status == "0") $result = json_encode($verifica);
                if ($verifica->status == "1") {
                    $sql = $loops->loopdata_insert_registros_nfe();
                    $loops->entry = $sql;
                    $inserts = $loops->loopdata_exec();
                    if ($inserts == 1) $result = json_encode(array("status" => "1", "msn" => "Sucesso! Retorno Cadastrado."));
                    if ($inserts != 1) $result = json_encode(array("status" => "0", "msn" => "Desculpe. N??o foi poss??vel cadastrar."));
                }
                $resultSet = $result;
                break;
                /*default:break; */
        }
        return $resultSet;
    }
    /*SQL -> retorno sql*/
    public function loopdata_sql_retorno_nfes()
    {
        /*PATTERNS*/
        $patterns = json_decode($this->entry);
        if (!isset($patterns->current)) $ini = $patterns->ini;
        if (isset($patterns->current)) {
            if (intval($patterns->current) == 1) $ini = 0;
            if (intval($patterns->current) != 1) $ini = ((intval($patterns->current) * intval($patterns->max)) - intval($patterns->max));
        }
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

        /*SQL INIT*/
        $sql = "SELECT * FROM uni_intra_retorno_nfes";
        $sql .= " WHERE ";
        /*IF EXIST PROPERTY -> motorista*/
        if (property_exists($patterns->search->searchdata, "motorista") == true) {
            $sql .= "uirn_agregado_id = '" . trim($patterns->search->searchdata->motorista->id) . "'";
            if (count(get_object_vars($patterns->search->searchdata)) > 1) $sql .= " AND ";
        }
        /*IF EXIST PROPERTY -> equipe*/
        if (property_exists($patterns->search->searchdata, "equipe") == true) {
            $sql .= "uirn_notas_cliente LIKE '%" . $patterns->search->searchdata->equipe->name . "%'";
            if (count(get_object_vars($patterns->search->searchdata)) > 2) $sql .= " AND ";
        }
        /*IF EXIST PROPERTY -> motivo*/
        if (property_exists($patterns->search->searchdata, "motivos") == true) {
            $sql .= "uirn_notas_retorno LIKE '%" . trim($patterns->search->searchdata->motivos->name) . "%'";
            if (count(get_object_vars($patterns->search->searchdata)) > 3) $sql .= " AND ";
        }
        if (property_exists($patterns->search->searchdata, "nf") == true) {
            $nf_search = $patterns->search->searchdata->nf;
            $nfe = 's:' . strlen($nf_search) . ':"' . $nf_search . '"';
            $sql .= "(uirn_notas_retorno LIKE '%" . $nfe . "%'";
            $sql .= " OR ";
            $sql .= "uirn_romaneios = '" . trim($patterns->search->searchdata->romaneio) . "')";
        }
        $sql .= " LIMIT " . trim($patterns->ini) . ", " . trim($patterns->max);
        return $sql;
    }
    /*SQL -> INSERT DATA*/
    public function loopdata_insert_registros_nfe()
    {
        $patterns = json_decode($this->entry);
        /*GET FACTORY DATA CADASTRO E SAIDA*/
        $setFactory = new Logistica_loopdata();
        $setFactory->entry = $patterns->entry->dados_romaneios->dataCadastro;
        $dataCadastro = $setFactory->ajustar_data();
        $setFactory->entry = $patterns->entry->dados_romaneios->saida;
        $dataSaida = $setFactory->ajustar_data();
        /*GET FACTORY DADOS CLIENTE*/
        $setFactory_dadosCli = new Logistica_loopdata();
        $setFactory_dadosCli->entry = $patterns->entry;
        $dadosCli = $setFactory_dadosCli->gerar_dados_cliente();
        $dadosRetornos = $setFactory_dadosCli->gerar_dados_retornos();
        /*GET FACTORY DADOS NFE*/

        /*SQL*/
        $sql = "INSERT INTO uni_intra_retorno_nfes VALUES ";
        $sql .= "(";
        $sql .= "NULL,";
        $sql .= "'" . trim($dataCadastro) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->horaCadastro) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->motoristaid) . "',";
        $sql .= "'" . trim($patterns->entry->dados_romaneios->qtdnotas) . "',";
        $sql .= "'" . trim($dadosRetornos) . "',";
        $sql .= "'" . trim($dadosCli) . "',";
        $sql .= "'" . trim($dataSaida) . "',";
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
    public function loopdata_listar_registros_nfe_search()
    {
        /*PREPARE DATA TO SEARCH*/
        $patterns = $this->build["origin"];

        /*SQL INIT*/
        $sql = "SELECT * FROM uni_intra_retorno_nfes";
        $sql .= " WHERE ";
        /*IF EXIST PROPERTY -> motorista*/
        if (property_exists($patterns->search->searchdata, "motorista") == true) {
            $sql .= "uirn_agregado_id = '" . trim($patterns->search->searchdata->motorista->id) . "'";
            if (count(get_object_vars($patterns->search->searchdata)) > 1) $sql .= " AND ";
        }
        /*IF EXIST PROPERTY -> equipe*/
        if (property_exists($patterns->search->searchdata, "equipe") == true) {
            $sql .= "uirn_notas_cliente LIKE '%" . $patterns->search->searchdata->equipe->name . "%'";
            if (count(get_object_vars($patterns->search->searchdata)) > 1) $sql .= " AND ";
        }
        /*IF EXIST PROPERTY -> motivo*/
        if (property_exists($patterns->search->searchdata, "motivos") == true) {
            $sql .= "uirn_notas_retorno LIKE '%" . trim($patterns->search->searchdata->motivos->name) . "%'";
            if (count(get_object_vars($patterns->search->searchdata)) > 1) $sql .= " AND ";
        }
        if (property_exists($patterns->search->searchdata, "nf") == true) {
            $nf_search = $patterns->search->searchdata->nf;
            $nfe = 's:' . strlen($nf_search) . ':"' . $nf_search . '"';
            $sql .= "(uirn_notas_retorno LIKE '%" . $nfe . "%'";
            $sql .= " OR ";
            $sql .= "uirn_romaneios = '" . trim($patterns->search->searchdata->romaneio) . "')";
        }
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
        $array_combine["status"] = 0;
        $array_combine["data"] = array();
        $array_combine["msn"] = "Desculpe, n??o foi poss??vel localizar os dados solicitados! -> " . $this->swit . "";
        return json_encode($array_combine);
    }
    /*FACTORY*/
    public function verifica_if_returns()
    {
        $patterns = json_decode($this->entry);
        /*RETURN SE VAZIO*/
        $retorno_ate = json_decode(json_encode($patterns->entry->dados_romaneios), true);
        foreach ($retorno_ate as $tags => $content) {
            if ($content == "") return json_encode(array("status" => "0", "msn" => "Desculpe, para inserir n??o pode haver campos vazios!"));
        }
        return json_encode(array("status" => "1", "msn" => "Sucesso! pode Cadastrar."));
    }
    public function ajustar_data()
    {
        $data = $this->entry;
        $data_xplod_reverse = array_reverse(explode("/", $data));
        $data_implode = str_replace(" ", "", implode("-", $data_xplod_reverse));
        return $data_implode;
    }
    public function gerar_dados_cliente()
    {
        /*DADOS CLIENTE*/
        $dados_cli = array("cod_cliente", "nome_cliente", "vendedor");
        /*CONFIG*/
        $nArray = array();
        $array_final = array();
        /*PATTERNS*/
        $patterns = json_decode(json_encode($this->entry->nfe_retornadas), true);
        for ($i = 0; $i < count($patterns); $i++) {
            foreach ($patterns[$i] as $tags => $content) {
                if (in_array($tags, $dados_cli)) {
                    if ($tags == "codcliente") $tags = "cod_cliente";
                    if ($tags == "nomecliente") $tags = "nome_cliente";
                    $nArray[$tags] = $content;
                }
            }
            $array_final[] = $nArray;
        }
        $results = $array_final;
        return serialize($results);
    }
    public function gerar_dados_retornos()
    {
        /*DADOS CLIENTE*/
        $dados_nfe = array("codcliente", "nomecliente", "vendedor", "empresa");
        /*CONFIG*/
        $nArray = array();
        $array_final = array();
        /*PATTERNS*/
        $patterns = json_decode(json_encode($this->entry->nfe_retornadas), true);
        for ($i = 0; $i < count($patterns); $i++) {
            foreach ($patterns[$i] as $tags => $content) {
                if (!in_array($tags, $dados_nfe)) {
                    if ($tags == "motivodesc") $tags = "motivo_descricao";
                    if ($tags == "liberadopor") $tags = "liberado_por";
                    if ($tags == "motivonome") $tags = "motivo_nome";
                    if ($tags == "codmotivo") $tags = "cod_motivo";
                    if ($tags == "empresa") $tags = "filial";
                    if ($tags == "nfe") $tags = "NF";
                    $nArray[$tags] = $content;
                }
            }
            $array_final[] = $nArray;
        }
        $results = $array_final;
        return serialize($results);
    }
}
