<?php
class Clientes_patterns
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*PATTERNS*/
    public function patterns_clientes()
    {
        $patterns = new Clientes_patterns();
        switch ($this->swit) {
            case 'listar-clientes':
                $patterns->entry = "ids,cliente";
                $resultSet = $patterns->patterns_build();
                break;
                /*default:break;*/
        }
        return $resultSet;
    }

    public function patterns_build()
    {
        $nArray = array();
        $xplode = explode(",", $this->entry);
        for ($i = 0; $i < count($xplode); $i++) {
            $nArray[] = $xplode[$i];
        }
        return $nArray;
    }
}
