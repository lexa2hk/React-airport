import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";

const headers = {
    'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjgyOTc1MTA5LCJleHAiOjE2ODMwMTExMDl9._XQ57FwbiATrYbG-UULZY_Aips6vQyyPHZmFIMLQ1Nc'
}

const FlightList = (props) => {
    let cookies = new Cookies();
    let [state, setState] = useState([{
        error: null,
        isLoaded: false,
        items: []
    }
    ]);

    useEffect(function work() {
        let timerId;

        timerId =setTimeout(() => {
            fetch("http://localhost:8080/aircraft/getAll",{headers:
                    {
                        'Authorization':'Bearer '+cookies.get('Bearer')
                    }
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setState({
                            error: null,
                            isLoaded: true,
                            items: result
                        });
                    },
                    (error) => {
                        setState({
                            error: error,
                            isLoaded: true,
                            items: []
                        });
                    }
                );
            timerId = setTimeout(work, 5000);
        },5000)

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
    else {

        const arr = state.items.map(item => (
            <tr>
                <td className="tg-0lax">{item.flightcode}</td>
                <td className="tg-0lax">{item.city}</td>
                <td className="tg-0lax">{item.status}</td>
                <td className="tg-0lax"> {item.aircraftmodel}</td>

            </tr>
        ));
        return(
            <div>

                <h1 className="headerTable">Flight List</h1>
                <table className="tg">
                    <thead>
                    <tr>
                        <th className="tg-0lax">Code</th>
                        <th className="tg-0lax">City</th>
                        <th className="tg-0lax">Status</th>
                        <th className="tg-0lax">Model</th>
                    </tr>
                    </thead>
                    {arr}
                </table>

            </div>
        );
    }

}

export default FlightList;