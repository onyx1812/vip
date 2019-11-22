<?php
	$args = array(
		'post_type' => 'cpt_footer_pages',
		'posts_per_page' => -1
	);
	$the_query = new WP_Query( $args );
?>
<?php if ( $the_query->have_posts() ) : ?>
	<nav class="footer_pages">
		<ul>
			<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
				<li>
					<a data-popup="popup_<?php the_ID(); ?>"><?php the_title(); ?></a>
					<template id="popup_<?php the_ID(); ?>"><?php the_content(); ?></template>
				</li>
			<?php endwhile; wp_reset_postdata(); ?>
		</ul>
	</nav>
<?php endif; ?>