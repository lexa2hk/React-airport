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


    useEffect(() => {
        setInterval(() => {
            console.log('componentDidMount');
            fetch("http://localhost:8080/message/getMessages")
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