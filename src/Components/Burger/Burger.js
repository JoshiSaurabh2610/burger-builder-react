import React, { Component } from 'react'
// import Aux from '../../hoc/Auxilliary/Auxilliary'
import Ingredients from './Ingredients/ingredient'
import classes from './Burger.module.css'

class Burger extends Component{
    render(){
        // console.log(this.props.ingredients);
        let items=Object.keys(this.props.ingredients).map((igkey)=>{
            return [...Array(this.props.ingredients[igkey])].map((_,i)=>{
                // console.log(igkey); 
                return <Ingredients 
                        key={igkey+i} 
                        type={igkey} />
            })
        }).reduce((acc,curr)=>{
            return acc.concat(curr);
        },[])
        // console.log(items);

        if(items.length==0){
            items=<h5 style={{'margin':'0px'}}>Please Add Something</h5>
        }
        return(
            <div className={classes.BurgerIngredient}>
                <Ingredients
                type="BreadTop"/>
                {items}              
                <Ingredients
                type="BreadBottom"/>
            </div>
        );
    };
};

export default Burger;