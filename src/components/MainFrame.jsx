import React, {useEffect, useState} from 'react';
import StatePost from "./StatePost";
import mainButton from "./UI/button/MainButton";
import MessageList from "./MessageList";
import FlightList from "./FlightList";
import AuthForm from "./AuthForm";
import Cookies from 'universal-cookie';


const MainFrame = () => {
    //todo: fix checking if user is aurthorized when loading page
    const cookies = new Cookies();


    let [state, setState] = useState([{
        error: null,
        isLoaded: false,
        isAuthenticated: false,
        bearer: cookies.get('Bearer')
    }
    ]);

    const handleBearer = (bearer) => {
        setState({
            ...state,
            isAuthenticated: true,
            bearer: bearer
        });
    }

    console.log(cookies.get('Bearer'));

    // let [bearer, setBearer] = useState('');

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/ping",{headers: {
            'Authorization':state.bearer
            }})
            .then((response => {
                console.log(`Request status code: ${response.status}`);
                setState({
                    ...state,
                    isLoaded: true,
                    isAuthenticated: response.status === 200
                })
            }),
                (error) => {
                    setState({
                        ...state,
                        error: error,
                        isLoaded: true,
                        isAuthenticated: false
                    });
                })
            .then(res => res.json())
    },[]);




    if(state.error) {
        return <div>Error: {state.error.message}</div>;
    }
    else if(!state.isLoaded) {
        return (
            <div>
                Loading...
            </div>

        );
    }
    else if(!state.isAuthenticated) {
        return (
            <AuthForm handleBearer={handleBearer}/>
        )
    }
    else {
        return (
            <div className="container">
                <div className="box-1">
                    <div className="containerA">
                        <div className="airport-scheme">
                            <img className="airport-image" src={require('../images/airport.jpg')} alt=""/>
                        </div>
                        <MessageList/>
                    </div>

                </div>
                <div className="box-2">
                    <FlightList/>
                </div>
            </div>
        );

    }

};

export default MainFrame;