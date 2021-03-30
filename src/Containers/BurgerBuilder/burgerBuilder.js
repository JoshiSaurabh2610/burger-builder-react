import { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Model from "../../Components/UI/Model/Model";
import Aux from "../../hoc/Auxilliary/Auxilliary";

const INGREDIENT_PRICE={
    'Salad':10,
    'Bacon':50,
    'Meat':70,
    'Cheese':15        
}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         ...
    //     }
    // }
    
    state={
        ingredient:{
            Salad:0,
            Bacon:0,
            Cheese:0,
            Meat:0
        },
        TotalPrice:10,
        orderNow:false,
    }
    addIngredientHandler=(type)=>{
        let updatedIngredient={
            ...this.state.ingredient
        }
        updatedIngredient[type]+=1;
        let newTotalPrice=this.state.TotalPrice+INGREDIENT_PRICE[type];
        this.setState({ingredient:updatedIngredient,TotalPrice:newTotalPrice})
    }
    removeIngredientHandler=(type)=>{
        if(this.state.ingredient[type]===0){
            return;
        }
        let updatedIngredient={
            ...this.state.ingredient
        }
        updatedIngredient[type]-=1;
        let newTotalPrice=this.state.TotalPrice - INGREDIENT_PRICE[type];
        this.setState({ingredient:updatedIngredient});
        this.setState({TotalPrice:newTotalPrice});
    }
    orderNowHandler=()=>{
        this.setState({orderNow:true});
    }
    cancelOrderHandler=()=>{
        this.setState({orderNow:false});
    }
    continueOrderHandler=()=>{
        alert('continued');
    }
    render(){
        return(
            <Aux>
                <Model 
                    show={this.state.orderNow}
                    cancel={this.cancelOrderHandler}>
                    <OrderSummary
                        totalPrice={this.state.TotalPrice}
                        ingredient={this.state.ingredient}
                        clicked={this.cancelOrderHandler}
                        continue={this.continueOrderHandler}/>
                </Model>
                <Burger
                    ingredients={this.state.ingredient}/>
                <BuildControls
                    TotalPrice={this.state.TotalPrice}
                    ingredients={this.state.ingredient}
                    More={this.addIngredientHandler}
                    Less={this.removeIngredientHandler}
                    orderNow={this.orderNowHandler}/>
            </Aux>
        )
    }
};
export default BurgerBuilder;