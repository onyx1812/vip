let autocomplete;
function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(
	document.getElementById('autocomplete'), {
		types: ['geocode'],
		componentRestrictions: {country: "us"},
	});
	autocomplete.setFields(['address_component']);
	autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	var place = autocomplete.getPlace();
	var addressComp = place.address_components;

	var zip = '';
	var street_number = '';
	var route = '';
	var city = '';
	var state = '';
	var state_full = 'your state';
	if(typeof place.address_components != 'undefined') {
		for (i=0; i<place.address_components.length; i++) {
			if(place.address_components[i].types.indexOf('postal_code') != -1) {
				zip = place.address_components[i].long_name;
			}
			if(place.address_components[i].types.indexOf('street_number') != -1) {
				street_number = place.address_components[i].long_name;
			}
			if(place.address_components[i].types.indexOf('route') != -1) {
				route = place.address_components[i].long_name;
			}
			if(place.address_components[i].types.indexOf('locality') != -1) {
				city = place.address_components[i].long_name;
			}
			if(place.address_components[i].types.indexOf("administrative_area_level_1") != -1) {
				state = place.address_components[i].short_name;
				state_full = place.address_components[i].long_name;
			}
		}
	}
	var g_city = document.getElementById('g_city');
	g_city.value = city;

	var g_country = document.getElementById('g_country');
	var opts = g_country.options;
	for (var opt, j = 0; opt = opts[j]; j++) {
		if (opt.value == 'US') {
			g_country.selectedIndex = j;
			break;
		}
	}

	var g_state = document.getElementById('g_state');
	g_state.value = state;

	var g_zip = document.getElementById('g_zip');
	g_zip.value = zip;

	var line1 = document.getElementById('line1');
	line1.value = street_number+' '+route;

}