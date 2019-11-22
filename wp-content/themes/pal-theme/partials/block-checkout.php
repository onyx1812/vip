<section id="eCheckout" class="checkout">
	<div class="container">
		<h2 class="section-title">Checkout process</h2>
		<!-- <?php get_template_part( 'partials/block', 'coupon' ); ?> -->
		<form class="row" id="checkoutForm" autocomplete="off">
			<div class="col-lg-6 order-lg-2">
				<h3>Your order</h3>
				<?php get_template_part( 'partials/block', 'cart' ); ?>
			</div>
			<div class="col-lg-6">
				<h3>Shipping info</h3>
				<?php get_template_part( 'partials/block', 'form' ); ?>
			</div>
		</form>
	</div>
</section>