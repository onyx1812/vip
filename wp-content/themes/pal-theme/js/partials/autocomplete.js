let autocomplete;

function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(
	document.getElementById('line1'), {
		types: ['geocode'],
		// componentRestrictions: {country: "us"},
	});
	autocomplete.setFields(['address_component']);
	autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	let place = autocomplete.getPlace(),
		addressComp = place.address_components;
	if(typeof place.address_components != 'undefined') {
		for (i=0; i<place.address_components.length; i++) {
			if(place.address_components[i].types.indexOf('postal_code') != -1) {
				let g_zip = place.address_components[i].long_name;
				document.getElementById('zip').value = g_zip;
			}
			if(place.address_components[i].types.indexOf('street_number') != -1 && place.address_components[i].types.indexOf('route') != -1) {
				let g_street_number = place.address_components[i].long_name,
					g_route = place.address_components[i].long_name;
				document.getElementById('line1').value = g_street_number+' '+g_route;
			}
			if(place.address_components[i].types.indexOf('locality') != -1) {
				let g_city = place.address_components[i].long_name;
				document.getElementById('city').value = g_city;
				console.log(g_city);
			}
			if(place.address_components[i].types.indexOf("administrative_area_level_1") != -1) {
				let g_state = place.address_components[i].short_name;
				document.getElementById('state').value = g_state;
				console.log(g_state);
			}
			if(place.address_components[i].types.indexOf("country") != -1) {
				let g_country = place.address_components[i].short_name,
					country = document.getElementById('country');
				for (var opt, j = 0; opt = country.options[j]; j++) {
					country.selectedIndex
					if (opt.value == g_country) {
						country.selectedIndex = j;
						break;
					}
				}
			}
		}
	}
}