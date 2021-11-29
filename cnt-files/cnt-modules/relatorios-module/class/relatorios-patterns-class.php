<?php
class Relatorios_patterns
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*PATTERNS*/
    public function patterns_compound()
    {
        $lista_keys = new Relatorios_patterns();
        $lista_keys->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-relatorio-sintetico':
                $lista_keys->entry = "id,cadastro_data,cadastro_hora,agregado_id,qtd_nfe,data_nfe,data_cli,romaneio_saida,romaneio_registro,setor_id,vlr_bruto";
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
