<?php

define('ROOT', get_template_directory_uri());
define('IMG', ROOT . '/img');
define('VIDEO', ROOT . '/video');


add_action( 'admin_enqueue_scripts', 'styles_admin' );
function styles_admin() {
	wp_enqueue_style( 'styles-admin', ROOT . '/css/styles-admin.css', false, '1.0.0' );
	wp_enqueue_script( 'scripts', ROOT . '/js/scripts-admin.js', array('jquery'));
}

function replace_core_jquery_version() {
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', "https://code.jquery.com/jquery-3.1.1.min.js", array(), '3.1.1' );
}
add_action( 'wp_enqueue_scripts', 'replace_core_jquery_version' );

include('include/clear.php');
include('include/analytics.php');

include('include/cpt_reviews.php');
include('include/cpt_footer_pages.php');
include('include/cpt_products.php');
include('include/cpt_orders.php');

add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

function front_scripts() {

	if( is_404() ){
		wp_enqueue_style( 'styles', ROOT.'/css/styles-404.css');
	} else {
		wp_enqueue_style( 'styles', ROOT.'/css/styles-home.css');
		wp_enqueue_script( 'scripts', ROOT . '/js/scripts-home.js', false, false, 'in_footer');
	}

}
add_action( 'wp_enqueue_scripts', 'front_scripts' );

function front_variables(){
	wp_localize_script( 'scripts', 'data',
		array(
			'ajax' => admin_url('admin-ajax.php'),
			'theme' => ROOT,
		)
	);
}
add_action( 'wp_enqueue_scripts', 'front_variables' );