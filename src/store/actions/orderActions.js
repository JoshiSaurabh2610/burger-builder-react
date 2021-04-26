import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSucess = (id,orderData)=>{
    // console.log('[purchaseBurgerSucess] ',id,orderData);
    return{
        type: actionTypes.PURCHASE_SUCESS,
        orderId:id,
        orderData:orderData
    }
}

const purchaseBurgerFail =(error)=>{
    return{
        type:actionTypes.PURCHASE_FAIL,
        err:error,
    }
};

const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_START,
    }
}

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        // console.log('[ orderActions.js] ',orderData);
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData).then(
            response => {
                // console.log('[ orderActions.js] PURACHASE SUCESS',orderData);
                dispatch(purchaseBurgerSucess(response.data.name,orderData))
            }
        ).catch( err => {
            dispatch(purchaseBurgerFail(err));             
            }
        )
    }
}

export const purchaseInit=()=>{
    return dispatch=>{
        dispatch({type:actionTypes.PURCHASE_INIT});
    }
}