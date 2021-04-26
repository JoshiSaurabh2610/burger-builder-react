import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name,
    }
}
export const removeIngredient = (name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name,
    }
}

const setIngredient = ings=>{
    if(ings){
        return{
            type: actionTypes.INIT_INGREDIENT,
            ingredients:ings
        }
    }
    else {
        return{
            type:actionTypes.FETCH_FAILED,
        }
    }
}

export const initIngredient=()=>{
    return dispatch=>{
        axios.get('https://burger-builder-react-2642b-default-rtdb.firebaseio.com/ingredients.json').then(
            res=> dispatch(setIngredient(res.data))
        ).catch(
            err=>{
                return dispatch(setIngredient(null));
            }
        )
    }
}