import React from "react";

export const NotificationBar = (props) => {
    const {type, msg, onClose}  = props;
    const closeConf = {
        className: "close",
        onClick: onClose
    }
    let icon = ''; // Set icon based on statusType
    if (type === 'error') {
        icon = <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>;
    } else if (type === 'success') {
        icon = <i className="fa fa-check-circle" aria-hidden="true"></i>;
    }
    return (
        <div id="status" className={type}>
            <p>{icon}{msg}</p>
            <button {...closeConf} ><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
    )
}


