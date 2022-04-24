import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider } from 'react-redux'




const reducer = (state = { favorites: [], cityName: "Tel Aviv", isLoaded: false }, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      state.favorites.push(action.payload)
      break;
    }
    case 'REMOVE_FAVORITE': {
      let index = state.favorites.findIndex(favorite => favorite.id == action.payload)
      state.favorites.splice(index, 1)
      break;
    }
    case 'SAVE_CITY': {
      return {
        ...state,
        cityName: action.payload
      };
    }
    case 'STOP_GEOLOCATION': {
      return {
        ...state,
        isLoaded: true
      };
    }
  }
  return state;
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
