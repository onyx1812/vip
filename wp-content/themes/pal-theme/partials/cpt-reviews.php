<?php
	$args = array(
		'post_type' => 'cpt_reviews',
		'posts_per_page' => -1
	);
	$the_query = new WP_Query( $args );
?>
<?php if ( $the_query->have_posts() ) : ?>
	<section class="reviews" id="reviews">
		<div class="container">
			<h2 class="section-title">But Don’t Take Our Word For It! <br> Here’s What Our Customers Say:</h2>
			<div class="row">
				<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
					<div class="col-md-4">
						<div class="box-wrap">
							<img src="data:image/jpeg;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="<?php the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" class="review-img">
							<h3><?php the_title(); ?></h3>
							<?php the_content(); ?>
						</div>
					</div>
				<?php endwhile; wp_reset_postdata(); ?>
			</div>
		</div>
	</section>
<?php endif; ?>