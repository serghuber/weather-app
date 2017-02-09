const input = document.querySelector('.city-search');
const geoBtn = document.querySelector('.geo-button');

input.addEventListener('focus', () => input.select());

function init() {
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  const options = {
    types: ['(cities)']
  };

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

    place.address_components.forEach((item) => {
      if (item.types[0] == 'locality' || item.types[1] == 'locality' || item.types[2] == 'locality') {
        document.querySelector('.content-1 .city').innerHTML = item.short_name;
        if (item.short_name == 'SF') document.querySelector('.content-1 .city').innerHTML = 'San Francisco';
      }

      if (item.types[0] == 'country' || item.types[1] == 'country' || item.types[2] == 'country') {
        document.querySelector('.content-1 .country').innerHTML = item.long_name;
      }
    });

    window.latitude = place.geometry.location.lat();
    window.longitude = place.geometry.location.lng();

    start();

  });
}

geoBtn.addEventListener('click', (e) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      input.value = '';

      window.latitude = position.coords.latitude;
      window.longitude = position.coords.longitude;

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDd3QGZaj-bTDmV7pfJHhn5uSLCaX1UPC8&language=en&latlng=${position.coords.latitude},${position.coords.longitude}`)
        .then(response => response.json())
        .then((data) => {
          data.results[3].address_components.forEach((item) => {
            if (item.types[0] == 'locality' || item.types[1] == 'locality' || item.types[2] == 'locality') {
              if (item.short_name == 'SF') {
                document.querySelector('.content-1 .city').innerHTML = 'San Francisco';
              } else {
                document.querySelector('.content-1 .city').innerHTML = item.short_name;
              }
            }

            if (item.types[0] == 'country' || item.types[1] == 'country' || item.types[2] == 'country') {
              document.querySelector('.content-1 .country').innerHTML = item.long_name;
            }
          });
        })
        .then(start)
    });
  } else {
    alert('Sorry, geolocation is not available');
  }
});
