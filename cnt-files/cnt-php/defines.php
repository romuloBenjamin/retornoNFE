<?php
if (!isset($perfil1)) define("PERFIL_BD_ANTIGO", false);
if (isset($perfil1)) define("PERFIL_BD_ANTIGO", true);
if (!isset($core)) define("DIR_PATH", "cnt-files/");
if (isset($core)) define("DIR_PATH", "../../../");
define("LOCAL", "local");
//define("LOCAL", "web");
