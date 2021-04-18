import { Component } from "react";
import Burger from "../../Components/Burger/Burger";
import classes from './checkout.module.css';
import Button from '../../Components/UI/Button/Button';
import Spinner from "../../Components/UI/Spinner/Spinner";

const INGREDIENT_PRICE={
    'Salad':10,
    'Bacon':50,
    'Meat':70,
    'Cheese':15        
};

class Checkout extends Component{
    state={
        ingredients:null
    }
    componentDidMount(){
        let ingredient={};
        // console.log(this.props);
        const Query= new URLSearchParams(this.props.location.search);
        for(let i of Query){
            // console.log(i);
            ingredient[i[0]]=i[1]
        }
        this.setState({ingredients:ingredient})
    }

    ContinueToContactData(){
        
    }

    render(){
        let TotalPrice=35;
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
                                <th>35+{TotalPrice-35}={TotalPrice}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <Button 
                    btnType="Sucess"
                    clicked={this.ContinueToContactData}>Continue</Button>
                
            </div>
        )
    }
}
export default Checkout; 