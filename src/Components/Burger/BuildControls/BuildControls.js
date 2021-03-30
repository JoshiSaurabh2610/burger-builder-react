import classes from './BuildControl.module.css';
import React from 'react'
import BuildControl from './BuildControl/BuildControl';


const BuildControls=(props)=>{
    let Disable=true;
    if(props.TotalPrice>10)Disable=false;
    return(
        <div className={classes.BuildControls}>
            <p>Total Price: {props.TotalPrice.toFixed(2)}</p>
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
            <button className={classes.OrderButton} 
                    disabled={Disable}
                    onClick={props.orderNow}>Order Now</button>
        </div>
    );
};
export default BuildControls;