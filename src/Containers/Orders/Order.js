import classes from './Order.module.css';
import React, { Component } from 'react'
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions';
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component{
    componentDidMount(){
        this.props.orderFetch(this.props.token);
    }

    render(){
        let fetchedOrders=<div className={classes.Orders}>
                            {
                                this.props.orders.map(item=>{
                                    return <Order key={item.id} itemDetails={item} />
                                })
                            }
                        </div>
        if(this.props.loading){
            fetchedOrders=<Spinner/>
        }
        return fetchedOrders;
    }
};

const mapStateToProps=state=>{
    return{
        loading:state.order.loading,
        orders:state.order.orders,
        token:state.auth.idToken,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        orderFetch: (token)=>dispatch(actions.orderFetch(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));