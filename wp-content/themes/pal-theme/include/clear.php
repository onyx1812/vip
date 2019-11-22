<?php

add_action( 'wp_print_styles', 'deregister_styles', 100 );
function deregister_styles() {
	wp_dequeue_style( 'wp-embed' );
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'bodhi-svgs-attachment' );
}

add_action( 'wp_footer', 'deregister_scripts' );
function deregister_scripts(){
	wp_deregister_script( 'wp-embed' );
	wp_deregister_style( 'wp-block-library' );
	wp_deregister_style( 'bodhi-svgs-attachment' );
}

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

add_filter( 'the_content', 'wpse_82860_remove_autop_for_posttype', 0 );

function wpse_82860_remove_autop_for_posttype( $content )
{
    # edit the post type here
    'post' === get_post_type() && remove_filter( 'the_content', 'wpautop' );
    return $content;
}