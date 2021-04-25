import * as actionType from '../actions/actionType';

const initialState={
    ingredients:null,
    TotalPrice:null,
    error:false,
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
        
        case actionType.INIT_BURGER:
            return{
                ...state,
                ingredients:action.ingredients,
                TotalPrice:10,
                error:false,
            }
        case actionType.INIT_BURGER_FAIL:
            return{
                ...state,
                error:true,
            }
        default:
            return state;
    }
}

export default reducer;