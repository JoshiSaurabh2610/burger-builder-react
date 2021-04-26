import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
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
        let summary = <Redirect to="/burgers" />
        
        if(this.props.ingredient){
            const purchasedRedirect= this.props.purchased ? <Redirect to ='/burgers'/>:null;
            summary=( 
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingredient}
                        cancelHandler={this.cancelHandler}
                        continueHandler={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
};

const mapStateToProps=(state)=>{
    return{
        ingredient:state.burgerBuilder.ingredients, 
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);