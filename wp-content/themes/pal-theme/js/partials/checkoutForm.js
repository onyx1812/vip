let checkoutForm = document.getElementById('checkoutForm'), orderID;
checkoutForm.addEventListener('submit', function(e){
	e.preventDefault();

	let addressData = document.getElementById('line1').value+' '+document.getElementById('line2').value+', '+document.getElementById('city').value+', '+document.getElementById('country').value+', '+document.getElementById('state').value+', '+document.getElementById('zip').value,
		requestAddOrder = [],
		itemsArray = [],
		items = document.querySelectorAll('#eCart tbody tr .btn'),
		eDiscount = document.getElementById('eDiscount');

	for (var i = 0; i < items.length; i++) {
		itemsArray.push({
			id: items[i].dataset.id,
			quantity: items[i].dataset.quantity,
		});
	}

	requestAddOrder.push({
		action: 'addOrder',
		email: document.getElementById('email').value,
		first_name: document.getElementById('first_name').value,
		last_name: document.getElementById('last_name').value,
		phone: document.getElementById('phone').value,
		status: 'Pending Payment',
		address: addressData,
		total: document.getElementById('eTotal').innerHTML,
		items: JSON.stringify(itemsArray),
	});
	if( Number(eDiscount.innerHTML) > 0 ){
		requestAddOrder.push({
			discount: Number(eDiscount.innerHTML)
		});
	}

	requestAction(requestAddOrder, function(id){
		document.getElementById('order_id').value = id;
		console.log('Order ID: '+id);
		// setTimeout(function(){
		// 	updateStatus();
		// }, 5000);
	});

	// function updateStatus(){
	// 	let requestUpdatePaymentStatus = [];
	// 	requestUpdatePaymentStatus.push({
	// 		action: 'updatePaymentStatus',
	// 		order_id: document.getElementById('order_id').value,
	// 		status: 'Successful payment',
	// 	});
	// 	requestAction(requestUpdatePaymentStatus, function(result){
	// 		console.log(result);
	// 	});
	// }

	document.getElementById('card_name').value = document.getElementById('first_name').value +' '+ document.getElementById('last_name').value;
	document.getElementById('card_number').selectionStart;

	eCheckout.classList.remove('show');
	payment.classList.add('show');
	setTimeout(function(){
		payment.scrollIntoView({
			block: "start",
			behavior: "smooth"
		});
	}, 500);

});