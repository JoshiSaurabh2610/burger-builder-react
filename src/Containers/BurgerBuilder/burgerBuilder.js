import { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
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
            Salad:1,
            Bacon:1,
            Cheese:1,
            Meat:0
        },
        TotalPrice:0.7,
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
        let newTotalPrice=this.state.TotalPrice-INGREDIENT_PRICE[type];
        this.setState({ingredient:updatedIngredient,TotalPrice:newTotalPrice})
    }
    render(){
        return(
            <Aux>
                <Burger
                ingredients={this.state.ingredient}/>
                <BuildControls
                ingredients={this.state.ingredient}
                More={this.addIngredientHandler}
                Less={this.removeIngredientHandler}/>
            </Aux>
        )
    }
};
export default BurgerBuilder;