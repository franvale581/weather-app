//realizamos la requeaste para llamara a la api

const key = "d2569e92d2ed1899f24e3d6c3f89d14f";

//llamada a la api del clima
const requestCity = async city => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${key}`
        )
        const data = await response.json();
            return data
    } catch (error) {
        console.log(error);
    }
};