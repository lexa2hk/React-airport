import React from 'react';
import classes from './MainInput.module.css';

const MainInput = (props) => {
    return (
        <div>
            <input className={classes.MainInput} {...props}/>
        </div>
    );
};

export default MainInput;