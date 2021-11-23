<?php
class Logistica_compound
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*COMPOUND LOGISTICA*/
    public function compound_logistica()
    {
        $compound = new Logistica_compound();
        $compound->entry = $this->entry;
        $compound->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-retornos-nfe':
                $this->build["patterns"] = $compound->patterns_logistica();
                $compound->build = $this->build;
                $resultSet = $compound->loopdata_logistica();
                break;
            case 'listar-retornos-nfe-search':
                $this->build["patterns"] = $compound->patterns_logistica();
                $compound->build = $this->build;
                $resultSet = $compound->loopdata_logistica();
                break;
            case 'listar-regioes-transportadas':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->patterns_logistica();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->loopdata_logistica();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-transportadores':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->patterns_logistica();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->loopdata_logistica();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-motivos-retorno-nfe':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->patterns_logistica();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->loopdata_logistica();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-retronos-nfe-paginations':
                $compound->swit = $this->swit;
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->loopdata_logistica();
                break;
            case 'salvar-retornos-nfe':
                $compound->swit = $this->swit;
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->loopdata_logistica();
                break;
                /*default:break;*/
        }
        return $resultSet;
    }

    /*PATTERNS LOGISTICA*/
    public function patterns_logistica()
    {
        $patterns = new Logistica_patterns();
        $patterns->entry = $this->entry;
        $patterns->swit = $this->swit;
        $patterns->build = $this->build;
        return $patterns->patterns_compound();
    }

    /*LOOPDATA LOGISTICA*/
    public function loopdata_logistica()
    {
        $loops = new Logistica_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;
        return $loops->loopdata_compound();
    }
}
