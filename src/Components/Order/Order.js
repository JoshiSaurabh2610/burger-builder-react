import classes from './order.module.css';
import React from 'react'
import Burger from '../Burger/Burger';

const Order=(props)=>{
    console.log(props);
    return(
        <div className={classes.Order}>
            <Burger ingredients={props.itemDetails.ingredient} />
            <p>Price: {props.itemDetails.price}</p>
        </div>
    );
};

export default Order;