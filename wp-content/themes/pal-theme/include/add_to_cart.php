<?php

function addToCart(){
	global $woocommerce;

	$p_id = $_POST['p_id'];
	$p_q = $_POST['p_q'];

	if( $woocommerce->cart->add_to_cart( $product_id = $p_id, $quantity = $p_q ) ){
		echo 'Added - product_id: '.$p_id.' quantity: '.$p_q;
	}

	wp_die();
}
add_action('wp_ajax_addToCart', 'addToCart');
add_action('wp_ajax_nopriv_addToCart', 'addToCart');

function removeFromCart(){
	global $woocommerce;
	$p_id = $_POST['p_id'];

	foreach ( $woocommerce->cart->get_cart() as $cart_item_key => $cart_item ) {
		if($cart_item['product_id'] == $p_id ){
			if( $woocommerce->cart->remove_cart_item( $cart_item_key ) ){
				echo 'Removed - product_id: '.$p_id;
			}
		}
	}

	wp_die();
}
add_action('wp_ajax_removeFromCart', 'removeFromCart');
add_action('wp_ajax_nopriv_removeFromCart', 'removeFromCart');