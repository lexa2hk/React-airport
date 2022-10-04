import React from 'react';

const StatePost = (props) => {
    return (
        <div className="statePost">
            <p className="post">
                {props.state.text}
            </p>
        </div>
    );
};

export default StatePost;