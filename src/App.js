import React, { useState } from "react";
import './styles/app.css'
import StateList from "./components/StateList";
import MainButton from "./components/UI/button/MainButton";
import axios from "axios";




function App() {
    const [states, setStates] = useState([
        {text: '123'},
        {text: '1234'},
        {text: '12345'},
        {text: '123456'},
        {text: '1234567'}
    ])



    const promiseAPI = () => {
        const promise = axios.get('https://jsonplaceholder.typicode.com/todos/1')
        const dataPromise = promise.then((response)=>response.data)
        return dataPromise
    }

    const addNewState = () => {
        promiseAPI()
            .then(data =>{
                // const result = JSON.parse(data)
                console.log(data.title)
                setStates([...states, {text: data.title}])
            })
        console.log(states)
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

            <MainButton onClick={addNewState}>GET</MainButton>
        </div>
  );
}

export default App;
