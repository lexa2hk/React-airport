import React, {useEffect, useState} from 'react';
import StatePost from "./StatePost";
import mainButton from "./UI/button/MainButton";
import Reservation from "./Reservation";
import FlightList from "./FlightList";
import AuthForm from "./AuthForm";
import Cookies from 'universal-cookie';
import Cart from "./Cart";


const MainFrame = () => {
    //todo: fix checking if user is aurthorized when loading page
    const cookies = new Cookies();


    let [state, setState] = useState([{
        error: null,
        isLoaded: false,
        isAuthenticated: false,
        bearer: 'Bearer ' + cookies.get('Bearer')
    }
    ]);

    const handleBearer = (bearer) => {
        // if(bearer.split(' ')[0] === 'Bearer'){
        //     bearer = bearer.split(' ')[1];
        // }
        setState({
            ...state,
            isAuthenticated: true,
            bearer: 'Bearer '+bearer
        });
    }


    // let [bearer, setBearer] = useState('');

    useEffect(() => {

        var myHeaders = new Headers();
        console.log('Bearer '+cookies.get('Bearer'));
        myHeaders.append("Authorization", 'Bearer '+cookies.get('Bearer'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/ping", requestOptions)
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


    function handleLogoutButton() {
        cookies.remove('Bearer');
        setState({
            ...state,
            isAuthenticated: false
        });
    }

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
            <div>
                <button onClick={handleLogoutButton}>logout</button>
                <div className="container">

                    <div className="box-1">
                        <div className="containerA">
                            <div className="airport-scheme">
                                <img className="airport-image" src={require('../images/airport.jpg')} alt=""/>
                            </div>


                        </div>
                        <Reservation/>
                        <div>
                            <p>Your cart</p>
                            <Cart/>
                        </div>

                    </div>
                    <div className="box-2">
                        <FlightList bearer={state.bearer}/>
                    </div>
                </div>
            </div>
        );

    }

};

export default MainFrame;