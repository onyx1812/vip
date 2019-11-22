<?php
// echo ROOT.'/paytment/stripe/vendor/autoload.php';
require_once 'vendor/autoload.php';

function paymentStripe(){

	//START POST data
	$amount = $_POST['amount'];
	$currency = $_POST['currency'];
	$customer_email = $_POST['customer_email'];
	$customer_name = $_POST['customer_name'];
	$customer_number = $_POST['customer_number'];
	$order_id = $_POST['order_id'];
	$address = [
		"city" => $_POST['address_city'],
		"country" => $_POST['address_country'],
		"line1" => $_POST['address_line1'],
		"line2" => $_POST['address_line2'],
		"postal_code" => $_POST['address_postal_code'],
		"state" => $_POST['addres_states']
	];

	// $customer_card_exp_month = '10';
	$customer_card_number = $_POST['customer_card_number'];

	$month_from_arr = intval($_POST['customer_card_exp_month']);
	$cur_month = $month_from_arr + 1;
	if($cur_month >= 10){
		$customer_card_exp_month = $cur_month;
	} else {
		$customer_card_exp_month = '0'.$cur_month;
	}

	$customer_card_exp_year = $_POST['customer_card_exp_year'];
	$customer_card_cvc = $_POST['customer_card_cvc'];
	//END POST data


	\Stripe\Stripe::setApiKey('sk_test_Tdn64ZHF8E2SG6RF1nONNQUh');

	try{
		$stripeToken = \Stripe\Token::create([
			'card' => [
				'number' => $customer_card_number,
				'exp_month' => $customer_card_exp_month,
				'exp_year' => $customer_card_exp_year,
				'cvc' => $customer_card_cvc,
			]
		]);


		if( $stripeToken )
			$stripeNewUser = true;
			$stripeCustomersAll = \Stripe\Customer::all();
			$users = $stripeCustomersAll;
			foreach ($users as $user) {
				if($customer_email == $user->email){
					$stripeNewUser = false;
					$stripe_customer_id = $user->id;
					break;
				}
			}

		if( $stripeNewUser ):
			$stripeCustomer = \Stripe\Customer::create([
				"source" => $stripeToken->id,
				"email" => $customer_email,
				"name" => $customer_name,
				"phone" => $customer_number,
				"address" => $address,
				"shipping" => [
					'address' => $address,
					"name" => $customer_name,
					"phone" => $customer_number,
				]
			]);
		else:
			$stripeCustomer = \Stripe\Customer::update($stripe_customer_id, [
				"source" => $stripeToken->id,
				"name" => $customer_name,
				"phone" => $customer_number,
				"address" => $address,
				"shipping" => [
					'address' => $address,
					"name" => $customer_name,
					"phone" => $customer_number,
				]
			]);
		endif;

			if( $stripeNewUser ):
				$customer = $stripeCustomer->id;
			else:
				$customer = $stripe_customer_id;
			endif;

			$stripeCharge = \Stripe\Charge::create([
				"amount" => $amount,
				"currency" => $currency,
				"description" => 'Order #'.$order_id,
				"customer" => $customer,
				"receipt_email" => $customer_email,
				"shipping" => [
					'address' => $address,
					"name" => $customer_name,
					"phone" => $customer_number,
				],
				'metadata' => [
					'order_id' => $order_id
				]
			]);

		if($stripeCharge)
			print_r($stripeCharge->status);
			if( $stripeCharge->status == 'succeeded' )
				$stripePaymentMethod = \Stripe\PaymentMethod::update($stripeCharge->payment_method, [
					"billing_details" => [
						'address' => $address
					]
				]);

	} catch (Exception $e) {
		print_r( $e->getMessage() );
	}

	wp_die();
}
add_action('wp_ajax_paymentStripe', 'paymentStripe');
add_action('wp_ajax_nopriv_paymentStripe', 'paymentStripe');