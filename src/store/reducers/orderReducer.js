import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders:[],
    loading:false,
    purchased:false,
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false,
            }
        case actionTypes.PURCHASE_SUCESS:
            const newOrder={
                ...action.orderData,
                id:action.orderId,
            }
            return{
                ...state,
                orders:state.orders.concat(newOrder),
                loading:false,
                purchased:true,
            };
        case actionTypes.PURCHASE_FAIL:
            return{
                ...state,
                loading:false,
            }
        case actionTypes.PURCHASE_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.ORDER_FETCH_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.ORDER_FETCH_SUCESS:
            return{
                ...state,
                orders:action.orders,
                loading:false,
            }
        case actionTypes.ORDER_FETCH_FAIL:
            return{
                ...state,
                loading:false,
            }
        default: 
            return state;
    }
}

export default reducer;