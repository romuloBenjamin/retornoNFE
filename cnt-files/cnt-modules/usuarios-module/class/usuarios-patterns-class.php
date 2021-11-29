<?php
class Usuarios_patterns
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }
    /*SET PATTERNS USUARIOS*/
    public function patterns_type()
    {
        switch ($this->swit) {
            case 'listar-funcionarios-short':
                $resultSet = json_encode(array("ids", "nome", "apelido", "ramal", "email", "cargo", "departamento", "filial", "aniversario", "foto"));
                break;
            case 'listar-cargos':
                $resultSet = json_encode(array("ids", "cargo"));
                break;
            case 'listar-aniversariantes':
                $resultSet = json_encode(array("ids", "nascimento", "apelido"));
                break;
            case 'listar-departamentos':
                $resultSet = json_encode(array("ids", "departamento"));
                break;
            case 'listar-filiais':
                $resultSet = json_encode(array("ids", "filial"));
                break;
            case 'listar-equipes':
                $resultSet = json_encode(array("ids", "equipes"));
                break;
            case 'listar-lideres':
                $resultSet = json_encode(array("ids", "equipes", "lider"));
                break;
            case 'listar-status':
                $resultSet = json_encode(array("ids", "status"));
                break;
            case 'listar-generos':
                $resultSet = json_encode(array("ids", "generos"));
                break;
            case 'listar-periodos':
                $resultSet = json_encode(array("ids", "periodos"));
                break;
            case 'listar-ramais':
                $resultSet = json_encode(array("ids", "ramais", "setor"));
                break;
            case 'listar-get-equipes-setor':
                $resultSet = json_encode(array("ids", "nomevendedor", "equipeid", "setorvendasid", "equipenome", "departamentoid", "departamento"));
                break;
            case 'listar-usuario-vendedor':
                $resultSet = json_encode(array("ids", "vendedor"));
                break;
                /*default:break;*/
        }
        return $resultSet;
    }
}
