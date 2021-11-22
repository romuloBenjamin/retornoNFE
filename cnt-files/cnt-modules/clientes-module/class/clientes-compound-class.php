<?php
class Clientes_compound
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*COMPOUND*/
    public function compound_clientes()
    {
        $compound = new Clientes_compound();
        switch ($this->swit) {
            case 'listar-clientes':
                $compound->entry = $this->entry;
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->patterns_clientes();
                $compound->build = $this->build;
                $results = $compound->loopdata_clientes();
                $resultSet = $results;
                break;
                /*default:break;*/
        }
        return $resultSet;
    }

    /*TO PATTERNS*/
    public function patterns_clientes()
    {
        $patterns = new Clientes_patterns();
        $patterns->entry = $this->entry;
        $patterns->swit = $this->swit;
        $patterns->build = $this->build;
        return $patterns->patterns_clientes();
    }

    /*TO LOOPDATA*/
    public function loopdata_clientes()
    {
        $loops = new Clientes_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;
        return $loops->loopdata_clientes();
    }
}
