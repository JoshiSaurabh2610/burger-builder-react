import axios from "../../axios-orders";
import { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Model from "../../Components/UI/Model/Model";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        ingredient:null,
        TotalPrice:10,
        orderNow:false,
        loading:false,
        error:false,
    }
    componentDidMount(){
        axios.get('https://burger-builder-react-2642b-default-rtdb.firebaseio.com/ingredients.json').then(
            res=>{
                // console.log(res);
                let TotalPrice = Object.keys(res.data).reduce((acc,item)=>{
                    return acc+INGREDIENT_PRICE[item]*res.data[item];
                },10)
                // console.log(TotalPrice);
                this.setState({ingredient:res.data,TotalPrice:TotalPrice});
            }
        ).catch(
            err=>{
                this.setState({error:true})
            }
        )
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
    // this.setState({loading:true});
    //     const order={
    //         ingredient: this.state.ingredient,
    //         price: this.state.TotalPrice,
    //         customer:{
    //             'name':'Saurabh Joshi',
    //             address:{
    //                 streetNo:'04',
    //                 area:'vijayPark,Maujpur',
    //                 zipCode:'110053',
    //                 Landmark:'near Shiv Mandir'
    //             },
    //             email:'joshisaurabh2610@gmail.com'
    //         },
    //         deliveryMethod:'fastest'
    //     }
    //    axios.post('/orders.json',order).then(
    //        response=>{
    //         //    console.log(response);
    //         this.setState({loading:false,orderNow:false})
    //        }
    //    ).catch(
    //        error=>{
    //             this.setState({loading:false,orderNow:false})
    //        }
    //    )
        let queryParam=[];
        for(let i in this.state.ingredient){
            queryParam.push(`${i}=${this.state.ingredient[i]}`)
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
        if(this.state.ingredient){
            burger=(
            <Aux>
                <Burger
                ingredients={this.state.ingredient}/>
                <BuildControls
                    TotalPrice={this.state.TotalPrice}
                    ingredients={this.state.ingredient}
                    More={this.addIngredientHandler}
                    Less={this.removeIngredientHandler}
                    orderNow={this.orderNowHandler}/>
            </Aux>);
            order=<OrderSummary
                    totalPrice={this.state.TotalPrice}
                    ingredient={this.state.ingredient}
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
export default withErrorHandler(BurgerBuilder,axios);