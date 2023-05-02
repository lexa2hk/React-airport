import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Cookies from "universal-cookie";
import {clear} from "@testing-library/user-event/dist/clear";

Cart.propTypes = {

};

function Cart(props) {

    let cookies = new Cookies();

    let [state, setState] = useState([{
        error: null,
        isLoaded: false,
        items: []
    }])

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+cookies.get('Bearer'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(state);

        fetch("http://localhost:8080/api/v1/get/cart", requestOptions)
            .then(response => response.text())
            .then(result => setState({
                ...state,
                isLoaded: true,
                items: JSON.parse(result)
            }))
            .catch(error => console.log('error', error));
    },[]);

    console.log(state.items)

    // const arr = state.items.map(item => (
    //     <li>
    //         {item.name.toString()}
    //     </li>
    function clearCart() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+cookies.get('Bearer'));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/clear/cart", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        setState({
            ...state,
            items: []
        });
    }

    function handleOrder() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+cookies.get('Bearer'));

        var raw = "";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/order", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    // ));
    if(state.isLoaded){
        return (
            <div>
                <ul>
                    {state.items.map(item => (
                        <li>
                            {item.flightCode}
                        </li>
                    ))}
                </ul>
                <button onClick={clearCart}>Clear</button>
                <button onClick={handleOrder}>Order</button>
            </div>
        );
    }else {
        return (
            <div>
                Loading...
            </div>
        );
    }


}

export default Cart;