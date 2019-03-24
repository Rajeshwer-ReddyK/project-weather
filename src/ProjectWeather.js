import React, {Component, Fragment} from 'react';
import NavBlock from './commonComponents/NavBlock';
import { TodayBlock, WeekleyBlock, DetailedWeatherDialog } from './commonComponents/WeatherBlock';
import { getCurrentWeather, getWeeklyWeather } from './actions/weatherApiActions';
import { convertCurrentWeather, convertWeeklyWeather } from './utils';
import { NotificationBar } from './commonComponents/NotificationBar';

export default class ProjectWeather extends Component{
    state={//No redux store required this is the single sorce of truth
        lat: undefined,
        lon: undefined,
        tempUnit: "c",
        currentWeather: undefined,
        weeklyWeather: undefined,
        notify: {
            type: '',
            msg: <span>Click on the <i className="fa fa-location-arrow" aria-hidden="true"></i> button to share your current location.</span>
        },
        showDetailed: undefined
    }
    componentDidMount(){
        this.invokeWeatherAPi();
    }
    componentDidUpdate(prevProps, prevSate){
        const {lat, lon} = this.state;
        if(prevSate.lat != lat || prevSate.lon != lon){
            this.invokeWeatherAPi();
        }
    }
    invokeWeatherAPi = async () => {
        const {lat, lon} = this.state;
        const currentWeatherRes = await getCurrentWeather(lat, lon)
        const weeklyWeatherRes = await getWeeklyWeather(lat, lon)
        if(currentWeatherRes.cod != 200 || weeklyWeatherRes.cod != 200){
            let errorMsg = currentWeatherRes.message ? currentWeatherRes.message : weeklyWeatherRes.message;
            this.setState({notify: {type: "error", msg: errorMsg}});
        }else{
            const currentWeather = convertCurrentWeather(currentWeatherRes);
            const weeklyWeather = convertWeeklyWeather(weeklyWeatherRes);
            this.setState({currentWeather, weeklyWeather})
        }        
    }
    render(){
        const {lat, lon, tempUnit, currentWeather, weeklyWeather, notify, showDetailed} = this.state;
        const navBlockConfig = {
            lat, lon, tempUnit,
            onTempUnitChange: (tempUnit) => {
                this.setState({tempUnit})
            },
            onLocationChange: (lat, long, status) => {
                this.setState({lat, long, notify: status});
            },
            updateStatus: (status) => {
                this.setState({notify: status});
            },
            onReload: () => {
                this.invokeWeatherAPi();
                this.setState({ notify: { type: 'success', msg: " Reloaded" } })
            }
        }
        const todayBlockConfig = {
            tempUnit, currentWeather
        }
        const weekleyBlockConf = {
            tempUnit, weeklyWeather,
            onSelect: (selectedIndex) => {
                this.setState({showDetailed: selectedIndex});
            }
        }
        const detailedConf = {
            tempUnit,
            details: showDetailed != undefined && weeklyWeather[showDetailed],
            onclose: () => {
                this.setState({showDetailed: undefined})
            }
        }
        const notifyConfig = {
            onClose: () => {
                this.setState({notify: undefined})
            }
        }

        return (
            <Fragment>
                {notify && <NotificationBar {...notifyConfig} {...notify} />}
                <div id="current" className="wrapper">
                    <NavBlock {...navBlockConfig}/>
                    {currentWeather && <TodayBlock {...todayBlockConfig} />}
                </div>
                {weeklyWeather && <WeekleyBlock {...weekleyBlockConf} />}
                {showDetailed != undefined && <DetailedWeatherDialog {...detailedConf} />}
            </Fragment>
        )
    }
}