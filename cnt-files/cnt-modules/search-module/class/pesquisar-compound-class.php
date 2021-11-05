<?php
class Pesquisar_compound
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }
    /*COMPOUND PESQUISAR ANTIGOS*/
    public function compound_pesquisar_antigos()
    {
        $compound = new Pesquisar_compound();
        switch ($this->swit) {
            case 'pesquisar-romaneios-db-antigo':
                $this->build["patterns"] = $compound->patterns_pesquisar();
                $compound->build = $this->build;
                var_dump($compound);
                //$resultSet = $compound->loopdata_logistica();
                break;
                /*default:break;*/
        }
    }
    /*PATTERNS PESQUISAR*/
    public function patterns_pesquisar()
    {
        $patterns = new Pesquisar_patterns();
        $patterns->entry = $this->entry;
        $patterns->swit = $this->swit;
        $patterns->build = $this->build;
        return $patterns->patterns_compound();
    }

    /*LOOPDATA PESQUISAR*/
    public function loopdata_pesquisar()
    {
        $loops = new Pesquisar_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;
        return $loops->loopdata_compound();
    }
}
