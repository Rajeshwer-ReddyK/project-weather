export const getCurrentLocation = (postData) => {
    let status, latitude, longitude;
    const showStatus = (type, msg) => {
        status = {type, msg}
    } 
    // If geolocation is not supported, output msg and exit out of function
    if (!navigator.geolocation){
        showStatus('error', 'ERROR: Geolocation is not supported by this browser');
        return;
    }
    const showPosition = (position) => {
        latitude  = position.coords.latitude
        longitude = position.coords.longitude;
        showStatus('success', 'Success! Location found.');
        postData(latitude, longitude, status)
    }
    const showError = (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                        showStatus('error', 'ERROR: Geolocation request denied.');
                        break;
            case error.POSITION_UNAVAILABLE:
                        showStatus('error', 'ERROR: Location information is unavailable.');
                        break;
            case error.TIMEOUT:
                        showStatus('error', 'ERROR: The request to get user location timed out.');
                        break;
            case error.UNKNOWN_ERROR:
                        showStatus('error', 'ERROR: An unknown error occurred.');
                        break;
        }
        postData(latitude, longitude, status)
    }
    navigator.geolocation.getCurrentPosition(showPosition, showError, {enableHighAccuracy: true});
}

export const convertCurrentWeather = (res) =>{
    const {sys, name, weather, main} = res;
    const consumable = {
        country: sys.country,
        city: name,
        icon: weather[0].icon,
        weatherDes: weather[0].description,
        temp: main.temp
    }

    return consumable;
}

export const convertWeeklyWeather = (res) => {
    const {city, list} = res;
    const fiveDayApprox = [];
    const getFiveDayApprox = () => {
        let tempDate = [];
        for(const [index,each] of list.entries()){
            let [date] = each.dt_txt.split(" ");
            if(!tempDate.includes(date)){
                tempDate.push(date);
                fiveDayApprox.push(each)
            }
        }
        fiveDayApprox.splice(0,1);
    }
    getFiveDayApprox()
    const consumable = Array.from(fiveDayApprox, each => {
        const {main, weather, dt_txt, wind} = each;
        return {
            maxTemp: main.temp_max,
            minTemp: main.temp_min,
            icon: weather[0].icon,
            weatherDes: weather[0].description,
            dt: dt_txt,
            humidity: main.humidity,
            pressure: main.pressure,
            windSpeed: wind.speed,
            windDir: wind.deg
        }
    })
    return consumable;
}

export const getConvertedTemp = (tempUnit, temp) => {
    const convertToCel = (fahrenheit) => (fahrenheit - 32) * 5/9
    return Math.round(tempUnit == "c" ? convertToCel(temp) : temp);
}

export const dayMapper = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const dayFullNameMapper = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const monthMapper = ["January","February","March","April","May","June","July","August","September","October","November","December"]

export const getFormatedDate = today => `${dayFullNameMapper[today.getDay()]}, ${monthMapper[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
export const convertWindToDir = (input) => {
    const directionMapper=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    return directionMapper[Math.round(((input/22.5)+0.5) % 16)]
}