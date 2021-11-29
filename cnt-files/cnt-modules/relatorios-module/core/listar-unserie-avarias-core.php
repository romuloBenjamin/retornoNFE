<?php
$avarias = $_POST["entry"];
if ($avarias == "undefined") echo json_encode(array("avarias" => "-"));
if ($avarias != "undefined") {
    if ($avarias == "") echo json_encode(array("avarias" => "-"));
    echo json_encode(unserialize($avarias));
}
