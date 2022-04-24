import React from 'react';

const ForeCastWeather = (props) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"]

    const GetDay = () => {
        return days[((Math.floor(props.day / 86400) + 4) % 7)]
    }

    return (
        <div className="border">
            <b> {GetDay()}</b>  <br />
            <div className="green">    <b> {props.max}</b>  </div> < br />
            <b> {props.description}</b>   <br />
            <div className="red">    <b> {props.min}</b> </div> < br /> <br />
        </div >
    );
};

export default ForeCastWeather;