import * as actionType from '../actions/actionTypes';

const initialState={
    ingredients:null,
    totalPrice:10,
    error:false,
};

const INGREDIENT_PRICE={
    'Salad':10,
    'Bacon':30,
    'Meat':45,
    'Cheese':15,        
}

const reducer = (state=initialState,action)=>{
    switch (action.type){
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1,
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName],
            };
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1,
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICE[action.ingredientName],   
            };
        case actionType.INIT_INGREDIENT:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
            }
        case actionType.FETCH_FAILED:
            return{
                ...state,
                error:true,
            }
        default:
            return state;
    }
};

export default reducer;
