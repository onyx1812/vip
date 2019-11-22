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