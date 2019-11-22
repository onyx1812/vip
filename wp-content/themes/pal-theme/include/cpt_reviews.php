<?php
function cpt_reviews_fun() {
	register_post_type( 'cpt_reviews',
		array(
			'labels' => array(
				'name' => __( 'Reviews' ),
				'singular_name' => __( 'review' )
			),
			'public' => true,
			'rewrite' => array('slug' => 'reviews'),
			'menu_position' => 5,
			'supports' => array( 'title', 'editor', 'thumbnail' )
		)
	);
}
add_action( 'init', 'cpt_reviews_fun' );