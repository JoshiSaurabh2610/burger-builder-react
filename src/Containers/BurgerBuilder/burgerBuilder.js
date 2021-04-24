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
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         ...
    //     }
    // }
    
    state={
        orderNow:false,
        loading:false,
        error:false,
    }
    componentDidMount(){
        // console.log(this.props,'HELLO');
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
        this.props.history.push('/checkout');
    }
    render(){
        // console.log(this.props.ingredient);
        let order=null;
        let burger=this.state.error ? <p style={{textAlign:'center','marginTop':'100px'}}>
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

const mapStateToProps=state=>{
    return{
        ingredient: state.ingredients,
        TotalPrice: state.totalPrice,
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        addIngredientHandler: (igName)=>dispatch({type:actionType.ADD_INGREDIENT,ingredientName:igName}),
        removeIngredientHandler: (igName)=>dispatch({type:actionType.REMOVE_INGREDIENT,ingredientName:igName}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));