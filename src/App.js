import React, { useState } from "react";
import './styles/app.css'
import StateList from "./components/StateList";
import MainButton from "./components/UI/button/MainButton";
import axios from "axios";
import MessageList from "./components/MessageList";




function App() {
    const [states, setStates] = useState([

    ]);



    const promiseAPI = () => {
        return axios.get('http://localhost:8080/message/getMessages')
            .then((response)=>response.data)

    }

    const addNewState = () => {
        promiseAPI()
            .then(data =>{
                for(let i = 0; i < data.length; i++){

                    setStates([...states, data[i]]);
                }
            })
        console.log(states);
    }

    return (
        <div className="App-wrapper">

            <div className="header">
                <p>SOME HEADER</p>
            </div>

            <div className="container">
                <div className="box-1">
                    <div className="containerA">
                        <div className="airport-scheme">
                            <img className="airport-image" src={require('./images/airport.jpg')} alt=""/>
                        </div>
                        <StateList posts={states}/>
                    </div>

                </div>
                <div className="box-2">
                    table
                </div>
            </div>

            <MessageList/>

            <MainButton onClick={addNewState}>GET</MainButton>
        </div>
  );
}

export default App;
