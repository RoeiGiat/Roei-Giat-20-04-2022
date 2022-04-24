import './App.css';
import React, { useState } from 'react';
import Home from './Home';
import Favorites from './Favorites';
import { connect } from 'react-redux';

function App(props) {

  const [menu, setMenu] = useState({ home: true });
  const [isLight, setLighting] = useState(true);

  const Lighting = (light) => {
    return light ? "light" : "dark";
  }


  let relevantComponent = menu.home ? <Home /> :
    <div className="favoritesScreen">
      <div className="disperse">
        <div className="large"> <div className="fa fa-cloud"> </div> </div>
        <div className="large"> <div className="fa fa-cloud"> </div> </div>
        <div className="large"> <div className="fa fa-cloud"> </div> </div>
      </div>
      <div className="space">{props.favorites.map(favorite => <Favorites favorite={favorite} callback={() => { setMenu({ home: true }) }} />)}  </div>
      <div className="disperse">
        <div className="large"> <div className="fa fa-cloud"> </div> </div>
        <div className="large"> <div className="fa fa-cloud"> </div> </div>
        <div className="large"> <div className="fa fa-cloud"> </div> </div>
      </div>
    </div>;
  let lighting = Lighting(isLight)
  let switchLighting = Lighting(!isLight)

  return (
    <div className={lighting}>
      <div className="menu">
        <h3> Herolo Weather Task </h3>
        <div className="buttonsBorder">
          <h4 onClick={() => { setMenu({ home: true }) }} > Home </h4>
          <h4 onClick={() => { setMenu({ home: false }) }}> Favorites </h4>
          <h5 onClick={() => setLighting(!isLight)}> {switchLighting} </h5>
        </div>
      </div >
      {relevantComponent}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { favorites: state.favorites }
}

export default connect(mapStateToProps)(App);

