<?php
class Paginations
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*COMPOUND*/
    public function paginations_compound()
    {
        $compound = new Paginations();
        switch ($this->swit) {
            case 'listar-funcionarios-paginations':
                $decodeEntry = json_decode($this->entry);
                $this->build["registroInit"] = $decodeEntry->ini;
                $this->build["registrosPagina"] = $decodeEntry->max;
                if (!isset($decodeEntry->current)) $this->build["registroAtual"] = $decodeEntry->ini;
                if (isset($decodeEntry->current)) $this->build["registroAtual"] = $decodeEntry->current;

                $compound->entry = "";
                $compound->swit = "listar-funcionarios-paginations-max-view";
                $this->build["totalRegistros"] = $compound->loopdata_paginations();
                $relacaoIntFloat = $this->build["totalRegistros"] / $this->build["registrosPagina"];
                if (is_int($relacaoIntFloat)) $this->build["paginasDisponiveis"] = ceil($relacaoIntFloat);
                if (is_float($relacaoIntFloat)) $this->build["paginasDisponiveis"] = floor($relacaoIntFloat) + 1;
                $compound->build = $this->build;
                $compound->build = $this->build;
                return json_encode($this->build);
                break;
            case 'listar-retronos-nfe-paginations':
                $decodeEntry = json_decode($this->entry);
                $this->build["registroInit"] = $decodeEntry->ini;
                $this->build["registrosPagina"] = $decodeEntry->max;
                if (!isset($decodeEntry->current)) $this->build["registroAtual"] = $decodeEntry->ini;
                if (isset($decodeEntry->current)) $this->build["registroAtual"] = $decodeEntry->current;

                $compound->entry = "";
                $compound->swit = "listar-retronos-nfe-paginations-max-view";
                $this->build["totalRegistros"] = $compound->loopdata_paginations();
                $relacaoIntFloat = $this->build["totalRegistros"] / $this->build["registrosPagina"];
                if (is_int($relacaoIntFloat)) $this->build["paginasDisponiveis"] = ceil($relacaoIntFloat);
                if (is_float($relacaoIntFloat)) $this->build["paginasDisponiveis"] = floor($relacaoIntFloat) + 1;
                $compound->build = $this->build;
                $compound->build = $this->build;
                return json_encode($this->build);
                break;
                /*default:break;*/
        }
    }
    /*LOOPDATA*/
    public function loopdata_paginations()
    {
        $loops = new Paginations_loopdata();
        $loops->entry = $this->entry;
        $loops->swit = $this->swit;
        $loops->build = $this->build;
        return $loops->loopdata_paginations();
    }
}
