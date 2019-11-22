<?php

function loadCart(){
	global $woocommerce;

	echo '<div class="container">'. do_shortcode("[woocommerce_cart]") .'</div>';

	wp_die();
}
add_action('wp_ajax_loadCart', 'loadCart');
add_action('wp_ajax_nopriv_loadCart', 'loadCart');