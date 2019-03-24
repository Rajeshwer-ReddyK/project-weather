import React, {Fragment} from 'react';
import { getConvertedTemp, dayMapper, getFormatedDate, convertWindToDir } from '../utils';

export const TodayBlock = (props) => {
    const {tempUnit, currentWeather} = props;
    const {country, city, icon, weatherDes, temp} = currentWeather || {};
    const today = new Date();
    const formatDate = getFormatedDate(today);
    return(
        <Fragment>
            <h1 className="location">{`${city}, ${country}`}</h1>
            <h2 className="date">{formatDate}</h2>
            <div className="weatherIcon"> 
                <img src={`http://openweathermap.org/img/w/${icon}.png`} />
            </div>
            <p className={`temp ${tempUnit == "c" ? "temp-c": "temp-f"}`}>{getConvertedTemp(tempUnit, temp)}</p>
            <p className="conditions">{weatherDes}</p>
        </Fragment>
    )
}

export const WeekleyBlock = (props) => {

    const {tempUnit, weeklyWeather, onSelect} = props;
    return (<div id="future" className="wrapper">
    {
        weeklyWeather.map((eachDay, index) => {
            const key = `temp-${index}`;
            const {maxTemp, minTemp, icon, weatherDes, dt} = eachDay;
            const day = dayMapper[new Date(dt).getDay()]
            return (
                <div key = {key} className="container" onClick = {() => {onSelect(index)}}>
                    <h3 className="day">{day}</h3>
                    <div className="weatherIcon">
                        <img src={`http://openweathermap.org/img/w/${icon}.png`} />
                    </div>
                    <p className="conditions">{weatherDes}</p>
                    <p className="tempRange"><span className="high">{getConvertedTemp(tempUnit, maxTemp)}</span> | <span className="low">{getConvertedTemp(tempUnit, minTemp)}</span></p>
                </div>
            )
        })
    } </div>)
}

export const DetailedWeatherDialog = (props) => {
    const {onclose, details, tempUnit} = props;
    const {dt, icon, maxTemp, minTemp, weatherDes, pressure, humidity, windDir, windSpeed} = details;
    const closeConf = {
        className: "close",
        onClick: () => {
            onclose()
        }
    }
    return(
        <div id="modal" className="modal modal__bg modal--active" role="dialog" aria-hidden="true">
        <div className="modal__dialog">
			<div className="modal__content modal__content--active">
				<h2>{getFormatedDate(new Date(dt))}</h2>
				<div class="detail-container">
                    <div className="icon-block" >
                        <img src={`http://openweathermap.org/img/w/${icon}.png`} />
                        <p className="conditions">{weatherDes}</p>
                        <p className="tempRange"><span className="high">{getConvertedTemp(tempUnit, maxTemp)}</span> | <span className="low">{getConvertedTemp(tempUnit, minTemp)}</span></p>
                    </div>
                    <div className="info-block">
                        <p>Pressure: {Math.round(pressure)}</p>
                        <p>Humidity: {Math.round(humidity)}</p>
                        <p>WindSpeed: {Math.round(windSpeed)}Mph</p>
                        <p>Direction: {convertWindToDir(Math.round(windDir))}</p>
                    </div>
                </div>
                <button {...closeConf} ><i className="fa fa-times" aria-hidden="true"></i></button>
            </div>
		</div>
        </div>
    )
}