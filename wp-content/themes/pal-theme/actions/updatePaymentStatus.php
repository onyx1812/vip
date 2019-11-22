<?php

function updatePaymentStatus(){
	global $wpdb;
	$table_name = $wpdb->prefix . "orders";
	$order_id = (int)$_POST['order_id'];

	if( $wpdb->update(
		$table_name,
		array( 'status' => $_POST['status'] ),
		array( 'id' => $order_id )
	) === false){
		echo "Error";
	} else{
		echo 'Order status updated';
	}

	wp_die();
}
add_action('wp_ajax_updatePaymentStatus', 'updatePaymentStatus');
add_action('wp_ajax_nopriv_updatePaymentStatus', 'updatePaymentStatus');