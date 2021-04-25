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
        loading:false,
        error:false,
    }
    componentDidMount(){
        // axios.get('https://burger-builder-react-2642b-default-rtdb.firebaseio.com/ingredients.json').then(
        //     res=>{
        //         // console.log(res);
        //         let TotalPrice = Object.keys(res.data).reduce((acc,item)=>{
        //             return acc+INGREDIENT_PRICE[item]*res.data[item];
        //         },10)
        //         // console.log(TotalPrice);
        //         this.setState({ingredient:res.data,TotalPrice:TotalPrice});
        //     }
        // ).catch(
        //     err=>{
        //         this.setState({error:true})
        //     }
        // )
    }
    orderNowHandler=()=>{
        this.setState({orderNow:true});
    }
    cancelOrderHandler=()=>{
        this.setState({orderNow:false});
    }
    continueOrderHandler=()=>{
        let queryParam=[];
        for(let i in this.props.ingredients){
            queryParam.push(`${i}=${this.props.ingredients[i]}`)
        }
        const queryParamString=queryParam.join("&");
        // console.log(queryParamString);
        this.props.history.push({
            pathname: this.props.match.path+'/checkout',
            search:queryParamString
        })
    }
    render(){
        let order=null;
        let burger=this.state.error ? <p style={{textAlign:'center','marginTop':'100px'}}>
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
        if(this.state.loading){
            order=<Spinner />
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
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        addIngredientHandler: (type)=>dispatch(actionCreator.addIngredientHandler(type)),
        removeIngredientHandler:(type)=>dispatch(actionCreator.removeIngredientHandler(type)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));