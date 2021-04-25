import * as actionsType from '../actions/actionType'

const initialState={
    orders:[],
    loading:false,
    purchased:false,
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionsType.ORDER_START:
            return{
                ...state,
                loading:true,
            }
        case actionsType.ORDER_OK:
            const NewOrder={
                ...action.order,
                id:action.id,
            }
            return{
                ...state,
                orders:state.orders.concat(NewOrder),
                loading:false,
                purchased:true,
            };
        case actionsType.ORDER_FAIL:
            return{
                ...state,
                loading:false,
            }
        case actionsType.PURCHASE_START:
            return{
                ...state,
                purchased:false,
            }
        default :
            return state;
    }
};

export default reducer;