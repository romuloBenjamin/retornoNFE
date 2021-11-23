<?php
class Clientes_loopdata
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*LOOPDATA*/
    public function loopdata_clientes()
    {
        $loops = new Clientes_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-clientes':
                $sql = $loops->loopdata_clientes_listar_sql();
                $loops->entry = $sql;
                $results = $loops->loopdata_exec();
                if ($results->num_rows == 0) return json_encode(array("status" => "0", "msn" => "Desculpe, não foi possível executar loops."));
                $loops->entry = $results;
                $loops->build = $this->build;
                if ($results->num_rows != 0) $resultSet = $loops->loopdata_buildLoop();
                break;
                /*default:break;*/
        }
        return $resultSet;
    }

    /*SQL*/
    public function loopdata_clientes_listar_sql()
    {
        $sql = "SELECT * FROM uni_intra_clientes";
        $sql .= " WHERE ";
        $sql .= "uic_id = '" . trim($this->entry) . "'";
        return $sql;
    }
    /*SQL*/

    /*EXECUTE*/
    public function loopdata_exec()
    {
        $execute = new Main();
        $execute->sql = $this->entry;
        return $execute->executeQuery();
    }

    /*BUILD*/
    public function loopdata_buildLoop()
    {
        $patterns = $this->build["patterns"];
        $nArray = array();
        $array_combine = array();
        $array_combine["status"] = "1";
        while ($itens = $this->entry->fetch_array()) {
            foreach ($itens as $tags => $content) {
                if (!is_int($tags)) {
                    $nArray[$tags] = $content;
                }
            }
            $array_combine["data"][] = array_combine($patterns, $nArray);
        }
        $array_combine["msn"] = "Loopdata criado com Sucesso! -> " . $this->swit;
        return json_encode($array_combine);
    }
}
