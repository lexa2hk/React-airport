import React, {useEffect, useState} from 'react';
import StatePost from "./StatePost";
import mainButton from "./UI/button/MainButton";
import Cookies from "universal-cookie";

const Reservation = () => {
    let cookies = new Cookies();

    let [flightcode, setFlightcode] = useState('');
    let [username, setUsername] = useState('');
    let [pname, setPname] = useState('');
    let [surname, setSurname] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');


    function handleReserve() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+cookies.get('Bearer'));

        var raw = JSON.stringify({
            "flightCode": flightcode,
            "username": username,
            "name": pname,
            "surname": surname,
            "email":  email,
            "phone": phone
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/add/cart", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    function handleFlightcodeChange(event) {
        setFlightcode(event.target.value);
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);

    }

    function handlePnameChange(event) {
        setPname(event.target.value);

    }

    function handleSurnameChange(event) {
        setSurname(event.target.value);

    }

    function handleEmailChange(event) {
        setEmail(event.target.value);

    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);

    }

    return (
        <div>
            <label>
                Flightcode:
                <input type="text" value={flightcode} onChange={handleFlightcodeChange} required/>
            </label>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} required/>
            </label>
            <label>
                Name:
                <input type="text" value={pname} onChange={handlePnameChange} required/>
            </label>
            <label>
                Surname:
                <input type="text" value={surname} onChange={handleSurnameChange} required/>
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Phone:
                <input type="text" value={phone} onChange={handlePhoneChange} required />
            </label>
            <button onClick={handleReserve}>Reserve</button>
        </div>

    );

};

export default Reservation;