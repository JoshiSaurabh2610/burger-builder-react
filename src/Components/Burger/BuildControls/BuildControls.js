import classes from './BuildControl.module.css';
import React from 'react'
import BuildControl from './BuildControl/BuildControl';


const BuildControls=(props)=>{
    return(
        <div className={classes.BuildControls}>
            {
                Object.keys(props.ingredients).map(item=>{
                    return <BuildControl
                    More={props.More}
                    Less={props.Less}
                    count={props.ingredients[item]}
                    key={item}
                    label={item}/>
                })
            }
        </div>
    );
};
export default BuildControls;