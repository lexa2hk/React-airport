import React, { useState } from "react";
import './styles/app.css'
import StateList from "./components/StateList";
import MainButton from "./components/UI/button/MainButton";
import axios from "axios";
import Reservation from "./components/Reservation";
import FlightList from "./components/FlightList";
import MainFrame from "./components/MainFrame";


function App() {

    return (
        <div className="App-wrapper">

            <div className="header">
                <p>PlaneSale</p>
            </div>

            <MainFrame/>
            
        </div>
  );
}

export default App;
