<?php
/*
 * The template for displaying 404 pages (not found)
 */
get_header(); ?>

<section class="content content__404">
	<div class="container">
		<h1>Error <span>404</span></h1>
		<h2>Page not found!!!</h2>
		<a href="<?php echo home_url(); ?>/v5" class="btn">Visit our product</a>
	</div>
</section>

<?php get_footer(); ?>