const mockForecast = {
    miami: [
        {
            date: "Oct 15th, 2025",
            weather: "Rainy",
            temp: "85F",
            humidity: "20%"
        },
        {
            date: "Oct 16th, 2025",
            weather: "Windy",
            temp: "75F",
            humidity: "50%"
        },
        {
            date: "Oct 17th, 2025",
            weather: "Sunny",
            temp: "70F",
            humidity: "70%"
        }
    ],
    sunrise: [
        {
            date: "Oct 15th, 2025",
            weather: "Cloudy",
            temp: "85F",
            humidity: "20%"
        },
        {
            date: "Oct 16th, 2025",
            weather: "Cold",
            temp: "75F",
            humidity: "20%"
        },
        {
            date: "Oct 17th, 2025",
            weather: "Snowy",
            temp: "40F",
            humidity: "10%"
        }
    ],
    weston: [
        {
            date: "Oct 15th, 2025",
            weather: "Clear",
            temp: "73F",
            humidity: "20%"
        },
        {
            date: "Oct 16th, 2025",
            weather: "Sunny",
            temp: "80F",
            humidity: "20%"
        },
        {
            date: "Oct 17th, 2025",
            weather: "Sunny",
            temp: "87F",
            humidity: "10%"
        }
    ],
}

let forecastData = null //the current forecast we have saved

let day = 1 //index of the day we're on for the forecast

// Step 0
document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('weather-button')
    getWeatherButton.addEventListener('click', () => handleSubmit())

    const nextButton = document.getElementById('next-button')
    nextButton.addEventListener('click', () => handleNext())

    const prevButton = document.getElementById('prev-button')
    prevButton.addEventListener('click', () => handlePrev())

    requestNotificationPermision()
})

// Step 1
const handleSubmit = () => {
    const locationInput = document.getElementById("location-input")
    const location = locationInput.value
    
    const forecast = getForecast(location)

    //make sure to start at 1 so the info loads in the right index
    displayMockForecast(forecast, 1)
}

// Step 2
const getForecast = (location) => {
    let locationKey = location.toLowerCase()
    let selectedForecast = mockForecast[locationKey]
    // mockForecast.locationKey

    forecastData = selectedForecast

    let notificationText = ""

    selectedForecast.forEach(day => {
        console.log('day', day)

        if (day.weather.toLowerCase() === "sunny") {
            notificationText += `${day.date}: Weather is ${day.weather}.\n`
        }
    });

    if (notificationText) {
        createNotification(notificationText)
    }

    return selectedForecast
}

// Step 3 - display
const displayMockForecast = (forecast, index) => {
    console.log(forecast)
    //getting the elements we want to change
    const date = document.getElementById('date-detail')
    const weather = document.getElementById('weather-detail')
    const temp = document.getElementById('temp-detail')
    const humidity = document.getElementById('humidity-detail')
    const forecastImage = document.getElementById('forecast-img')

    const currForecast = forecast [index]
    date.innerText = currForecast?.date ?? "-"
    weather.innerText = currForecast?.weather ?? "-"
    temp.innerText = currForecast?.temp ?? "-"
    humidity.innerText = currForecast?.humidity ?? "-"
    //use weather to determine image, defualt to sunny image otherwise
    forecastImage.src = `./images/${currForecast?.weather.toLowerCase() ?? "sunny"}.jpg`
}

// Step 4 - more banc and next button handlers
const handleNext = () => {
    day += 1
    displayMockForecast(forecastData, day)
}

const handlePrev = () => {
    day -= 1
    displayMockForecast(forecastData, day)
}

// Step 5
function requestNotificationPermision() {
    if(!("Notification" in window)) { //it's actually a bit hard to checker whether a browser supports notifs
        //so this is failsafe code
        console.log("This browser does not support notifications")
        return
    }

    //request notification permissions and print out the user's response to the console
    Notification.requestPermission().then((result) => {
        console.log(result);
    });
}

//create a notif
function createNotification(text) {
    if (Notification?.permission === "granted") {
        const img = "sunny.jpg";
        const notification = new Notification("Weather Alert", {body: text, icon: img});
    }
}