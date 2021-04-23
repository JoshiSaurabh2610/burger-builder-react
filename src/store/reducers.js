import * as actionType from './actions';

const initialState={
    ingredients:{
        Salad:0,
        Bacon:0,
        Cheese:0,
        Meat:0,
    },
    totalPrice:10,
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
        default:
            return state;
    }
};

export default reducer;
