import * as actionType from '../actions/actionType';

const initialState={
    ingredients:{
        'Salad':0,
        'Bacon':0,
        'Meat':0,
        'Cheese':0,
    },
    TotalPrice:10,
};


const INGREDIENT_PRICE={
    'Salad':10,
    'Bacon':30,
    'Meat':40,
    'Cheese':15        
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.igName]:state.ingredients[action.igName]+1,

                },
                TotalPrice:state.TotalPrice+INGREDIENT_PRICE[action.igName],
            };

        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.igName]:state.ingredients[action.igName]-1,

                },
                TotalPrice:state.TotalPrice-INGREDIENT_PRICE[action.igName],
            };

        default:
            return state;
    }
}

export default reducer;