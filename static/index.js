
function createGoogleMapsLink(latitude, longitude) {
  const link = document.createElement('a');
  link.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
  link.target = '_blank';
  link.className = 'coordinates-url';
  link.textContent = `If you're around here`;
  return link;
}

async function fetchWeather(lat, lon) {
  document.getElementById("weather-classification").innerHTML = `I'll have a look...`

  const res = await fetch(`.netlify/functions/weather?lat=${lat}&lon=${lon}`);
  return await res.json();
}

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

async function getLocation() {
  try {
    const position = await getPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const startTime = Date.now();
    const { message } = await fetchWeather(lat, lon);
    const endTime = Date.now();

    await delay(Math.max(1_500 - (endTime - startTime, 0)));

    if (message) {
      document.getElementById("weather-classification").innerHTML = message

      const coordinatesElement = document.getElementById('coordinates');
      coordinatesElement.appendChild(createGoogleMapsLink(lat, lon));
    }

  } catch (err) {
    document.getElementById("weather-classification").innerHTML = `Your browser's acting up, it gave this error message: ${err.message}`;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
  if (!("geolocation" in navigator)) {
    document.getElementById("weather-classification").innerHTML = `Your browser won't let know where you are, sorry!`
    return
  }

  navigator.permissions.query({name:'geolocation'}).then(async permissionStatus => {
      if (permissionStatus.state === "granted") {
        // to avoid being too fast!
        await delay(1_000);
        await getLocation();

      } else if (permissionStatus.state === "prompt") {
        // lets not be jerks; wait a moment to let the user decide
        await delay(2_000);
        await getLocation();

      } else {
        document.getElementById("weather-classification").innerHTML = "I can hardly tell you what the weather is like if I don't know where you are!"
      }
    });
}

start();