import React from 'react'
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Button from '../UI/Button/Button';
const OrderSummary=(props)=>{
    let listItems=Object.keys(props.ingredient).map(item=>{
        return <li key={item}>{item}: {props.ingredient[item]}</li>
    })
    return(
        <Aux>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {listItems}
            </ul>
            <p>Total Price: <strong>{props.totalPrice}</strong></p>
            <Button btnType="Danger" clicked={props.clicked}>CANCEL</Button>
            <Button btnType="Sucess" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    );
};
export default OrderSummary;