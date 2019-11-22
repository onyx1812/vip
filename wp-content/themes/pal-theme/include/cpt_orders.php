<?php

//Create DB
global $wpdb;
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
$table_name = $wpdb->prefix . "orders";
$sql = "CREATE TABLE {$table_name} (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	date DATETIME NOT NULL,
	status text NOT NULL,
	last_name text NOT NULL,
	first_name text NOT NULL,
	email text NOT NULL,
	phone text NOT NULL,
	address text NOT NULL,
	discount text NOT NULL,
	total text NOT NULL,
	items mediumtext NOT NULL,
	UNIQUE KEY id (id)
) {$charset_collate};";
// Создать таблицу.
dbDelta( $sql );


function add_orders() {
	add_menu_page('Orders', 'Orders', 0, 'cpt_orders', 'render_orders_page', 'dashicons-list-view', 5);
}
add_action('admin_menu', 'add_orders');

function render_orders_page(){
	global $wpdb;

	$table_name = $wpdb->prefix . "orders";
	$orders_datas = $wpdb->get_results("SELECT * FROM $table_name ORDER BY date DESC");

	if($orders_datas){
		echo '<div id="orders">';
		foreach( $orders_datas as $data ){
			$items = json_decode( $data->items );

			$items_table = '
				<table width="100%">
					<thead>
						<tr>
							<th class="order-image">image</th>
							<th class="order-name">name</th>
							<th class="order-quantity">quantity</th>
							<th class="order-price">price</th>
						</tr>
					</thead>
					<tbody>
			';

			foreach( $items as $item ){
				$post_id = get_post($item->id);
				$items_table .= '<tr>';
					$items_table .= '<td><img src="'.get_the_post_thumbnail_url( $post_id, 'thumbnail' ).'"></td>';
					$items_table .= '<td>'.get_the_title($post_id).'</td>';
					$items_table .= '<td>'.$item->quantity.'</td>';
					$items_table .= '<td>'.$post_id->price.'</td>';
				$items_table .= '</tr>';
			}
			$items_table .= '
					</tbody>
					<tfoot>
						<tr>
							<td colspan="3">Total:</td>
							<td>'.$data->total.'</td>
						</tr>
					</tfoot>
				</table>
			';
			$i++;
			echo '
					<div id="order_'.$data->id.'" class="order-item">
						<div class="order-title">
							Order #'.$data->id.'
							<span>'.$data->status.'</span>
						</div>
						<div class="order-dashboard">
							<div class="row">
								<div class="col-sm-6">
									<div class="info info-order">
										<h2>Order info:</h2>
										<p><b>ID:</b> <span>'.$data->id.'</span></p>
										<p><b>Date:</b> <span>'.$data->date.'</span></p>
										<p><b>Status:</b> <span>'.$data->status.'</span></p>
									</div>
									<div class="info info-user">
										<h2>User info:</h2>
										<p><b>Email:</b> <span>'.$data->email.'</span></p>
										<p><b>First name:</b> <span>'.$data->first_name.'</span></p>
										<p><b>Last name:</b> <span>'.$data->last_name.'</span></p>
										<p><b>Phone:</b> <span>'.$data->phone.'</span></p>
										<p><b>Address:</b> <span>'.$data->address.'</span></p>
									</div>
								</div>
								<div class="col-sm-6">'. $items_table .'</div>
							</div>
						</div>
					</div>';
		}
		echo '</div>';
	}

}

function addOrder(){
	global $wpdb;
	$table_name = $wpdb->prefix . "orders";
	$date = date('Y-m-d H:i:s');
	$discount = $_POST['discount'];
	if($discount){
		echo "discount set";
	}

	$items_json = str_replace("\\","", $_POST['items']);

	if( $wpdb->insert(
		$table_name,
		array(
			'date' => $date,
			'status' => $_POST['status'],
			'last_name' => $_POST['last_name'],
			'first_name' => $_POST['first_name'],
			'email' => $_POST['email'],
			'phone' => $_POST['phone'],
			'address' => $_POST['address'],
			'total' => $_POST['total'],
			'items' => $items_json,
		)
	) === false){
		echo "Error";
	} else{
		$lastid = $wpdb->insert_id;
		echo $lastid;
	}

	wp_die();
}
add_action('wp_ajax_addOrder', 'addOrder');
add_action('wp_ajax_nopriv_addOrder', 'addOrder');