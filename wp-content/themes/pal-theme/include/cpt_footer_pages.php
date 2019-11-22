<?php
function cpt_footer_pages_fun() {
	register_post_type( 'cpt_footer_pages',
		array(
			'labels' => array(
				'name' => __( 'Footer pages' ),
				'singular_name' => __( 'Footer page' )
			),
			'public' => true,
			'rewrite' => array('slug' => 'footer_pages'),
			'menu_position' => 5,
			'supports' => array( 'title', 'editor' )
		)
	);
}
add_action( 'init', 'cpt_footer_pages_fun' );