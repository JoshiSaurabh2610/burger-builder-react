import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router';
import CheckoutSummary from '../../Components/Order/checkoutSummary/checkoutSummary';
import ContactData from './Contact-Data/contactData'
class Checkout extends Component{

    cancelHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredient}
                    cancelHandler={this.cancelHandler}
                    continueHandler={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        )
    }
};

const mapStateToProps=(state)=>{
    return{
        ingredient:state.ingredients,
        price:state.totalPrice,
    }
}
export default connect(mapStateToProps)(Checkout);