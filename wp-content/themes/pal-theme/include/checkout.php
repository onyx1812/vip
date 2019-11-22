<?php

function loadCheckout(){
	global $woocommerce;

	echo '<div class="container">'. do_shortcode("[woocommerce_checkout]") .'</div>';

	wp_die();
}
add_action('wp_ajax_loadCheckout', 'loadCheckout');
add_action('wp_ajax_nopriv_loadCheckout', 'loadCheckout');