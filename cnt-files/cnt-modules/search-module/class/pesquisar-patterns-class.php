<?php
class Pesquisar_patterns
{
    public function patterns_compound()
    {
        $lista_keys = new Pesquisar_patterns();
        $lista_keys->swit = $this->swit;
        switch ($this->swit) {
            case 'listar-retornos-nfe':
                $lista_keys->entry = "";
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
