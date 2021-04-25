import axios from "../../axios-orders";
import { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Model from "../../Components/UI/Model/Model";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./BurgerBuilder.module.css";
import { connect } from "react-redux";

import * as actionCreator from '../../store/actions';

class BurgerBuilder extends Component{
    state={
        orderNow:false,
    }
    componentDidMount(){
        this.props.initBurgerIngredient();
        this.props.PurchaseStart();
    }
    orderNowHandler=()=>{
        this.setState({orderNow:true});
    }
    cancelOrderHandler=()=>{
        this.setState({orderNow:false});
    }
    continueOrderHandler=()=>{
        this.props.PurchaseStart();
        this.props.history.push(this.props.match.path+'/checkout')
    }
    render(){
        let order=null;
        let burger=this.props.error ? <p style={{textAlign:'center','marginTop':'100px'}}>
                                        Application broken ingredient can't be loadded sorry for inconvinence</p>
                                    :<Spinner/>
        if(this.props.ingredients){
            burger=(
            <Aux>
                <div className={classes.Burger}>
                    <Burger
                    ingredients={this.props.ingredients}/>
                </div>
                <BuildControls
                    TotalPrice={this.props.TotalPrice}
                    ingredients={this.props.ingredients}
                    More={this.props.addIngredientHandler}
                    Less={this.props.removeIngredientHandler}
                    orderNow={this.orderNowHandler}/>
            </Aux>);
            order=<OrderSummary
                    totalPrice={this.props.TotalPrice}
                    ingredient={this.props.ingredients}
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

const mapStateToProps=(state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        TotalPrice:state.burgerBuilder.TotalPrice,
        error:state.burgerBuilder.error,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        addIngredientHandler: (type)=>dispatch(actionCreator.addIngredientHandler(type)),
        removeIngredientHandler:(type)=>dispatch(actionCreator.removeIngredientHandler(type)),
        initBurgerIngredient:()=>dispatch(actionCreator.initBurgerIngredient()),
        PurchaseStart: ()=>dispatch(actionCreator.PurchaseStart()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));