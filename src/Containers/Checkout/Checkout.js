import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import classes from './checkout.module.css';
import Button from '../../Components/UI/Button/Button';
import ContactData from "./Contact-data/Contact-data";
import { Redirect, Route } from "react-router";
import IngredientTable from "../../Components/IngredientTable/IngredientTable";
import { connect } from "react-redux";

class Checkout extends Component{

    ContinueToContactData=()=>{
        this.props.history.push(this.props.match.path+'/contact-data');
    }

    CancelHandler=()=>{
        // console.log(this.props);
        this.props.history.replace('/burgers');
    }

    render(){
        let burger=(
            <div className={classes.Burger}>
                 <Burger ingredients={this.props.ingredients} />
            </div>
        )
        
        if(!this.props.ingredients)burger=this.props.history.push('/burgers');

        let purchasedRedirect=null;
        if(this.props.purchased) purchasedRedirect=<Redirect to='/burgers'/>

        return(
            <div className={classes.Checkout}>
                <h1>Hope its Tastes Well!</h1> 
                {burger}
                {purchasedRedirect}
                <div className={classes.TableSummary}>
                    <h4>Ingredient Table</h4>
                    <IngredientTable ingredients={this.props.ingredients} />
                </div>

                <Button 
                    btnType="Danger"
                    clicked={this.CancelHandler}>Cancel</Button>

                <Button 
                    btnType="Sucess"
                    clicked={this.ContinueToContactData}>Continue</Button>

                <Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData {...props} 
                                                                                        ingredients={this.props.ingredients}
                                                                                        TotalPrice={this.props.TotalPrice} 
                                                                                        Cancel={this.CancelHandler} />} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        TotalPrice:state.burgerBuilder.TotalPrice,
        purchased:state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout); 