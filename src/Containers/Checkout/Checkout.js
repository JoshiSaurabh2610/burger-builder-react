import React, { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import classes from './checkout.module.css';
import Button from '../../Components/UI/Button/Button';
import Spinner from "../../Components/UI/Spinner/Spinner";
import ContactData from "./Contact-data/Contact-data";
import { Route } from "react-router";
import axios from "../../axios-orders";


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
        this.props.history.goBack();
    }

    OrderNowHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredient: this.state.ingredients,
            price: this.state.TotalPrice,
            customer:{
                'name':'Saurabh Joshi',
                address:{
                    streetNo:'04',
                    area:'vijayPark,Maujpur',
                    zipCode:'110053',
                    Landmark:'near Shiv Mandir'
                },
                email:'joshisaurabh2610@gmail.com'
            },
            deliveryMethod:'fastest'
        }
       axios.post('/orders.json',order).then(
           response=>{
            //    console.log(response);
                this.setState({loading:false})
                this.props.history.replace('/burgers');
           }
       ).catch(
           error=>{
                this.setState({loading:false})
           }
       )
    }


    render(){
        let TotalPrice=10;
        let tablerow=null;
        if(this.state.ingredients)
            tablerow=Object.entries(this.state.ingredients).map(([item,count])=>{
                // console.log(key,val);
                const price=count*INGREDIENT_PRICE[item]
                TotalPrice+=price;
                return (<tr key={item+count+price}>
                            <td>{item}</td>
                            <td>{count}</td>
                            <td>{price}</td>
                        </tr>)
            })
        return(
            <div className={classes.Checkout}>
                <h1>Hope its Tastes Well!</h1> 
                {this.state.ingredients ? <Burger ingredients={this.state.ingredients} />:<Spinner/>}
                <div className={classes.TableSummary}>
                    <h4>Ingredient Table</h4>
                    <table className={classes.ingredientTable}>
                        {/* <caption>Check out Burger Once</caption> */}
                        <thead>
                            <tr>
                                <th>Ingredients</th>
                                <th>Count</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablerow}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan="2">Total Cost</th>
                                <th>10+{TotalPrice-10}={TotalPrice}</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <Button 
                    btnType="Danger"
                    clicked={this.CancelHandler}>Cancel</Button>

                <Button 
                    btnType="Sucess"
                    clicked={this.ContinueToContactData}>Continue</Button>

                <Route path={this.props.match.path+'/contact-data'} render={()=><ContactData Continue={this.OrderNowHandler} />} />
            </div>
        )
    }
}
export default Checkout; 