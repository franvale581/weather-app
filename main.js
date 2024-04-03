const form = document.querySelector(".weather-form");
const cityInput = document.querySelector(".search-input");
const cardContainer = document.querySelector(".card-container");
const searchMsg = document.querySelector(".search-msg");

// -------- funciones auxiliares --------- //
//si el input esta vacio
const isEmptyInput = () => {
    return cityInput.value.trim() === "";
};
//si la ciudad ingresada no esta en la base de datos
const isInvalidCity = (cityData) => {
    return !cityData.id;
};
//funcion para crear la card dentro de nuestra hoja html
const renderCityCard = (cityData) => {
    cardContainer.innerHTML = createCityTemplate(cityData);
};
//funcion para redondear los valores
const roundNumber = (number) => {
    return Math.round(number);
};
//mensaje que se renderiza cuando se encuentra la ciudad
const changesearchMsg = (cityData) => {
    const cityName = cityData.name;
    searchMsg.innerHTML = `Así está el clima en ${cityName}, ¿Quieres ver el clima en otra ciudad?`;
};

const getCityData = (cityData) => {
    return {
        cityName: cityData.name,
        imageName: cityData.weather[0].icon,
        cityWeatherInfo: cityData.weather[0].description,
        cityTemp: roundNumber(cityData.main.temp),
        cityST: roundNumber(cityData.main.feels_like),
        cityMaxTemp: roundNumber(cityData.main.temp_max),
        cityMinTemp: roundNumber(cityData.main.temp_min),
        cityHumidity: cityData.main.humidity
    };
};

const createCityTemplate = (cityData) => {
    const {
        cityName,
        imageName,
        cityWeatherInfo,
        cityTemp,
        cityST,
        cityMaxTemp,
        cityMinTemp,
        cityHumidity
    } = getCityData(cityData);

    return `
    <div class="weather-card animate">
          <div class="weather-info-container">
            <div class="weather-info-top">
                <h2 class="weather-title">${cityName}</h2>
                <p class="weather-description">${cityWeatherInfo}</p>
            </div>
            <div class="weather-temp-container">
              <span class="weather-temp">${cityTemp} °</span>
              <span class="weather-st">${cityST} ST</span>
            </div>
          </div>
          <div class="weather-img-container">
            <img src="./assets/img/${imageName}.png" alt="weather image" class="weather-img vibe"/>
          </div>
          <div class="weather-extra-container">
            <div class="weather-minmax-container">
              <span class="weather-span"><i class="fa-solid fa-arrow-up-long"></i>Max: ${cityMaxTemp}º</span>
              <span class="weather-span"><i class="fa-solid fa-arrow-down-long"></i>Min: ${cityMinTemp}º</span>
            </div>
            <span class="weather-humidity">${cityHumidity}% Humedad</span>
          </div>
        </div>
    `
};

// -------- MAIN FUNCTION --------- //

const searchCity = async (e) => {
    //prevenimos que el input recarge la pagina
    e.preventDefault();
    //usamos return para cortar la ejecucion
    if (isEmptyInput()) {
        alert("No ingresaste ninguna ciudad");
        return;
    }

    //si el input no esta vacio, se realiza la busqueda
    const fetchedCity = await requestCity(cityInput.value)
    console.log(fetchedCity);

    if (isInvalidCity(fetchedCity)) {
        alert("La ciudad que ingresaste no existe");
        form.reset();
        return;
    }

    renderCityCard(fetchedCity);
    changesearchMsg(fetchedCity);
    form.reset();
};

// -------- funcion de inicio --------- //

const init = () => {
    form.addEventListener("submit", searchCity);
};

init();
