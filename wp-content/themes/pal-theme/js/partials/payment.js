let payment = document.getElementById('payment');
let paymentNav = document.querySelectorAll('.payment-method--nav li > span');
for (var i = 0; i < paymentNav.length; i++) {
	paymentNav[i].addEventListener('click', function(e){
		e.preventDefault();
		for (var a = 0; a < paymentNav.length; a++) {
			paymentNav[a].parentElement.classList.remove('active');
		}
		this.parentElement.classList.add('active');
	});
}

function creditCardType(number){
	let type = [
		{
			name: 'American Express',
			id: 'amex',
			digits: 15,
			pattern: /^3[47]\d{13}$/,
			eagerPattern: /^3[47]/,
			groupPattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
			cvcLength: 4
		},
		{
			name: 'Diners Club',
			id: 'diners',
			pattern: /^3(0[0-5]|[68]\d)\d{11}$/,
			eagerPattern: /^3(0|[68])/,
			groupPattern: /(\d{1,4})?(\d{1,6})?(\d{1,4})?/
		},
		{
			name: 'Discover',
			id: 'discover',
			pattern: /^6(011(0[0-9]|[2-4]\d|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]\d{3}|5\d{4})\d{10}$/,
			eagerPattern: /^6(011(0[0-9]|[2-4]|74|7[7-9]|8[6-9]|9[0-9])|4[4-9]|5)/
		},
		{
			name: 'JCB',
			id: 'jcb',
			pattern: /^35\d{14}$/,
			eagerPattern: /^35/
		},
		{
			name: 'Maestro',
			id: 'maestro',
			digits: [12, 19],
			pattern: /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/,
			eagerPattern: /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/,
			groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
		},
		{
			name: 'Mastercard',
			id: 'mastercard',
			pattern: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)\d{12}$/,
			eagerPattern: /^(2[3-7]|22[2-9]|5[1-5])/
		},
		{
			name: 'Mir',
			id: 'mir',
			pattern: /^220[0-4]\d{12}$/,
			eagerPattern: /^220[0-4]/,
			groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
		},
		{
			name: 'Visa',
			id: 'visa',
			digits: [13, 19],
			pattern: /^4\d{12}(\d{3}|\d{6})?$/,
			eagerPattern: /^4/,
			groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
		}
	];
	for (let i in type) {
		if( type[i].eagerPattern.test(number) ){
			return type[i].id;
			break;
		}
	}
}

document.getElementById('card_number').addEventListener('keyup', function(e) {
	let type = creditCardType(this.value);
	card_number.classList = '';
	card_number.classList.add(type);
	this.value = this.value.replace(/[^\dA-Z]/g, '').replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, '$1 $2 $3 $4').trim();
});

//Date
let date = new Date(),
	dateYear = Number(date.getFullYear()),
	dateYearLast = dateYear+10,
	dateMonth = Number(date.getMonth());

let expiry_year = document.getElementById('expiry_year');
for (let i=dateYear; i < dateYearLast; i++){
	var opt = document.createElement('option');
	opt.value = i;
	opt.innerHTML = i;
	expiry_year.appendChild(opt);
}

let expiry_month = document.getElementById('expiry_month');
function disablePastMonth(){
	for (var i = 0; i < expiry_month.options.length; i++) {
		if( expiry_month.options[i].value == dateMonth ){
			expiry_month.options[i].selected = true;
			break;
		} else {
			expiry_month.options[i].disabled = true;
		}
	}
}
disablePastMonth();

function enableAllMonth(){
	for (var i = 0; i < expiry_month.options.length; i++) {
		if( expiry_month.options[i].value == 0 ){
			expiry_month.options[i].selected = true;
		}
		expiry_month.options[i].disabled = false;
	}
}

expiry_year.addEventListener('change', function(e){
	e.preventDefault();
	if( dateYear == this.value ){
		disablePastMonth();
	} else {
		enableAllMonth();
	}
});

let stripeForm = document.getElementById('stripeForm');
stripeForm.addEventListener('submit', function(e){
	e.preventDefault();
	requestPaymentStripe = [{
		action: 'paymentStripe',
		amount: document.getElementById('eTotal').innerHTML,
		currency: 'usd',
		customer_email: document.getElementById('email').value,
		customer_name: document.getElementById('first_name').value+' '+document.getElementById('first_name').value,
		customer_number: document.getElementById('phone').value,
		order_id: document.getElementById('order_id').value,
		address_city: document.getElementById('city').value,
		address_country: document.getElementById('country').value,
		address_line1: document.getElementById('line1').value,
		address_line2: document.getElementById('line2').value,
		address_postal_code: document.getElementById('zip').value,
		address_state: document.getElementById('state').value,
		customer_card_number: document.getElementById('card_number').value,
		customer_card_exp_month: document.getElementById('expiry_month').value,
		customer_card_exp_year: document.getElementById('expiry_year').value,
		customer_card_cvc: document.getElementById('card_code').value
	}];
	stripeForm.classList.add('loading');
	requestAction(requestPaymentStripe, function(result){
		stripeForm.classList.remove('loading');
		let stripeResult = document.getElementById('stripeResult');
		stripeResult.innerHTML = result;
		if(result == 'succeeded'){
			payment.classList.remove('show');
			let thankyou = document.getElementById('thankyou');
			thankyou.classList.add('show');
			setTimeout(function(){
				localStorage.clear();
				thankyou.classList.remove('show');
				document.body.scrollIntoView({
					block: "start",
					behavior: "smooth"
				});
			}, 5000);
		}
	});
});