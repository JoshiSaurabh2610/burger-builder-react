import * as actionsType from './actionType';
import axios from '../../axios-orders';

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

const setInitialBurger=(data,price)=>{
    return{
        type:actionsType.INIT_BURGER,
        ingredients:data,
        price:price,
    }
}
export const initBurgerIngredient=()=>{
    return dispatch=>{
        axios.get('https://burger-builder-react-2642b-default-rtdb.firebaseio.com/ingredients.json').then(
            res=>{
                dispatch(setInitialBurger(res.data));
            }
        ).catch(
            err=>{
                console.log(err);
                dispatch({type:actionsType.INIT_BURGER_FAIL});
            }
        )
    }
};