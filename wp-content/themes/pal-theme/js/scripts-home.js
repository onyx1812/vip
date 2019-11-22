function requestAction(values, callback){
	let formData = new FormData();

	for (let i = 0, l = values.length; i < l; i++) {
		var keys = Object.keys(values[i]);
		for (var j = 0, k = keys.length; j < k; j++) {
			let key = keys[j],
				value = values[i][keys[j]];
			formData.append(key, value);
		}
	}

	let request = new XMLHttpRequest();
	request.open('POST', data.ajax, true);
	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			let result = this.response;
			if(callback) callback(result);
		} else {
			alert('Request status: '+this.status);
		}
	}

	request.onerror = function() {
		alert('Request error!');
	};

	request.send(formData);
}
// =====HEADER Scripts=====
(function(){

	// let header = document.getElementById('mainHeader');
	// document.body.style.paddingTop = header.offsetHeight+'px';


	// let mobMenu = document.getElementById('mobMenu'),
	// 	mobileMenu = document.getElementById('mobileMenu');

	// mobMenu.addEventListener('click', function(e){
	// 	e.preventDefault();
	// 	mobMenu.classList.toggle('active');
	// 	mobileMenu.classList.toggle('active');
	// });

})();
//END =====HEADER Scripts=====
//=====scrollToProducts=====
(function(){
	let scrollToProducts = document.querySelectorAll('.scrollToProducts'),
		products = document.getElementById('products');
	for(i=0; i < scrollToProducts.length; i++){
		scrollToProducts[i].addEventListener('click', function(e){
			e.preventDefault();
			products.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});
		});
	}
})();
//END=====scrollToProducts=====
let products = [], subtotal = 0;

let shipping = {
	status: false,
	price: 9
};

let eCheckout = document.getElementById('eCheckout');

//-----Cookies-----
function checkCookies(){
	let productsStorage = localStorage.getItem('products'),
		shippingStorage = localStorage.getItem('shipping');

	if( productsStorage && JSON.parse(productsStorage).length > 0 ){
		products = JSON.parse(productsStorage);
		shipping = JSON.parse(shippingStorage);

		products.forEach(function(item, index, object){
			if(item.quantity === 0){
				object.splice(index, 1);
				console.log(object);
				products = object;
				updateCart(products, shipping);
			}
		});

		eCheckout.classList.add('show');
		updateCart(products, shipping);
	} else {
		eCheckout.classList.remove('show');
	}

	if( shipping.status === true ){
		let express_shipping = document.getElementById('express_shipping'),
			eShipping = document.getElementById('eShipping');
		express_shipping.checked = 'checked';
		eShipping.innerHTML = shipping.price;
	} else {
		eShipping.innerHTML = 0;
	}

	let eTotalPrice = Number(document.getElementById('eTotal').innerHTML),
		eCheckoutSection = document.getElementById('eCheckout');
	if(eTotalPrice === 0){
		eCheckoutSection.classList.remove('show');
	}
}checkCookies();

function updateCookies(products, shipping){
	localStorage.setItem('products', JSON.stringify(products) );
	localStorage.setItem('shipping', JSON.stringify(shipping) );
	checkCookies();
}

//-----Product1-----
function addProduct(e){
	e.preventDefault();
	let item = {
			id: this.dataset.id,
			image: this.dataset.image,
			name: this.dataset.name,
			quantity: this.dataset.quantity,
			price: this.dataset.price
		};
	if(products.length > 0){
		let addNewProduct = true;
		for (let i in products) {
			if ( parseInt(products[i].id) === parseInt(item.id) ) {
				products[i].quantity = parseInt(products[i].quantity) + 1;
				addNewProduct = false;
				break;
			}
		}
		if(addNewProduct){
			products.push(item);
		}
	} else {
		products.push(item);
	}
	setTimeout(function(){
		eCheckout.scrollIntoView({
			block: "start",
			behavior: "smooth"
		});
	}, 500);
	updateCookies(products, shipping);
}
function removeProduct(e){
	e.preventDefault();
	for (let i in products) {
		if ( parseInt(products[i].id) === parseInt(e.target.dataset.id) ) {
			products.splice(i, 1);
			subtotal -= parseInt( e.target.dataset.quantity ) * parseInt( e.target.dataset.price );
			break;
		}
	}
	updateCookies(products, shipping);
}

// Totals
function updateTotals(){
	let eSubtotal = document.getElementById('eSubtotal'),
		eShipping = document.getElementById('eShipping'),
		eTotal = document.getElementById('eTotal');

	eSubtotal.innerHTML = parseInt(subtotal);
	if(shipping.status === true){
		eTotal.innerHTML =  parseInt(subtotal) + parseInt(shipping.price);
	} else {
		eTotal.innerHTML =  parseInt(subtotal);
	}
}

