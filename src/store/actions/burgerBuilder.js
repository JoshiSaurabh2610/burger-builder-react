import * as actionsType from './actionType';

export const addIngredientHandler=(igName)=>{
    return{
        type:actionsType.ADD_INGREDIENT,
        igName:igName,
    }
};

export const removeIngredientHandler=(igName)=>{
    return{
        type:actionsType.REMOVE_INGREDIENT,
        igName:igName,
    }
};

