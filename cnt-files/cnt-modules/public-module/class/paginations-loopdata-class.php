<?php
class Paginations_loopdata
{
    var $entry;
    var $swit;
    var $build;

    public function __construct()
    {
        $this->build = array();
    }

    /*LOOPDATA COMPOUND*/
    public function loopdata_paginations()
    {
        $loops = new Paginations_loopdata();
        switch ($this->swit) {
            case 'listar-funcionarios-paginations-max-view':
                $loops->entry = $this->entry;
                $loops->swit = "listar-paginations-max-view";
                $loops->build = $this->build;
                return $loops->loopdata_funcionarios();
                break;
            case 'listar-retronos-nfe-paginations-max-view':
                $loops->entry = $this->entry;
                $loops->swit = "listar-paginations-max-view";
                $loops->build = $this->build;
                return $loops->loopdata_logistica();
                break;
                /*default:break;*/
        }
    }

    /*LOOPDATA FUNCIONARIOS*/
    public function loopdata_funcionarios()
    {
        //$usuarios = new Usuarios_module();
        //$usuarios->entry = $this->entry;
        //$usuarios->swit = $this->swit;
        //$usuarios->build = $this->build;
        //return $usuarios->compound_usuarios();
    }

    /*LOOPDATA LOGISTICA*/
    public function loopdata_logistica()
    {
        $logistica = new Logistica_compound();
        $logistica->entry = $this->entry;
        $logistica->swit = $this->swit;
        $logistica->build = $this->build;
        return $logistica->compound_logistica();
    }
}
