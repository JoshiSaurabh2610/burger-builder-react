import React from 'react'
import classes from './BuildControl.module.css'
const buildControl=(props)=>{
    let disable= !props.count;
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} disabled={disable} onClick={()=>props.Less(props.label)}> Less </button>
            <div className={classes.Number}>{props.count}</div>
            <button className={classes.More} onClick={()=>props.More(props.label)}> More </button>
        </div>
    );
};

export default buildControl;