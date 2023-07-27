const location_not_found = document.querySelector('.location-not-found');
const weather_loading = document.querySelector('.weather.loading');
let weather = {
    apiKey: "c5cb515cb9d31c5b6c910b02400ce2e3",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
              city +
              "&units=metric&appid=" +
              this.apiKey
          ).then((response) => response.json())
            .then((data) => 
            {
              if((data).cod === `404`){
                location_not_found.style.display = "flex";
                weather_loading.style.display = "none";
                console.log("error");
                return;
            }
            else
            {
            location_not_found.style.display = "none";
            weather_loading.style.display = "block";
            this.displayWeather(data);
            }
          }
          );
        },
    displayWeather: function (data) {
      const { name} = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity,pressure } = data.main;
      const { speed } = data.wind;
      const visibility = data.visibility;
      let time = document.getElementById("time");
      setInterval(()=>{
      let d = new Date();
      time.innerHTML = "Current time : " + d.toLocaleTimeString();
    },1000)
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText ="Temperature : " + temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity : " + humidity + "%";
      document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
      document.querySelector(".visibility").innerText = "Visibility: " + visibility + " meters";
      document.querySelector(".wind").innerText =
        "Wind speed : " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