//-----Cart-----
function updateCart(products, shipping) {
	if(products){
		let cartBody = document.querySelector('#eCart tbody');
		subtotal = 0;

		cartBody.innerHTML = '';
		products.forEach(function(e) {
			cartBody.innerHTML += `<tr id="eItem_${e.id}">
				<td><a class="eRemove btn btn--retention" data-id="${e.id}" data-price="${e.price}" data-quantity="${e.quantity}">+</a></td>
				<td><img class="eImage" src="${e.image}" alt=""></td>
				<td><span class="ePrice">${e.name}</span></td>
				<td><input class="eQuantity" type="number" value="${e.quantity}" data-id="${e.id}" data-price="${e.price}" ></td>
				<td><span class="ePrice">${e.price}</span></td>
			</tr>`;
			subtotal += parseInt(e.quantity) * parseInt(e.price);
		});
	}

	if(shipping.status === true){
		let eShipping = document.getElementById('eShipping');
		eShipping.innerHTML = shipping.price;
	}

	updateTotals(subtotal);

	removeProductItem();

	updateCartButton();
}
// Update cart table
function updateCartQuantity(){
	let eQuantity = document.querySelectorAll('.eQuantity');
	for (let j = 0; j < eQuantity.length; j++) {
		for (let i in products) {
			if ( parseInt(products[i].id) === parseInt(eQuantity[j].dataset.id) ) {
				products[i].quantity = parseInt(eQuantity[j].value);
				break;
			}
		}
	}
	updateCookies(products, shipping);
}


//-----ACTIONS-----
let addProductBTN = document.querySelectorAll('.addProduct');
for (let i = 0; i < addProductBTN.length; i++){
	addProductBTN[i].addEventListener('click', addProduct);
}

function removeProductItem(){
	let eRemove = document.querySelectorAll('.eRemove');
	for(let i = 0; i < eRemove.length; i++){
		eRemove[i].addEventListener('click', removeProduct);
	}
}

function updateCartButton(){
	let eUpdate = document.getElementById('eUpdate');
	eUpdate.addEventListener('click', updateCartQuantity);
}

let express_shipping = document.getElementById('express_shipping');
express_shipping.addEventListener('change', function(e){
	let eShipping = document.getElementById('eShipping');
	if( express_shipping.checked ){
		shipping.status = true;
		eShipping.innerHTML = shipping.price;
	} else {
		shipping.status = false;
		eShipping.innerHTML = 0;
	}
	updateCookies(products, shipping);
});
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	let requestData = [
		{action: 'initKlaviyo'},
		{email: 'email@gmail.com'},
		{first_name: 'Jhon'},
		{last_name: 'Doe'}
	];

	let setEmail, setFirstName, setLastName;

	let email = document.getElementById('email');
	email.addEventListener('blur', function(e){
		if( validateEmail(e.target.value) ){
			e.target.style.boxShadow = "none";
			for (let i in requestData) {
				if ( requestData[i].email ) {
					requestData[i].email = e.target.value;
					localStorage.setItem('user_email', e.target.value);
					break;
				}
			}
			setEmail = true;
			setAddUser();
		} else {
			e.target.style.boxShadow = "0 0 4px red inset";
			setEmail = false;
		}
	});

	let first_name = document.getElementById('first_name');
	first_name.addEventListener('blur', function(e){
		if( e.target.value.length > 2 ){
			e.target.style.boxShadow = "none";
			for (let i in requestData) {
				if ( requestData[i].first_name ) {
					requestData[i].first_name = e.target.value;
					setFirstName = true;
					break;
				}
			}
			setAddUser();
		} else {
			e.target.style.boxShadow = "0 0 4px red inset";
			setFirstName = false;
		}
	});

	let last_name = document.getElementById('last_name');
	last_name.addEventListener('blur', function(e){
		if( e.target.value.length > 2 ){
			e.target.style.boxShadow = "none";
			for (let i in requestData) {
				if ( requestData[i].last_name ) {
					requestData[i].last_name = e.target.value;
					setLastName = true;
					break;
				}
			}
			setAddUser();
		} else {
			e.target.style.boxShadow = "0 0 4px red inset";
			setLastName = false;
		}
	});

	function setAddUser(){
		if(setEmail && setFirstName && setLastName){
			requestAction(requestData);
		}
	}

let phoneNumber = '';
document.getElementById('phone').addEventListener('keyup', function(e) {
	this.value = this.value.replace(/[^\dA-Z]/g, '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, '($1) $2-$3-$4').trim();
});
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
(function(){

	let popupOpen = document.querySelectorAll('.popupOpen'),
		popup = document.getElementById('popup'),
		popupData = document.getElementById('popupData'),
		closePopup = document.querySelectorAll('.closePopup');

// Open popup
	for(i=0; i < popupOpen.length; i++){
		popupOpen[i].addEventListener('click', function(e){
			e.preventDefault();
			let
				popupID = e.target.dataset.popup,
				popupContent = document.getElementById(popupID).innerHTML;

				console.log(popupID);

			popupData.innerHTML = popupContent;
			popup.classList.add('active');

			if( popupID = 'faqPopup' ){
				faqFun();
			}
		});
	}

// Close popup
	for(i=0; i < closePopup.length; i++){
		closePopup[i].addEventListener('click', function(e){
			e.preventDefault();
			popupData.innerHTML = ' ';
			popup.classList.remove('active');
		});
	}

// FAQ action
	function faqFun(){
		var faqInfo = document.querySelectorAll('.faq__question');
		for(i=0; i < faqInfo.length; i++){
			faqInfo[i].addEventListener('click', function(e){
				e.preventDefault();
				e.target.parentNode.classList.toggle('active');
			});
		}
	}

})();