<?php
/*
 * Template Name: Thank you
 */
get_header();
while ( have_posts() ) : the_post(); ?>

<section class="thankyou-content">
	<div class="container">
		<h1><?php the_title(); ?></h1>
		<?php the_content(); ?>
		<!-- <a href="<?php echo home_url(); ?>" class="btn">visit presentation page</a> -->
	</div>
</section>

<?php if( isset($_GET["style"]) && $_GET["style"] == 'white' ): ?>
	<!-- Offer Conversion: Massage Hero - Sales - White -->
	<iframe src="https://bcommerce.go2cloud.org/aff_l?offer_id=10&adv_sub=SUB_ID&amount=AMOUNT&transaction_id=TRANSACTION_ID" scrolling="no" frameborder="0" width="1" height="1"></iframe>
	<!-- // End Offer Conversion -->
<?php else: ?>
	<!-- Offer Conversion: Massage Hero - Sales - Black -->
	<iframe src="https://bcommerce.go2cloud.org/aff_l?offer_id=9&adv_sub=SUB_ID&amount=AMOUNT&transaction_id=TRANSACTION_ID" scrolling="no" frameborder="0" width="1" height="1"></iframe>
	<!-- // End Offer Conversion -->
<?php endif; ?>

<?php
endwhile;
get_footer(); ?>