import classes from "./contact-data.module.css";
import { Component } from "react";
import Button from "../../../Components/UI/Button/Button";


class ContactData extends Component{

    state={
        loading:false,
    }

    CancelHandler=()=>{
        this.props.history.replace('/burgers');
    }

   
    render(){
        return(
            <div className={classes.ContactForm}>
                <h2>Enter Your Contact Details</h2>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="StreetNo" placeholder="Your StreetNo" />
                    <input type="text" name="Area" placeholder="Area and  Code" />
                </form>

                <Button 
                    btnType="Danger"
                    clicked={this.CancelHandler}>Cancel</Button>

                <Button 
                    btnType="Sucess"
                    clicked={this.props.Continue}>Continue</Button>
            </div>
        );
    };
};

export default ContactData;