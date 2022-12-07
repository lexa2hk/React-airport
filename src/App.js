import React, { useState } from "react";
import './styles/app.css'
import StateList from "./components/StateList";
import MainButton from "./components/UI/button/MainButton";
import axios from "axios";
import MessageList from "./components/MessageList";
import FlightList from "./components/FlightList";




function App() {

    return (
        <div className="App-wrapper">

            <div className="header">
                <p>Virtual Airport</p>
            </div>

            <div className="container">
                <div className="box-1">
                    <div className="containerA">
                        <div className="airport-scheme">
                            <img className="airport-image" src={require('./images/airport.jpg')} alt=""/>
                        </div>
                        <MessageList/>
                    </div>

                </div>
                <div className="box-2">
                    <FlightList/>
                </div>
            </div>



        </div>
  );
}

export default App;
