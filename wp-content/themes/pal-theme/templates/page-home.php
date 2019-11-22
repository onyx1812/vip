<?php
/*
 * Template Name: Home
 */
get_header();


get_template_part( 'partials/block', 'selling' );
// get_template_part( 'partials/cpt', 'reviews' );

get_template_part( 'partials/cpt', 'products' );
get_template_part( 'partials/cpt', 'products_popular' );
get_template_part( 'partials/cpt', 'products_selling' );

get_template_part( 'partials/block', 'checkout' );
get_template_part( 'partials/block', 'thankyou' );

get_footer();