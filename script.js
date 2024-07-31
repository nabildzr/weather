const apiKey = "6e2ace42489d90838432bb1a05e84a59"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metri&q="

const searchBox = document.querySelector(".search-input")

const searchBtn = document.querySelector(".search button")

const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json()

    if (data.cod == "404") {
        alert("City not found")
        return
    }

    document.querySelector(".city").innerHTML = data.name

    // displaying only 2 digits temperature 
    const temp = data.main.temp.toString().slice(0, 2)
    document.querySelector(".temp").innerHTML = temp + "°C"

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"

    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

    document.querySelector(".description").innerHTML = data.weather[0].description + "."

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }


    if (data.main.temp >= 30) {
        document.querySelector(".card").style.backgroundImage = "radial-gradient(circle, rgba(251,157,63,1) 0%, rgba(252,252,70,1) 100%)"
    }

    if (data.main.temp <= 29) {
        document.querySelector(".card").style.backgroundImage = "radial-gradient(circle, rgba(63,222,251,1) 0%, rgba(151,252,70,1) 100%)"
    }




    document.querySelector(".weather").style.display = "block"
}

// const loader = document.querySelector(".loader")

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

// Enter key hehhe
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value)
    }
})