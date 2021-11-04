<?php
class Controladora
{
    var $page;
    var $module;
    var $build;

    public function __construct()
    {
        /*SET TYPE BUILD*/
        $this->build = array();
        /*LOUD CURRENT PAGE*/
        $setPage = new TryVars();
        if (empty($setPage->get_slug())) $this->build["pageName"] = "retornoNFES";
        if (!empty($setPage->get_slug())) $this->build["pageName"] = $setPage->get_slug();
        /*LOUD COMUNS PAGE*/
        $loudComuns = new TryVars();
        $loudComuns->module = "public";
        $loudComuns->folder = "jsons";
        $loudComuns->file = "comunPages";
        $this->build["comuns"] = $loudComuns->loudJson();
    }
    /*PAGE CONTROLLER*/
    public function controller_page()
    {
        $page = new Controladora();
        $nArray = array();
        /*LOUD COMUN PAGES*/
        $comuns = $this->build["comuns"]->comunPages;
        for ($i = 0; $i < count($comuns); $i++) {
            if ($comuns[$i]->file === $this->build["pageName"]) {
                $nArray[] = DIR_PATH . "cnt-modules/" . trim($comuns[$i]->module) . "-module/page-" . trim($comuns[$i]->file) . "-intranet.php";
            }
        }
        /*IF EMPTY OR NULL*/
        if ($this->build["pageName"] === "retornoNFES") $nArray[] = DIR_PATH . "cnt-modules/public-module/page-retornoNFES-intranet.php";
        $page->page = $nArray[0];
        return $page->loud_controller();
    }
    /*LOUD CONTROLLER*/
    public function loud_controller()
    {
        return $this->page;
    }
}
