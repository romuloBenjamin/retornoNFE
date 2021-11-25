<?php
class Relatorios_loopdata
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*COMPOUND*/
    public function loopdata_relatorios()
    {
        $loops = new Relatorios_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-relatorio-sintetico':
                $sql = $loops->relatorios_dados_sintetico_sql();
                $loops->entry = $sql;
                $results = $loops->execute_loopdata();
                if ($results->num_rows == 0) $resultset = json_encode(array("status" => "0", "msn" => "Desculpe, não foi possível localizar os dados. -> " . trim($this->swit) . ""));
                if ($results->num_rows != 0) {
                    $loops->entry = $results;
                    $resultset = $loops->loopdata_build(false);
                }
                break;
                /*default:break;*/
        }
        return $resultset;
    }
    /*SQL -> relatorio sintetico*/
    public function relatorios_dados_sintetico_sql()
    {
        /*PATTERNS*/
        $patterns = json_decode($this->entry);
        /*SQL*/
        $sql = "SELECT * FROM uni_intra_retorno_nfes";
        $sql .= " WHERE ";
        $sql .= "uirn_saida_romaneio BETWEEN '" . trim($patterns->query->data_ini) . "'";
        $sql .= " AND ";
        $sql .= "'" . trim($patterns->query->data_fin) . "'";
        return $sql;
    }
    /*EXECUTE LOOPDATA*/
    public function execute_loopdata()
    {
        $execute = new Main();
        $execute->sql = $this->entry;
        return $execute->executeQuery();
    }
    /*BUILD*/
    public function loopdata_build($hasPatterns = true)
    {
        /*PATTERNS*/
        if ($hasPatterns == true) $patterns = $this->build["patterns"];
        $unserie = array("uirn_notas_cliente", "uirn_notas_retorno", "avarias");
        $nArray = array();
        $array_combine = array();
        $array_combine["status"] = "1";
        while ($itens = $this->entry->fetch_array()) {
            foreach ($itens as $tags => $content) {
                if (!is_int($tags)) {
                    if (in_array($tags, $unserie)) $nArray[$tags] = unserialize($content);
                    if (!in_array($tags, $unserie)) $nArray[$tags] = $content;
                }
            }
            if ($hasPatterns == true) $array_combine["data"][] = array_combine($patterns, $nArray);
            if ($hasPatterns == false) $array_combine["data"][] = $nArray;
        }
        $array_combine["msn"] = "Sucesso! Dados Objtidos -> " . $this->swit;
        return json_encode($array_combine);
    }
}
