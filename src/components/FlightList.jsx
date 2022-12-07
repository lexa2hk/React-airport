import React, {useEffect, useState} from "react";

const FlightList = () => {
    let [state, setState] = useState([{
        error: null,
        isLoaded: false,
        items: []
    }
    ]);

    useEffect(() => {
        setInterval(() => {
            fetch("http://localhost:8080/aircraft/getAll")
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
        }, 5000);

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
                <td className="tg-0lax"> {item.parkingplace}</td>
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
                        <th className="tg-0lax">Parking place</th>
                    </tr>
                    </thead>
                    {arr}
                </table>

            </div>
        );
    }

}

export default FlightList;