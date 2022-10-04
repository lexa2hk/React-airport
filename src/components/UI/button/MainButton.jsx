import React from 'react';
import classes from "./button.module.css";

const MainButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonEl}>
            {children}
        </button>
    );
};

export default MainButton;