import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        // console.log('[ orderActions.js] ',orderData);
        dispatch({type:actionTypes.PURCHASE_START});
        axios.post('/orders.json?auth='+token, orderData).then(
            response => {
                // console.log('[ orderActions.js] PURACHASE SUCESS',orderData);
                dispatch({
                    type: actionTypes.PURCHASE_SUCESS,
                    orderId:response.data.name,
                    orderData:orderData
                })
            }
        ).catch( err => {
            dispatch({
                type:actionTypes.PURCHASE_FAIL,
                err:err,
            });             
        })
    }
}

export const purchaseInit=()=>{
    return dispatch=>{
        dispatch({type:actionTypes.PURCHASE_INIT});
    }
}


export const orderFetch=(token)=>{
    return dispatch=>{
        dispatch({type:actionTypes.ORDER_FETCH_START});
        axios.get('/orders.json?auth='+token).then(
            res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
               dispatch({type:actionTypes.ORDER_FETCH_SUCESS,orders:fetchedOrders});
            }
        ).catch(err=>{
            dispatch({type:actionTypes.ORDER_FETCH_FAIL})
        })
    }
}