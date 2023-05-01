import React, {useEffect, useState} from 'react';
import StatePost from "./StatePost";
import mainButton from "./UI/button/MainButton";

const MessageList = () => {
    // let state = {
    //     error: null,
    //     isLoaded: false,
    //     items: []
    // };


    let [state, setState] = useState([{
        error: null,
        isLoaded: false,
        items: []
    }
    ]);

    const headers = {
        'Authorization':'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjgyMTg2Mjg2LCJleHAiOjE2ODIyMjIyODZ9.PeO4z72bqFOt5qk8o86IwPuEx6Wo_HDpEB7jjfsD62o'
    }


    useEffect(() => {
        setInterval(() => {
            console.log('componentDidMount');
            fetch("http://localhost:8080/message/getMessages",{headers:headers})
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
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
        }, 3000);

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
        return (
            <div className="states">
                <h3>Message Log</h3>
                <ul>
                    {state.items.reverse().slice(0,12).map(item => (
                        <li>{item.message}</li>
                    ))}
                </ul>
            </div>
        );

    }

};

export default MessageList;