<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$user = [
    'id' => '1',
    'name' => 'ramazan',
    'token' => "5sd5d5s5344s5s6sd2dsdssdsddssd",
    'username' => 'designerrami'
];

$error = [
    "data" => [],
    "message" => "error"
];

$success = [
    "data" => $user,
    "message" => "success"
];


if (@$_GET['token'] == "") {
    if (@$_GET['username'] == "user" && @$_GET['password'] == "123456") {
        echo json_encode($success);
    } else {
        echo json_encode($error);
    }
} else if ($_GET["browser"] = "Chrome Mobile 103.0.0.0 on Google Nexus 5 (Android 6.0)" && @$_GET["token"] == "5sd5d5s5344s5s6sd2dsdssdsddssd") {
    echo json_encode($success);
    // if here is reading then create a new token and take from app
}
