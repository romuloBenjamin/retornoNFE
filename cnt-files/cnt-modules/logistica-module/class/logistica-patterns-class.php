<?php
class Logistica_patterns
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }
    /*COMPOUND PATTERNS*/
    public function patterns_compound()
    {
        $lista_keys = new Logistica_patterns();
        $lista_keys->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-retornos-nfe':
                $lista_keys->entry = "id,cadastro_data,cadastro_hora,agregado_id,qtd_nfe,data_nfe,data_cli,romaneio_saida,romaneio_registro,setor_id,vlr_bruto";
                $resultSet = $lista_keys->patterns_build();
                break;
            case 'listar-retornos-nfe-search':
                $lista_keys->entry = "id,cadastro_data,cadastro_hora,agregado_id,qtd_nfe,data_nfe,data_cli,romaneio_saida,romaneio_registro,setor_id,vlr_bruto";
                $resultSet = $lista_keys->patterns_build();
                break;
            case 'listar-transportadores':
                $lista_keys->entry = "ids,transportador,nome";
                $resultSet = $lista_keys->patterns_build();
                break;
            case 'listar-motivos-retorno-nfe':
                $lista_keys->entry = "ids,motivo";
                $resultSet = $lista_keys->patterns_build();
                break;
            case 'listar-regioes-transportadas':
                $lista_keys->entry = "ids,regioes";
                $resultSet = $lista_keys->patterns_build();
                break;
                /*default:break; */
        }
        return $resultSet;
    }
    /*BUILD PATTERNS*/
    public function patterns_build()
    {
        return explode(",", $this->entry);
    }
}
