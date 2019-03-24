import React, {Component} from 'react';
import ReactDom from 'react-dom';
import '../styles/index.scss'

class ProjectWeather extends Component{
    render(){
        return (
            <h1> Hello Weather </h1>
        )
    }
}

ReactDom.render(<ProjectWeather />, document.getElementById("root"));