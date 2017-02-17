const endpoint3 = 'http://api.openweathermap.org/data/2.5/forecast?APPID=7f6619394d62483e856ea81df3979f97&cnt=8&units=metric';
let weaterList = [];
let data2;

function displayInfo2() {
  weaterList.forEach((item, i) => {
    const element = document.querySelector(`.content-2 .item-${i+1}`);
    const icon = element.querySelector(`.condition-icon`);

    element.querySelector('.time').innerHTML = item.time;
    element.querySelector('.temp').innerHTML = Math.round(item.main.temp);
    element.querySelector('.humidity').innerHTML = item.main.humidity;
    element.querySelector('.pressure').innerHTML = Math.round(item.main.pressure * 0.75);
    element.querySelector('.wind').innerHTML = Math.round(item.wind.speed * 10) / 10;

    if (item.weather[0].description.split(' ').length > 2) {
      item.weather[0].main = item.weather[0].main[0].toLowerCase() + item.weather[0].main.substr(1);
      element.querySelector('.condition-description').innerHTML = item.weather[0].main;
    } else {
      element.querySelector('.condition-description').innerHTML = item.weather[0].description;
    }

    item.class = (item.time.indexOf('Morning') !== -1 || item.time.indexOf('Day') !== -1) ? 'wi-owm-day-' : 'wi-owm-night-';

    if (item.weather[0].id === 701) {
      icon.classList.remove(icon.classList.item(2));

      if (item.class === 'wi-owm-day-') {
        icon.classList.add('wi-day-fog');
      } else {
        icon.classList.add('wi-night-fog');
      }

    } else {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add(item.class + item.weather[0].id);
    }

  });
}

function parseWeatherData() {
  let morningWeatherInfo;
  let dayWeatherInfo;
  let eveningWeatherInfo;
  let nightWeatherInfo;

  data2.forEach((item) => {
    const time = getLocalTime(window.gmtOffset, item.dt);

    if (time.getHours() == 7 || time.getHours() == 8 || time.getHours() == 9 || time.getHours() == 10) morningWeatherInfo = item;
    if (time.getHours() == 13 || time.getHours() == 14 || time.getHours() == 15 || time.getHours() == 16) dayWeatherInfo = item;
    if (time.getHours() == 19 || time.getHours() == 20 || time.getHours() == 21 || time.getHours() == 22) eveningWeatherInfo = item;
    if (time.getHours() == 1 || time.getHours() == 2 || time.getHours() == 3 || time.getHours() == 4) nightWeatherInfo = item;
  });

  const currentTime = getLocalTime(gmtOffset).getHours();

  if (currentTime >= 0 && currentTime < 7) {
    weaterList[0] = morningWeatherInfo;
    weaterList[0].time = 'This Morning';

    weaterList[1] = dayWeatherInfo;
    weaterList[1].time = 'This Day';

    weaterList[2] = eveningWeatherInfo;
    weaterList[2].time = 'This Evening';

    weaterList[3] = nightWeatherInfo;
    weaterList[3].time = 'Tomorrow Night';
  }

  if (currentTime >= 7 && currentTime < 13) {
    weaterList[0] = dayWeatherInfo;
    weaterList[0].time = 'This Day';

    weaterList[1] = eveningWeatherInfo;
    weaterList[1].time = 'This Evening';

    weaterList[2] = nightWeatherInfo;
    weaterList[2].time = 'Tomorrow Night';

    weaterList[3] = morningWeatherInfo;
    weaterList[3].time = 'Tomorrow Morning';
  }

  if (currentTime >= 13 && currentTime < 19) {
    weaterList[0] = eveningWeatherInfo;
    weaterList[0].time = 'This Evening';

    weaterList[1] = nightWeatherInfo;
    weaterList[1].time = 'Tomorrow Night';

    weaterList[2] = morningWeatherInfo;
    weaterList[2].time = 'Tomorrow Morning';

    weaterList[3] = dayWeatherInfo;
    weaterList[3].time = 'Tomorrow Day';
  }

  if (currentTime >= 19 && currentTime <= 23) {
    weaterList[0] = nightWeatherInfo;
    weaterList[0].time = 'Tomorrow Night';

    weaterList[1] = morningWeatherInfo;
    weaterList[1].time = 'Tomorrow Morning';

    weaterList[2] = dayWeatherInfo;
    weaterList[2].time = 'Tomorrow Day';

    weaterList[3] = eveningWeatherInfo;
    weaterList[3].time = 'Tomorrow Evening';
  }
}

function getWeather2() {
  const endpoint = `${endpoint3}&lat=${window.latitude}&lon=${window.longitude}`;

  fetch(proxy + endpoint)
    .then(response => response.json())
    .then(data => data2 = data.list)
    .then(parseWeatherData)
    .then(displayInfo2)
}
