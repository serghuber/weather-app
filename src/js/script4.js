const endpoint4 = 'http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=7&appid=7f6619394d62483e856ea81df3979f97';

let data3;

function displayInfo3() {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timezone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  data3.shift();

  data3.forEach((item, i) => {
    const element = document.querySelector(`.content-3 .item-${i+1}`);
    const date = getLocalTime(window.gmtOffset, item.dt);
    const dateArray = formatter.format(date).split(' ');

    element.querySelector('.day').innerHTML = `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}`;
    element.querySelector('.max-temp').innerHTML = Math.round(item.temp.max);
    element.querySelector('.min-temp').innerHTML = Math.round(item.temp.min);
    element.querySelector('.pressure').innerHTML = Math.round(item.pressure * 0.75);
    element.querySelector('.cloudiness').innerHTML = item.clouds;
    element.querySelector('.wind').innerHTML = Math.round(item.speed * 10) / 10;

    if (item.weather[0].description.split(' ').length > 2) {
      item.weather[0].main = item.weather[0].main[0].toLowerCase() + item.weather[0].main.substr(1);
      element.querySelector('.condition-description').innerHTML = item.weather[0].main;
    } else {
      element.querySelector('.condition-description').innerHTML = item.weather[0].description;
    }

    const icon = element.querySelector('.condition-icon');

    if (item.weather[0].id === 701) {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add('wi-fog');
    } else {
      icon.classList.remove(icon.classList.item(2));
      icon.classList.add('wi-owm-' + item.weather[0].id);
    }
  });
}

function getWeather3() {
  const endpoint = `${endpoint4}&lat=${window.latitude}&lon=${window.longitude}`;

  fetch(proxy + endpoint)
    .then(response => response.json())
    .then(data => data3 = data.list)
    .then(displayInfo3)
}
