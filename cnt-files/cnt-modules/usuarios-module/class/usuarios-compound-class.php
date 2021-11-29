<?php
class Usuarios_module
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*GET COMPOUND*/
    public function compound_usuarios()
    {
        $compound = new Usuarios_module();
        switch ($this->swit) {
            case 'listar-funcionarios-short':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->compound_loopdata();
                break;
            case 'listar-funcionarios-short-search':
                $compound->swit = "listar-funcionarios-short";
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->swit = "listar-funcionarios-short-search";
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->compound_loopdata();
                break;
            case 'cadastrar-funcionarios':
                $compound->swit = $this->swit;
                $compound->entry = $this->entry;
                $resultSet = $compound->compound_loopdata();
                break;
            case 'listar-usuario-vendedor':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->compound_loopdata();
                break;
            case 'listar-get-equipes-setor':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->compound_loopdata();
                break;
            case 'listar-aniversariantes':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-cargos':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-departamentos':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-filiais':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-equipes':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-lideres':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-status':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-generos':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-periodos':
                $compound->swit = $this->swit;
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-ramais-batua':
                $compound->swit = "listar-ramais";
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->swit = "listar-ramais-batua";
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-ramais-hasegawa':
                $compound->swit = "listar-ramais";
                $this->build["patterns"] = $compound->compound_patterns();
                $compound->swit = "listar-ramais-hasegawa";
                $compound->build = $this->build;
                $this->build["loopdata"] = $compound->compound_loopdata();
                $resultSet = $this->build["loopdata"];
                break;
            case 'listar-paginations-max-view':
                $compound->swit = $this->swit;
                $compound->entry = $this->entry;
                $compound->build = $this->build;
                $resultSet = $compound->compound_loopdata();
                break;
                /*default:break;*/
        }
        return $resultSet;
    }

    /*SET PATTERNS*/
    public function compound_patterns()
    {
        $patterns = new Usuarios_patterns();
        $patterns->entry = $this->entry;
        $patterns->swit = $this->swit;
        return $patterns->patterns_type();
    }

    /*COMPOUND LOOPDATA*/
    public function compound_loopdata()
    {
        $loopdata = new Usuarios_loopdata();
        $loopdata->entry = $this->entry;
        $loopdata->swit = $this->swit;
        $loopdata->build = $this->build;
        return $loopdata->loopdata_build();
    }
}
