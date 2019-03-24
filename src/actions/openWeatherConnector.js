import { OPEN_WEATHER_API_TOKEN } from "../TOKENS";

export default {
    get: async (endpoint) => {
        const baseUrl = "https://api.openweathermap.org/data/2.5/";
        const token = OPEN_WEATHER_API_TOKEN;
        let res = await fetch(`${baseUrl}${endpoint}&appid=${token}`);
        return await res.json();
    }
}