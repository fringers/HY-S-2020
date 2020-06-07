import store from './store'

async function success(pos) {
  const timestamp = new Date();

  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=79b5572531994a5b946ecc5ec1463471&language=en`);
  const data = await response.json();

  const countryCode = mapCountryCode(data.results[0].components.country_code);
  const region = mapRegion(data.results[0].components.state);

  store.dispatch('locationUpdate', {
    timestamp: timestamp,
    coords: pos.coords,
    country: countryCode,
    region: region,
  });
}

const mapRegion = (state) => {
  if (!state) {
    return null;
  }

  let region = state;
  region = region.toLowerCase();
  region = region.replace('voivodeship', '');
  region = region.replace('województwo', '');
  region = region.replace('region of', '');
  region = region.trim();
  region = region.replace(' ', '_');

  return region;
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
