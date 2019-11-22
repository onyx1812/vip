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