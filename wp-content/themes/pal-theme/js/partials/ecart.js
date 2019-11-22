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