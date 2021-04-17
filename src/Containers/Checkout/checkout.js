import React, { Component } from 'react'
import { Route } from 'react-router';
import CheckoutSummary from '../../Components/Order/checkoutSummary/checkoutSummary';
import ContactData from './Contact-Data/contactData'
class Checkout extends Component{
    state={
        ingredient:null,
        TotalPrice:0,
    };

    componentWillMount(){
        const  query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let Price=0;
        for(let param of query){
            if(param[0]==='price'){
                Price=param[1];
            }
            else ingredients[param[0]]= +param[1];
        };
        // console.log(ingredients);
        this.setState({ingredient:ingredients,TotalPrice:Price});
    }

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
                    ingredients={this.state.ingredient}
                    cancelHandler={this.cancelHandler}
                    continueHandler={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path+'/contact-data'}
                    render={(props)=><ContactData 
                                ingredient={this.state.ingredient}
                                price={this.state.TotalPrice}
                                {...props}/>}/>
            </div>
        )
    }
};
export default Checkout;