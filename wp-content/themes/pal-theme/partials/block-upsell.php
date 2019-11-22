<section class="upsell" id="upsell">
	<div class="container">
		<h2 class="section-title">5 Year Elite Unlimited Warranty Protection Plan</h2>
		<div class="row">
			<div class="col-md-6">
				<img src="<?php echo IMG; ?>/warranty.jpg" alt="">
			</div>
			<div class="col-md-6">
				<h4>What's covered?</h4>
				<ul>
					<li>Loss (this is 85% of claims and the biggest reason why you should invest in the elite unlimited warranty protection plan today).</li>
					<li>Damage (this is 12% of claims)</li>
					<li>Manufacturer defects (this is under 1% of claims).</li>
					<li>Theft (this is under 1% of claims)</li>
					<li>All other reasons (under 1% of claims) -- this includes no B.S. coverage. If you got a unique problem, we'll fix it and get you a new pair of hearing aids right away.</li>
				</ul>
				<h3>Total price: $49 USD</h3>
				<div class="product-btns">
					<?php
						$args = array(
							'post_type' => 'cpt_products',
							'posts_per_page' => -1
						);
						$the_query = new WP_Query( $args );
						if ( $the_query->have_posts() ): while ( $the_query->have_posts() ): $the_query->the_post();
					?>
						<?php if(get_the_ID() === 14): ?>
							<button class="btn btn--yes addProduct" data-id="<?php the_ID(); ?>" data-image="<?php the_post_thumbnail_url('thumbnail'); ?>" data-name="<?php the_title(); ?>" data-quantity="1" data-price="<?php echo $post->price; ?>">YES, PROTECT ME</button>
						<?php elseif(get_the_ID() === 12): ?>
							<button class="btn btn--no addProduct" data-id="<?php the_ID(); ?>" data-image="<?php the_post_thumbnail_url('thumbnail'); ?>" data-name="<?php the_title(); ?>" data-quantity="1" data-price="<?php echo $post->price; ?>">NO, THANKS</button>
						<?php endif; ?>
					<?php endwhile; wp_reset_postdata(); endif; ?>
				</div>
			</div>
		</div>
	</div>
</section>