import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import classes from './checkout.module.css';
import Button from '../../Components/UI/Button/Button';
import Spinner from "../../Components/UI/Spinner/Spinner";
import ContactData from "./Contact-data/Contact-data";
import { Route } from "react-router";
import IngredientTable from "../../Components/IngredientTable/IngredientTable";


const INGREDIENT_PRICE={
    'Salad':10,
    'Bacon':50,
    'Meat':70,
    'Cheese':15        
};

class Checkout extends Component{
    state={
        ingredients:null,
        TotalPrice:10,
        loading:false,
    }
    componentDidMount(){
        let ingredient={};
        // console.log(this.props);
        const Query= new URLSearchParams(this.props.location.search);
        let price=10;
        for(let i of Query){
            // console.log(i);
            ingredient[i[0]]=i[1]
            price+=INGREDIENT_PRICE[i[0]]*i[1];
        }
        this.setState({ingredients:ingredient,TotalPrice:price})
    }

    ContinueToContactData=()=>{
        console.log('hello');
        this.props.history.push(this.props.match.path+'/contact-data');
    }

    CancelHandler=()=>{
        console.log(this.props);
        this.props.history.replace('/burgers');
    }

    render(){
        const burger=(
            <div className={classes.Burger}>
                 <Burger ingredients={this.state.ingredients} />
            </div>
        )
        return(
            <div className={classes.Checkout}>
                <h1>Hope its Tastes Well!</h1> 
                {this.state.ingredients ? burger :<Spinner/>}
                <div className={classes.TableSummary}>
                    <h4>Ingredient Table</h4>
                    <IngredientTable ingredients={this.state.ingredients} />
                </div>

                <Button 
                    btnType="Danger"
                    clicked={this.CancelHandler}>Cancel</Button>

                <Button 
                    btnType="Sucess"
                    clicked={this.ContinueToContactData}>Continue</Button>

                <Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData {...props} 
                                                                                        ingredients={this.state.ingredients}
                                                                                        TotalPrice={this.state.TotalPrice} 
                                                                                        Cancel={this.CancelHandler} />} />
            </div>
        )
    }
}
export default Checkout; 