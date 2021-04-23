import classes from './Order.module.css';
import React, { Component } from 'react'
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component{

    state={
        orders:[],
        loading:true,
    }

    componentDidMount(){
        axios.get('/orders.json').then(
            res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({loading:false,orders:fetchedOrders});
            }
        ).catch(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div className={classes.Orders}>
                {
                    this.state.orders.map(item=>{
                        return <Order key={item.id} itemDetails={item} />
                    })
                }
            </div>
        );
    }
};
export default Orders;