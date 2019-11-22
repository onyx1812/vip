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
	request.open('POST', '/wp-admin/admin-ajax.php', true);
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

(function($) {

	$(document).on('click', '.order-title', function(e){
		e.preventDefault();
		$('.order-item .order-dashboard').slideUp();
		$(this).parent().find('.order-dashboard').slideDown();
	});

	$(document).on('click', '#addAffiliates', function(e){
		e.preventDefault();
		$('#addAffiliatesForm').slideToggle();
	});

	$(document).on('submit', '#addAffiliatesForm', function(e){
		e.preventDefault();
		requestAffiliates = [{
			action: 'addAffiliatesAction',
			affiliate_id: $('[name="affiliate_id"]').val(),
			affiliate_name: $('[name="affiliate_name"]').val(),
		}];
		requestAction(requestAffiliates, function(result){
			console.log(result);
		});
	});

})(jQuery);