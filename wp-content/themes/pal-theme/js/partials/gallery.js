let galleryIMG = document.getElementById('galleryIMG');
let galleryNAV = document.querySelectorAll('.gallery--nav img');
for (let i = 0; i < galleryNAV.length; i++) {
	galleryNAV[i].addEventListener('click', function(e){
		e.preventDefault();
		galleryIMG.src = e.target.src;
	});
}