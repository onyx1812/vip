<section class="payment" id="payment">
	<div class="container">
		<h2 class="section-title">Payment process</h2>
		<div class="row">
			<div class="offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-12">
				<ul class="payment-method--nav">
					<li data-type="stripe" class="active">
						<span>Credit Card</span>
						<form id="stripeForm" class="payment-form">
							<input type="hidden" value="" name="order_id" id="order_id">
							<ul class="row">
								<li class="col-12">
									<input type="text" name="card_name" id="card_name" placeholder="Card name" required>
								</li>
								<li class="col-12">
									<input type="text" name="card_number" id="card_number" placeholder="Card number" minlength="16" maxlength="16" required>
								</li>
								<li class="col-12 col-sm-6">
									<select name="expiry_year" id="expiry_year"></select>
								</li>
								<li class="col-12 col-sm-6">
									<select name="expiry_month" id="expiry_month">
										<option value="0">January</option>
										<option value="1">February</option>
										<option value="2">March</option>
										<option value="3">April</option>
										<option value="4">May</option>
										<option value="5">June</option>
										<option value="6">July</option>
										<option value="7">August</option>
										<option value="8">September</option>
										<option value="9">October</option>
										<option value="10">November</option>
										<option value="11">December</option>
									</select>
								</li>
								<li class="col-12">
									<input type="text" name="card_code" id="card_code" placeholder="Card code(cvc)" placeholder="XXXX" minlength="3" maxlength="4" required>
								</li>
								<li class="col-12">
									<button class="btn btn--submit" type="submit"><span>Place Order</span></button>
								</li>
							</ul>
						</form>
						<div id="stripeResult"></div>
					</li>
					<li data-type="paypal">
						<span>PayPal</span>
						<form id="payment_paypal" data-type="paypal" class="payment-form">
							<ul class="row">
								<li class="col-12"><button class="btn btn--submit" type="submit"><span>Pay with PayPal</span></button></li>
							</ul>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>