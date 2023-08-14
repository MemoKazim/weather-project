const API_KEY = "b778f44af5470856cb4636528b71ea41";
const Http = new XMLHttpRequest();
let go_back = document.getElementsByClassName("go-back")[0];
let f_page = document.getElementsByClassName("f-page")[0];
let s_page = document.getElementsByClassName("s-page")[0];
let check = document.getElementsByClassName("submit")[0];
let icon = document.getElementsByClassName("circle")[0];
let city = document.getElementsByClassName("city-name")[0];
let status = document.getElementsByClassName("weather-status")[0];
let temperature = document.getElementsByClassName("weather-temperature")[0];
let description = document.getElementsByClassName("weather-description")[0];
var u_city = undefined;
var w_icon = undefined;
var w_main = undefined;
var w_desc = undefined;
var w_temp = undefined;
check.addEventListener("click", () => {
  f_page.classList = "";
  f_page.classList.add("f-page", "animation_hide");
  u_city = document.querySelector("input").value;
  Http.open("GET", getWeather(u_city));
  Http.send();
  if (Http.status === 200) {
    Http.onreadystatechange = (e) => {
      let respose = JSON.parse(Http.responseText);

      w_icon = respose.weather[0].icon;
      w_main = respose.weather[0].main;
      w_desc = respose.weather[0].description;
      w_temp = respose.main.temp;
      icon.setAttribute("src", `/images/${w_icon}.gif`);
      city.innerHTML = u_city;
      status.innerHTML = w_desc;
      temperature.innerHTML = w_temp;
      description.innerHTML = w_desc;
      console.log(respose.status);
    };
  } else {
    city.innerHTML = "Unknown city...<br>Please try again!";
    icon.setAttribute("style", "visibility: hidden;");
  }
  s_page.classList = "";
  s_page.classList.add("s-page", "animation_show");
});

go_back.addEventListener("click", () => {
  s_page.classList = "";
  s_page.classList.add("s-page", "animation_hide");
  f_page.classList = "";
  f_page.classList.add("f-page", "animation_show");
});

let getWeather = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
};

/*
{
    "coord": {
        "lon": 49.892,
        "lat": 40.3777
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 33.03,
        "feels_like": 38.89,
        "temp_min": 33.03,
        "temp_max": 33.03,
        "pressure": 1017,
        "humidity": 58
    },
    "visibility": 8000,
    "wind": {
        "speed": 7.2,
        "deg": 140
    },
    "clouds": {
        "all": 0
    },
    "dt": 1692016805,
    "sys": {
        "type": 1,
        "id": 8841,
        "country": "AZ",
        "sunrise": 1691977793,
        "sunset": 1692027646
    },
    "timezone": 14400,
    "id": 587084,
    "name": "Baku",
    "cod": 200
}
*/
