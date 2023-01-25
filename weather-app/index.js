// set up the keypress event on input
const userInput = document.querySelector(".search-box");

userInput.addEventListener('keypress', function(event) {
    //Where is the info about which key is pressed?
    if (event.code === "Enter") {
        fetchWeatherData(userInput.value);
    }
});

const fetchWeatherData = (city) => {
    if (city === '') {
        alert('City not entered')
        return;
    }

    const apikey = '7e3f21edee540e6110af347b55eb1ab2';
    const unit = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apikey}&units=${unit}`;

    //Make a call to API fetch weather data about city
    fetch(url)
        .then(response => response.json())
        .then(data => showWeather(data))
        .catch(error => console.log(error.message));
};

const showWeather = (data) => {
    if (data.count <= 0) {
        alert("Invalid city");
        return;
    }

    //fetch and prepare data to be displayed
    var city = data.list[0].name;
    var date = getFormattedDate(data.list[0].dt);
    var temp = data.list[0].main.temp + ' °C';
    var weather = data.list[0].weather[0].main;
    var hi_low = data.list[0].main.temp_min + ' °C / ' + data.list[0].main.temp_max + ' °C';

    //populate data in its respective div
    document.querySelector(".city").textContent = city;
    document.querySelector(".date").textContent = date;
    document.querySelector(".temp").textContent = temp;
    document.querySelector(".weather").textContent = weather;
    document.querySelector(".hi-low").textContent = hi_low;
}

const getFormattedDate = (dt) => {
    const date = new Date(dt * 1000);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    const formattedDate = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    return formattedDate;
}