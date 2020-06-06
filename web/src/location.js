import store from './store'

async function success(pos) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=79b5572531994a5b946ecc5ec1463471`);
  const data = await response.json();

  const countryCode = mapCountryCode(data.results[0].components.country_code);
  let region = data.results[0].components.state;
  region = region
    .replace('Voivodeship', '')
    .trim()
    .replace(' ', '_')
    .toLowerCase();

  store.commit('setLocation', {
    coords: pos.coords,
    country: countryCode,
    region: region,
  });
}

const mapCountryCode = (code) => {
  const formatted = code.toUpperCase();
  switch (formatted) {
    case 'CZ':
      return 'CS';
    default:
      return formatted;
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

navigator.geolocation.watchPosition(success, error, options);
