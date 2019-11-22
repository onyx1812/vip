<?php
require_once('./stripe/init.php');

$stripe = [
  "secret_key"      => "sk_test_Tdn64ZHF8E2SG6RF1nONNQUh",
  "publishable_key" => "pk_test_9XHVSLa2aOM5BvgJ6ciuY23f",
];

\Stripe\Stripe::setApiKey($stripe['secret_key']);