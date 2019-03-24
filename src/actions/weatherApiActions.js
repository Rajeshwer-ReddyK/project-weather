import connectToOpenWeather from "./openWeatherConnector";

export const getCurrentWeather = (lat="13.0531328", lon="80.207872") => { //quick extend to redux // default to anna nagar
    return connectToOpenWeather.get(`weather?lat=${lat}&lon=${lon}&units=imperial`);
}

export const getWeeklyWeather = (lat="13.0531328", lon="80.207872") => {
    return connectToOpenWeather.get(`forecast?lat=${lat}&lon=${lon}&units=imperial`);
}