const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidityPercentage = document.getElementById("humidity");
const wind = document.getElementById("wind");
const searchField = document.getElementById("search");
const city = document.getElementById("title");
const pic = document.getElementById("icon");
const dayOfWeek = document.getElementById("weekday");
const time = document.getElementById("time");

const twelve = document.getElementById("12");
const fifteen = document.getElementById("15");
const eighteen = document.getElementById("18");
const twentyOne = document.getElementById("21");
const zero = document.getElementById("00");

const iconOfTwelve = document.getElementById("12icon");
const iconOfFifteen = document.getElementById("15icon");
const iconOfEighteen = document.getElementById("18icon");
const iconOfTwentyOne = document.getElementById("21icon");
const iconOfZero = document.getElementById("00icon");

const container = document.getElementById("container");
const head = document.getElementById("head");
const drop = document.getElementById("drop");
const favorites = document.getElementById("dropdown-content");

const searchBtn = document.getElementById("searchButton");
const dropDownBtn = document.getElementById("dropdown-btn");
const favoriteBtn = document.getElementById("favoriteBtn");


//Getting the day of Week to display with new Date() property
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = weekday[d.getDay()];
        dayOfWeek.textContent = day


//Adding functional dropdownlist where user can store favorite cities
dropDownBtn.addEventListener('click', function() {
    if (favorites.style.display === "block") {
        favorites.style.display = "none";
    } else {
        favorites.style.display = "block"
    }
})

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat  = position.coords.latitude;
            let lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=`)
            .then(response => response.json())
            .then(data => {
            //The city/title needs to match the input fields value
            city.textContent = data.city.name

            //Defining temperature and converting it from Kelvin to Celsius
            let tempInKelv = data.list[0].main.temp;
            let tempInCel = tempInKelv - 274.15;
            temperature.textContent = `${Math.floor(tempInCel)}°C`;
        
            //Displaying the "description" of the current weather
            const text = data.list[0].weather[0].description;
            description.textContent = text;
        
            //Displaying all of the temperatures for hours 12 15 18 21 00
            twelve.textContent = `${Math.floor(data.list[0].main.temp - 274.15)}°`
            fifteen.textContent = `${Math.floor(data.list[1].main.temp - 274.15)}°`
            eighteen.textContent = `${Math.floor(data.list[2].main.temp - 274.15)}°`
            twentyOne.textContent = `${Math.floor(data.list[3].main.temp - 274.15)}°`
            zero.textContent = `${Math.floor(data.list[4].main.temp - 274.15)}°`
        
            //Displaying all the icons for hours 12 15 18 21 00
            iconOfTwelve.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
            iconOfFifteen.src = `http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`
            iconOfEighteen.src = `http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`
            iconOfTwentyOne.src = `http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`
            iconOfZero.src = `http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`    
            })
        });

    } else {
        console.log("Geolocation is not supported")
    }
}


//Adding eventListener for search button to execute fetch request to API to get the weather data:
searchBtn.addEventListener('click', function getData() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchField.value}&appid=aa68d97d3d2098b8e744b2b7df014536`)
    .then(response => response.json())
    .then(data => {

        //The city/title needs to match the input fields value
        city.textContent =`${searchField.value}`

        //Defining temperature and converting it from Kelvin to Celsius
        let tempInKelv = data.list[0].main.temp;
        let tempInCel = tempInKelv - 274.15;
        temperature.textContent = `${Math.floor(tempInCel)}°C`;
        
        //Displaying the "description" of the current weather
        const text = data.list[0].weather[0].description;
        description.textContent = text;
        
        //Displaying all of the temperatures for hours 12 15 18 21 00
        twelve.textContent = `${Math.floor(data.list[0].main.temp - 274.15)}°`
        fifteen.textContent = `${Math.floor(data.list[1].main.temp - 274.15)}°`
        eighteen.textContent = `${Math.floor(data.list[2].main.temp - 274.15)}°`
        twentyOne.textContent = `${Math.floor(data.list[3].main.temp - 274.15)}°`
        zero.textContent = `${Math.floor(data.list[4].main.temp - 274.15)}°`
        
        //Displaying all the icons for hours 12 15 18 21 00
        iconOfTwelve.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
        iconOfFifteen.src = `http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`
        iconOfEighteen.src = `http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`
        iconOfTwentyOne.src = `http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`
        iconOfZero.src = `http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`

    })
})

//Creating favorite button
favoriteBtn.addEventListener('click', function() {
    const note = document.createElement('p')
    const deleteBtn = document.createElement('button')

    deleteBtn.setAttribute('type', 'button')
    deleteBtn.classList.add('favorites')
    deleteBtn.classList.add('delete-note')
    deleteBtn.classList.add('fa')
    deleteBtn.classList.add('fa-trash')
    note.classList.add('favorites')
    note.textContent = searchField.value

    if(searchField.value === "") {
        alert("Search field is empty!")
    } else {
        favorites.appendChild(note)
        favorites.appendChild(deleteBtn)
    }

    deleteBtn.addEventListener('click', function() {
        favorites.removeChild(note)
        favorites.removeChild(deleteBtn)
    })

    note.addEventListener('click', function() {
        searchField.value = note.innerText
        //Fetching the data again if some of the favorite cities is clicked
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchField.value}&appid=aa68d97d3d2098b8e744b2b7df014536`)
        .then(response => response.json())
        .then(data => {

        //The city/title needs to match the input fields value
        city.textContent =`${searchField.value}`

        //Defining temperature and converting it from Kelvin to Celsius
        let tempInKelv = data.list[0].main.temp;
        let tempInCel = tempInKelv - 274.15;
        temperature.textContent = `${Math.floor(tempInCel)}°C`;
        
        //Displaying the "description" of the current weather
        const text = data.list[0].weather[0].description;
        description.textContent = text;
        
        //Displaying all of the temperatures for hours 12 15 18 21 00
        twelve.textContent = `${Math.floor(data.list[0].main.temp - 274.15)}°`
        fifteen.textContent = `${Math.floor(data.list[1].main.temp - 274.15)}°`
        eighteen.textContent = `${Math.floor(data.list[2].main.temp - 274.15)}°`
        twentyOne.textContent = `${Math.floor(data.list[3].main.temp - 274.15)}°`
        zero.textContent = `${Math.floor(data.list[4].main.temp - 274.15)}°`
        
        //Displaying all the icons for hours 12 15 18 21 00
        iconOfTwelve.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
        iconOfFifteen.src = `http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`
        iconOfEighteen.src = `http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`
        iconOfTwentyOne.src = `http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`
        iconOfZero.src = `http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`

    })
    })
})