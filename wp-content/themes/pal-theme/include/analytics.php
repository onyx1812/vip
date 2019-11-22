<?php

//Counter

global $wpdb;
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

$table_analytics = $wpdb->prefix . "analytics";
$sql = "CREATE TABLE {$table_analytics} (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	date DATETIME NOT NULL,
	ip text NOT NULL,
	last_activity text NOT NULL,
	count_activity INT DEFAULT 0,
	UNIQUE KEY id (id)
) {$charset_collate};";
dbDelta( $sql );

$table_affiliates = $wpdb->prefix . "affiliates";
$sql = "CREATE TABLE {$table_analytics} (
	id mediumint(9) NOT NULL AUTO_INCREMENT,
	affiliate_id text NOT NULL,
	affiliate_name text NOT NULL,
	UNIQUE KEY id (id)
) {$charset_collate};";
dbDelta( $sql );


function add_analytics() {
	add_menu_page('Analytics', 'Analytics', 0, 'cpt_analytics', 'render_analytics_page', 'dashicons-list-view', 5);
}
add_action('admin_menu', 'add_analytics');

function render_analytics_page(){
	global $wpdb;

	$table_analytics = $wpdb->prefix . "analytics";
	$datas = $wpdb->get_results("SELECT * FROM $table_analytics ORDER BY date DESC");
	$count_activity_all = 0;
	foreach( $datas as $data ){
		$count_activity_all = $count_activity_all + $data->count_activity;
	}

	$wrap_block_open = '<div class="wrap wrap--analytics">';
	$wrap_block_close = '</div>';

	$title_block = '<h1>Analytics</h1>';

/*--------------------
	counter
--------------------*/
	$counter = '
		<ul class="counter">
			<li><b>Unique users</b><span>'.count($datas).'</span></li>
			<li><b>Users activity</b><span>'.$count_activity_all.'</span></li>
		</ul>
	';

/*--------------------
	Users
--------------------*/
	$users .= '<h2>Users:</h2>';
	$users .= '
		<table class="table table--users">
			<thead>
				<tr>
					<th width="170px">DATE</th>
					<th>IP</th>
					<th>Last Activity</th>
					<th width="120px">Count Activity</th>
				</tr>
			</thead>
			<tbody>
	';
	foreach( $datas as $data ){
		$users .= '
			<tr id="user_'.$data->id.'">
				<td>'.$data->date.'</td>
				<td>'.$data->ip.'</td>
				<td>'.$data->last_activity.'</td>
				<td>'.$data->count_activity.'</td>
			</tr>
		';
	}
	$users .= '</tbody></table>	';

/*--------------------
	Affiliates
--------------------*/
	$affiliates .= '<h2>Affiliates:</h2>';
	$affiliates .= '
		<table class="table table--affiliates">
			<thead>
				<tr>
					<th width="25px">ID</th>
					<th>Name</th>
					<th>Orders</th>
					<th width="120px">Orders count</th>
				</tr>
			</thead>
			<tbody>
	';
		$table_affiliates = $wpdb->prefix . "affiliates";
		$data_affiliates = $wpdb->get_results("SELECT * FROM $table_affiliates");
		foreach ($data_affiliates as $data_aff) {
			$affiliates .= '
				<tr>
					<td>'.$data_aff->affiliate_id.'</td>
					<td>'.$data_aff->affiliate_name.'</td>
					<td>#123, #146</td>
					<td>2</td>
				</tr>
			';
		}
	$affiliates .= '</tbody></table>	';
	$affiliates .= '<a href="#" id="addAffiliates" class="btn">add new affiliate</a>';
	$affiliates .= '
		<form id="addAffiliatesForm" class="form form--affiliate">
			<ul class="row">
				<li class="col-12"><input type="text" name="affiliate_id" placeholder="ID"></li>
				<li class="col-12"><input type="text" name="affiliate_name" placeholder="Name"></li>
				<li class="offset-3 col-6"><input type="submit" value="ADD"></li>
			</ul>
		</form>
	';

/*--------------------
	Wrap displaying
--------------------*/
	echo
		$wrap_block_open.
			$title_block.
			$counter.
			$users.
			$affiliates.
		$wrap_block_close;
}

add_action( 'init', 'analytics' );
function analytics() {
	if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	$user_ip = apply_filters( 'wpb_get_ip', $ip );


	global $wpdb;
	$date = date('Y-m-d H:i:s');
	$table_analytics = $wpdb->prefix . "analytics";
	$insert_ip = true;
	$datas = $wpdb->get_results("SELECT * FROM $table_analytics");
	foreach( $datas as $data ){
		if( $data->ip == $user_ip ){
			$cur_date = date('Y-m-d H:i:s');
			$count_activity = $data->count_activity + 1;
			$wpdb->update(
				$table_analytics,
				array(
					'last_activity' => $cur_date,
					'count_activity' => $count_activity,
				),
				array( 'id' => $data->id )
			);
			$insert_ip = false;
		}
	}

	if($insert_ip){
		$wpdb->insert(
			$table_analytics,
			array(
				'date' => $date,
				'ip' => $user_ip,
			)
		);
	}

}

function addAffiliatesAction(){
	global $wpdb;
	$table_affiliates = $wpdb->prefix . "affiliates";
	if( $wpdb->insert(
			$table_affiliates,
			array(
				'affiliate_id' => $_POST['affiliate_id'],
				'affiliate_name' => $_POST['affiliate_name'],
			)
	) === false){
		echo "Error";
	} else{
		echo "Successed";
	}

	wp_die();
}
add_action('wp_ajax_addAffiliatesAction', 'addAffiliatesAction');
add_action('wp_ajax_nopriv_addAffiliatesAction', 'addAffiliatesAction');