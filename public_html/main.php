<?php

$X_value = $_GET['x'];
$Y_value = $_GET['y'];
$R_value = $_GET['r'];
$time = $_GET['timezone'];

function checkX($X_value)
{
    return isset($X_value);
}

function checkY($Y_value)
{
    $Y_min = -5;
    $Y_max = 5;
    if (!isset($Y_value)) {
        return false;
    }
    return is_numeric($Y_value) && $Y_value > $Y_min && $Y_value < $Y_max;
}

function checkR($R_value)
{
    return isset($R_value);
}

function checkArguments($X_value, $Y_value, $R_value)
{
    return checkX($X_value) && checkY($Y_value) && checkR($R_value);
}

function checkSecondQuarter($X_value, $Y_value, $R_value)
{
    return $X_value <= 0 && $Y_value >= 0 && sqrt($X_value * $X_value + $Y_value * $Y_value) <= $R_value;
}

function checkThirdQuarter($X_value, $Y_value, $R_value)
{
    return $X_value <= 0 && $Y_value <= 0 && abs($X_value) <= $R_value && abs($Y_value) <= $R_value;
}

function checkFourthQuarter($X_value, $Y_value, $R_value)
{
    return $X_value >= 0 && $Y_value <= 0 && $Y_value >= 2 * $X_value - $R_value;
}

function checkYourChoice($X_value, $Y_value, $R_value)
{
    return checkSecondQuarter($X_value, $Y_value, $R_value) || checkThirdQuarter($X_value, $Y_value, $R_value) || checkFourthQuarter($X_value, $Y_value, $R_value);
}


$is_valid = checkArguments($X_value, $Y_value, $R_value);
$valid_for_send = $is_valid ? 'true' : 'false';
$is_success = $is_valid ? checkYourChoice($X_value, $Y_value, $R_value) : 'Not valid arguments';
$success_for_send = $is_success ? 'success' : 'fault';
$current_time = date('H:i:s', time() - $time * 60);
$execution_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
$output = '{' .
    "\"isValid\":\"$valid_for_send\"," .
    "\"x\":\"$X_value\"," .
    "\"y\":\"$Y_value\"," .
    "\"r\":\"$R_value\"," .
    "\"currtime\":\"$current_time\"," .
    "\"exectime\":\"$execution_time\"," .
    "\"success\":\"$success_for_send\"" .
    "}";


echo $output;