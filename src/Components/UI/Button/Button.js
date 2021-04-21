import classes from './Button.module.css'
import React from 'react'
const Button=(props)=>(
    <button
        className={[classes.Button,classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        disabled={props.disable}>{props.children}</button>
);
export default Button; 