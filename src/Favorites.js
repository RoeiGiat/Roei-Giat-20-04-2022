import React from 'react';
import { connect } from 'react-redux'
import './App.css';

const Favorites = (props) => {
    return (
        <div >
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="favoritesBorder" onClick={() => { props.SaveCityName(props.favorite.name); props.callback() }}>
                <h3>{props.favorite.name}</h3>
                <h3>{props.favorite.currentWeather}</h3>
                <h3>{props.favorite.description}</h3>
            </div>

        </div>

    );
};
const mapStateToProps = state => {
    return {
        favorites: state.favorites,
        cityName: state.cityName
    }
}
const mapDispatchToProps = dispatch => {
    return {
        SaveCityName(cityName) {
            dispatch({
                type: "SAVE_CITY",
                payload: cityName
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);