
function createGoogleMapsLink(latitude, longitude) {
  const $link = document.createElement('a');
  $link.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
  $link.target = '_blank';
  $link.className = 'coordinates-url';
  $link.textContent = `If you're around here`;
  return $link;
}

async function fetchWeather(lat, lon) {
  const $elem = document.getElementById("weather-classification");
  const $coordinates = document.getElementById("coordinates");

  $elem.style.opacity = 0;
  $coordinates.style.opacity = 0;

  await delay(750);
  $elem.textContent = `I'll have a look...`
  $elem.style.opacity = 1;
  $coordinates.style.opacity = 1;
  await delay(1500);
  $elem.style.opacity = 0;
  $coordinates.style.opacity = 0;
  await delay(1000);

  const res = await fetch(`.netlify/functions/weather?lat=${lat}&lon=${lon}`);
  return await res.json();
}

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

async function getLocation() {
  const $weather = document.getElementById("weather-classification");
  const $coordinates = document.getElementById("coordinates");

  try {
    const position = await getPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const { message } = await fetchWeather(lat, lon);

    $weather.style.opacity = 1;
    $coordinates.style.opacity = 1;

    if (message) {
      $weather.innerHTML = message;
      $coordinates.appendChild(createGoogleMapsLink(lat, lon));
    }

  } catch (err) {
    $weather.innerHTML = `Your browser's acting up, it gave this error message: ${err.message}`;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  if (!("geolocation" in navigator)) {
    $elem = document.getElementById("weather-classification");
    $elem.innerHTML = `Your browser won't let know where you are, sorry!`

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