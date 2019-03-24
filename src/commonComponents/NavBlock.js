import React, {Component} from 'react';
import { getCurrentLocation } from '../utils';

export default class NavBlock extends Component{
    render(){
        const {tempUnit, onTempUnitChange, onLocationChange, updateStatus, onReload} = this.props;
        const locateButtonConfig = {
            id: "locateBtn",
            onClick: () => {
                updateStatus({type: "", msg: "Locating..."})
                getCurrentLocation((latitude, longitude, status)=>{
                    onLocationChange(latitude, longitude, status)
                });
            }
        }
        const unitBtnConfig = {
            id: "unitBtn",
            onClick: () => {
                let swapUnit = tempUnit == "c" ? "f" : "c";
                onTempUnitChange(swapUnit);
            }
        }
        return(
            <nav>
                <button {...locateButtonConfig} >
                    <i className="fa fa-location-arrow" aria-hidden="true"></i>
                </button>
                <button {...unitBtnConfig}>{tempUnit}</button>
                <button id="locateBtn" onClick = {onReload} >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
		    </nav>
        )
    }
}

