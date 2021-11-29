<?php
class Relatorios_compound
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*COMPOUND*/
    public function compound_relatorios()
    {
        $compound = new Relatorios_compound();
        switch ($this->swit) {
            case 'listar-relatorio-sintetico':
                $compound->entry = $this->entry;
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->patterns_compound();
                $compound->build = $this->build;
                $results = $compound->loopdata_relatorios();
                $resultSet = $results;
                break;
                /*default:break;*/
        }
        return $resultSet;
    }
    /*PATTERNS*/
    public function patterns_compound()
    {
        $loops = new Relatorios_patterns();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;
        return $loops->patterns_compound();
    }
    /*LOOPDATA*/
    public function loopdata_relatorios()
    {
        $loops = new Relatorios_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;
        return $loops->loopdata_relatorios();
    }
}
