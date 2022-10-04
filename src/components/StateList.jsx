import React from 'react';
import StatePost from "./StatePost";

const StateList = ({posts}) => {
    return (
        <div className="states">
            <h3>Команды судам</h3>
            {posts.map((states) =>
                <StatePost state={states}/>
            )}

        </div>
    );
};

export default StateList;