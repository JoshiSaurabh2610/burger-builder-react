import React from 'react'
import classes from './IngredientTable.module.css'
const INGREDIENT_PRICE={
    'Salad':10,
    'Bacon':30,
    'Meat':40,
    'Cheese':15        
}

const IngredientTable = (props)=>{
    let TotalPrice=10;
    let tablerow=null;
    if(props.ingredients)
        tablerow=Object.entries(props.ingredients).map(([item,count])=>{
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
        <table className={classes.ingredientTable}>
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
    );
};

export default IngredientTable;