import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Backdrop from "../Backdrops/Backdrop";
import classes from "./Model.module.css"

const Model=(props)=>{
    return (
        <Aux>
            <Backdrop
                show={props.show}
                cancel={props.cancel}/>
            <div className={classes.Modal}
                style={{
                    transform: props.show?'translateY(60%)':'translateY(-100%)'
                }}>
                {props.children}
            </div>
        </Aux>
    )
}
export default Model;