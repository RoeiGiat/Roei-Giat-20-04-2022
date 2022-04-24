import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForeCastWeather from './ForeCastWeather';
import { connect } from 'react-redux'

function Home(props) {
    const [location, setLocation] = useState({ Country: { LocalizedName: "" } })
    const [currentWeather, satCurrentWeather] = useState({ Temperature: { Imperial: { Value: "" } }, IsDayTime: false })
    const [forecastWeather, setForecastWeather] = useState({ DailyForecasts: [{ EpochDate: "", Temperature: { Maximum: { Value: "" }, Minimum: { Value: "" } }, Day: { IconPhrase: "" }, Night: { IconPhrase: "" } }] })
    const [weatherValue, setWeatherValue] = useState("°F")
    const [refresh, doRefresh] = useState(false)
    const apiKey = "ykyLic1ngBSdr2zt9XCVdkX4AAAoivEE"
    let keySearch = props.cityName

    useEffect(() => {
        async function fetchData() {
            props.isLoaded ? console.log("already loaded") : keySearch = await CityByGeolocation();
            CityByKeySearch();
        }
        fetchData();
    }, [refresh]);


    const CityByGeolocation = async () => {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(async function (position) {
                let userGeolocation = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%09${apiKey}&q=${position.coords.latitude}%20%2C%20${position.coords.longitude}%20`);
                resolve(userGeolocation.data.LocalizedName)
            })
        })
    }

    const CityByKeySearch = async () => {
        let locationDetails = await axios.get(`http://dataservice.accuweather.com/locations/v1/search?q=${keySearch}&apikey=${apiKey}`);
        if (locationDetails.data.length >= 1) {
            setLocation(locationDetails.data[0])
            let currentWeather = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationDetails.data[0].Key}?apikey=${apiKey}`);
            satCurrentWeather(currentWeather.data[0])
            let forecastWeather = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationDetails.data[0].Key}?apikey=${apiKey}`);
            setForecastWeather(forecastWeather.data)
        }
        else {
            alert(`${props.cityName} not found please try again`)
        }
    }

    const ConvertToCelsius = (F) => {
        return `${Math.round((F - 32) * 5 / 9)}${weatherValue} `
    }

    const IsFahrenheit = (value) => {
        return weatherValue == "°F" ? `${value}${weatherValue}` : ConvertToCelsius(value)
    }

    const IsAlreadyExists = () => {
        return props.favorites.filter(favorite => favorite.id == location.Key).length >= 1
    }
    const AddOrRemove = () => {
        IsAlreadyExists() ? props.RemoveFavorite(location.Key) : props.AddFavorite({ id: location.Key, name: location.LocalizedName, currentWeather: degrees, description: currentWeather.WeatherText })
        alert("Done!")
    }

    let forecastWeatherList = forecastWeather.DailyForecasts.map((day, index) => <ForeCastWeather max={IsFahrenheit(day.Temperature.Maximum.Value)} min={IsFahrenheit(day.Temperature.Minimum.Value)} description={currentWeather.IsDayTime ? day.Day.IconPhrase : day.Night.IconPhrase} day={day.EpochDate} key={index} />)
    let degrees = IsFahrenheit(currentWeather.Temperature.Imperial.Value)

    return (
        <div className="home">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <br /><br />
            <div className="search">
                <input type="text" placeholder="Search for city" onChange={(e) => props.SaveCityName(e.target.value)} />
                <input type="button" value="Search" onClick={() => { doRefresh(!refresh); props.StopGeolocation() }} />
                <select onChange={(e) => { setWeatherValue(e.target.value) }}>
                    <option value='°F'> °F </option>
                    <option value='°C' > °C </option>
                </select>
            </div>
            <br /><br />

            <div className="weather">
                <div className="space">
                    <div>
                        <h3> {location.LocalizedName}, {location.Country.LocalizedName} </h3>
                        <h3> {degrees}</h3>
                    </div>
                    <div className="favorites"><h3 onClick={() => { AddOrRemove() }}> Add Or Remove Favorites</h3></div>
                </div>
                <br /><br /> <br />

                <div className="large"> <div className="fa fa-cloud"> </div> </div>
                <div className="disperse">
                    <div className="large"> <div className="fa fa-cloud"> </div> </div>
                    <div className="large"> <div className="fa fa-cloud"> </div> </div>
                </div>

                <br /> <br /> <br /><br />
                <div className="space" >
                    {forecastWeatherList}
                </div>
                <br /><br />
            </div>
            <br />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
        cityName: state.cityName,
        isLoaded: state.isLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddFavorite(newFavorite) {
            dispatch({
                type: "ADD_FAVORITE",
                payload: newFavorite
            })
        },
        RemoveFavorite(id) {
            dispatch({
                type: "REMOVE_FAVORITE",
                payload: id
            })
        },
        SaveCityName(cityName) {
            dispatch({
                type: "SAVE_CITY",
                payload: cityName
            })
        },
        StopGeolocation() {
            dispatch({
                type: "STOP_GEOLOCATION",
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
