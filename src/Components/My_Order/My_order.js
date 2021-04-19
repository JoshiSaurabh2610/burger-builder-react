import Burger from "../Burger/Burger";
import IngredientTable from "../IngredientTable/IngredientTable";
import classes from "./My_order.module.css";
const Order=(props)=>{
    return(
        <div className={classes.Order}>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div className={classes.Table}>
                <IngredientTable ingredients={props.ingredients} />
            </div>
        </div>
    )
};

export default Order;