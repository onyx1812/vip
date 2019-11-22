<?php
require_once('vendor/autoload.php');

//START POST data
$customer_email = 'maxgloba123@mail.ru';
$customer_name = 'Max Globa';
$customer_number = '380731817768';
$order_id = '999';
$address = [
	"city" => 'Mykolaiv',
	"country" => 'UA',
	"line1" => 'Lazurna 38-A',
	"line2" => 'Apt. 64',
	"postal_code" => '54058',
	"state" => 'Mykolaivska'
];
$customer_card_number = '4242424242424242';
$customer_card_exp_month = '10';
$customer_card_exp_year = '2020';
$customer_card_cvc = '314';
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

	if( $stripeNewUser )
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

		if( $stripeNewUser ):
			$customer = $stripeCustomer->id;
		else:
			$customer = $stripe_customer_id;
		endif;

		$stripeCharge = \Stripe\Charge::create([
			"amount" => 2000,
			"currency" => 'usd',
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