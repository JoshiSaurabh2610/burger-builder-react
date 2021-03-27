import { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import Aux from "../../hoc/Auxilliary/Auxilliary";

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
        }
    }
    render(){
        return(
            <Aux>
                <Burger
                ingredients={this.state.ingredient}/>
                <div>Build Controls</div>
            </Aux>
        )
    }
};
export default BurgerBuilder;