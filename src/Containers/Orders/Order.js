import classes from './Order.module.css';
import React, { Component } from 'react'
import Order from '../../Components/Order/Order';

class Orders extends Component{
    render(){
        return(
            <div className={classes.Orders}>
                <Order/>
                <Order />
            </div>
        );
    }
};
export default Orders;