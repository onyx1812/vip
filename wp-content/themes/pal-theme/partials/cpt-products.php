<section class="products" id="products">
	<div class="container">
		<h2 class="section-title">Our products</h2>
		<div class="row">
			<?php
				$args = array(
					'post_type' => 'cpt_products',
					'posts_per_page' => -1
				);
				$the_query = new WP_Query( $args );
				if ( $the_query->have_posts() ): while ( $the_query->have_posts() ): $the_query->the_post();
			?>
				<div class="col-sm-3 products-item">
					<div class="products-item--inner">
						<img src="<?php the_post_thumbnail_url('thumbnail'); ?>" alt="<?php the_title(); ?>">
						<h3><?php the_title(); ?></h3>
						<div class="desc"><?php the_content(); ?></div>
						<div class="price">
							<span class="old">300</span>
							<span class="new"><?php echo $post->price; ?></span>
						</div>
						<button class="btn btn--add addProduct" data-id="<?php the_ID(); ?>" data-image="<?php the_post_thumbnail_url('thumbnail'); ?>" data-name="<?php the_title(); ?>" data-quantity="1" data-price="<?php echo $post->price; ?>"><span>add to cart</span></button>
					</div>
				</div>
			<?php endwhile; wp_reset_postdata(); endif; ?>
		</div>
	</div>
</section>