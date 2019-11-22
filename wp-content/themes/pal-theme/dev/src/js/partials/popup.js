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