import React, { Component } from 'react'
import CheckoutSummary from '../../Components/checkoutSummary/checkoutSummary';
class Checkout extends Component{
    state={
        ingredient:{
            Salad:1,
            Meat:1,
            Cheese:1,
            Bacon:1,
        }
    };

    componentDidMount(){
        const  query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query){
            ingredients[param[0]]= +param[1];
        };
        console.log(ingredients);
        this.setState({ingredient:ingredients})
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
            </div>
        )
    }
};
export default Checkout;