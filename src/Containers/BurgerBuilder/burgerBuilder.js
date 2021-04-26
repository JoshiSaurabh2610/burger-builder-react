import axios from "../../axios-orders";
import { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Model from "../../Components/UI/Model/Model";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from '../../store/actions';

class BurgerBuilder extends Component{    
    state={
        orderNow:false,
    }

    componentDidMount(){
        this.props.initIngredient();
    }

    orderNowHandler=()=>{
        this.setState({orderNow:true});
    }
    cancelOrderHandler=()=>{
        this.setState({orderNow:false});
    }
    continueOrderHandler=()=>{
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    }
    render(){
        // console.log(this.props.ingredient);
        let order=null;
        let burger=this.props.error ? <p style={{textAlign:'center','marginTop':'100px'}}>
                                        Application broken ingredient can't be loadded sorry for inconvinence</p>
                                    :<Spinner/>
        if(this.props.ingredient){
            burger=(
                <Aux>
                    <Burger
                    ingredients={this.props.ingredient}/>
                    <BuildControls
                        TotalPrice={this.props.TotalPrice}
                        ingredients={this.props.ingredient}
                        More={this.props.addIngredientHandler}
                        Less={this.props.removeIngredientHandler}
                        orderNow={this.orderNowHandler}/>
                </Aux>);
            order=<OrderSummary
                    totalPrice={this.props.TotalPrice}
                    ingredient={this.props.ingredient}
                    clicked={this.cancelOrderHandler}
                    continue={this.continueOrderHandler}/>
        }
        return(
            <Aux>
                <Model 
                    show={this.state.orderNow}
                    cancel={this.cancelOrderHandler}>
                    {order}
                </Model>
                {burger}
            </Aux>
        )
    }
};

const mapStateToProps=state=>{
    return{
        ingredient: state.burgerBuilder.ingredients,
        TotalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        addIngredientHandler: (igName)=>dispatch(actions.addIngredient(igName)),
        removeIngredientHandler: (igName)=>dispatch(actions.removeIngredient(igName)),
        initIngredient: ()=>dispatch(actions.initIngredient()),
        purchaseInit: ()=>dispatch(actions.purchaseInit()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));