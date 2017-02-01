const endpoint1 = 'https://api.timezonedb.com/v2/get-time-zone?by=position&format=json&key=OJMUUIXHQRR0';
const endpoint2 = 'http://api.openweathermap.org/data/2.5/weather?APPID=7f6619394d62483e856ea81df3979f97&units=metric';

window.proxy = 'https://cors-anywhere.herokuapp.com/';

window.latitude = '37.77493';
window.longitude = '-122.41942';

let data1;

function changeIcon(sunrise, sunset) {
  const icon = document.querySelector('.content-1 .condition-icon');

  if (sunrise > 0 && sunset < 0) {
    if (data1.weather[0].id == 701) {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add('wi-day-fog');
    } else {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add('wi-owm-day-' + data1.weather[0].id);
    }
  } else {
    if (data1.weather[0].id == 701) {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add('wi-night-fog');
    } else {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add('wi-owm-night-' + data1.weather[0].id);
    }
  }
}

function getLocalTime(offset, time) {
    const d = (time) ? new Date(time * 1000) : new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    return new Date(utc + (3600000 * (offset / 3600)));
}

function displayInfo1() {
  const formatter1 = new Intl.DateTimeFormat('en-GB', {
    timezone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const formatter2 = new Intl.DateTimeFormat('en-GB', {
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
  });

  document.querySelector('.content-1 .date').innerHTML = formatter1.format(getLocalTime(gmtOffset));
  document.querySelector('.content-1 .sunrise').innerHTML = formatter2.format(getLocalTime(gmtOffset, data1.sys.sunrise));
  document.querySelector('.content-1 .sunset').innerHTML = formatter2.format(getLocalTime(gmtOffset, data1.sys.sunset));
  document.querySelector('.content-1 .current-temp').innerHTML = Math.round(data1.main.temp * 10) / 10;
  document.querySelector('.content-1 .condition-description').innerHTML = data1.weather[0].description;
  document.querySelector('.content-1 .humidity').innerHTML = data1.main.humidity;
  document.querySelector('.content-1 .cloudiness').innerHTML = data1.clouds.all;
  document.querySelector('.content-1 .wind').innerHTML = data1.wind.speed;
  document.querySelector('.content-1 .pressure').innerHTML = Math.round(data1.main.pressure * 0.75);

  changeIcon(getLocalTime(gmtOffset).valueOf() - getLocalTime(gmtOffset, data1.sys.sunrise).valueOf(),
             getLocalTime(gmtOffset).valueOf() - getLocalTime(gmtOffset, data1.sys.sunset).valueOf());
}

function getWeather1() {
  const endpoint = `${endpoint2}&lat=${window.latitude}&lon=${window.longitude}`;

  fetch(proxy + endpoint)
    .then(response => response.json())
    .then(data => data1 = data)
    .then(displayInfo1)
}

function start() {
  const endpoint = `${endpoint1}&lat=${window.latitude}&lng=${window.longitude}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => window.gmtOffset = data.gmtOffset)
    .then(getWeather1)
    .then(getWeather2)
    .then(getWeather3)
    .catch(start)
}

start();
