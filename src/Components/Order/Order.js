import classes from './order.module.css';
import React from 'react'

const Order=()=>{
    return(
        <div className={classes.Order}>
            <p>ingredients: salad(1)</p>
            <span>Price: 50 Rupees</span>
        </div>
    );
};

export default Order;