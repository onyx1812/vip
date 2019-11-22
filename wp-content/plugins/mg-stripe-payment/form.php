<?php require_once('./config.php'); ?>

		<form id="payment-form">
			<div class="form-row">
				<input type="text" name="first_name" class="form-control mb-3 StripeElement StripeElement--empty" placeholder="First Name">
				<input type="text" name="last_name" class="form-control mb-3 StripeElement StripeElement--empty" placeholder="Last Name">
				<input type="email" name="email" class="form-control mb-3 StripeElement StripeElement--empty" placeholder="Email Address">
				<div id="card-element" class="form-control">
					<!-- a Stripe Element will be inserted here. -->
				</div>

				<!-- Used to display form errors -->
				<div id="card-errors" role="alert"></div>
			</div>

			<button>Submit Payment</button>
		</form>

		<script src="./stripe/js/charge.js"></script>

<!-- <form action="charge.php" method="post">
  <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
          data-key="<?php echo $stripe['publishable_key']; ?>"
          data-description="Access for a year"
          data-amount="5000"
          data-locale="auto"></script>
</form> -->