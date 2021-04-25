import * as actionsType from './actionType';
import axios from '../../axios-orders'

const OrderSucessful=(order,id)=>{
    return{
        type:actionsType.ORDER_OK,
        order:order,
        id:id,
    }
}

const orderFailed=()=>{
    return{
        type:actionsType.ORDER_FAIL,
    }
}

export const OrderNowHandler=(order)=>{
    return dispatch=>{
        dispatch({type:actionsType.ORDER_START});
        axios.post('/orders.json',order).then(
            response=>{
                 dispatch(OrderSucessful(order,response.data.name));
            }
        ).catch(
            error=>{
                 dispatch(orderFailed());
            }
        )
    }
};

export const PurchaseStart=()=>{
    return dispatch=>{
        dispatch({type:actionsType.PURCHASE_START})
    }
}