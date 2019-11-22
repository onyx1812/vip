let images = document.querySelectorAll('img[data-src]');
function winPosition(){
	let position = window.outerHeight;
	for (var i = 0; i < images.length; i++) {
		if( images[i].y < position ){
			images[i].src = images[i].dataset.src;
		}
	}
}
window.addEventListener('scroll', winPosition);
window.addEventListener('load', winPosition);