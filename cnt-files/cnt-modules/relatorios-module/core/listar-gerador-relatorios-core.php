<?php session_start();
$core = "core";
require_once "../../../cnt-php/defines.php";
require DIR_PATH . "cnt-php/TryVars.php";
/*CALL CONECTIONS*/
$loudConns = new TryVars();
$loudConns->module = "loud";
$loudConns->folder = "jsons";
$loudConns->file = "loudConexoes";
$loudConns->loudConections();
/*CALL MODULES*/
$loudConns->file = "loudMods";
$loudConns->loudModules();
/*LOGIN DATA*/
$listar = new Relatorios_compound();
$listar->entry = $_POST["entry"];
$listar->swit = $_POST["swit"];
echo $listar->compound_relatorios();
