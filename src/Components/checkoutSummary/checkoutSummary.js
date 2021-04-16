import React from 'react';
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props)=>{
    return(
        <div  className={classes.CheckoutSummary}>
            <h1>hope it tastes well</h1>
            <div style={{'width':'100%'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked={props.cancelHandler}>CANCEL</Button>
            <Button
                btnType="Sucess"
                clicked={props.continueHandler}>CONTINUE</Button>
        </div>
    )
}
export default CheckoutSummary;