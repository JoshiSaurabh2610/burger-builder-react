import axios from '../../../axios-orders';
import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './contactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner'
class  ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false,
    }
    
    OrderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props);
        this.setState({loading:true});
        const order={
            ingredient: this.props.ingredient,
            price: this.props.price,
            customer:{
                'name':'Saurabh Joshi',
                address:{
                    streetNo:'04',
                    area:'vijayPark,Maujpur',
                    zipCode:'110053',
                    Landmark:'near Shiv Mandir'
                },
                email:'joshisaurabh2610@gmail.com'
            },
            deliveryMethod:'fastest'
        }
       axios.post('/orders.json',order).then(
           response=>{
            //console.log(response);
            this.setState({loading:false})
            this.props.history.push('/burgers');
           }
       ).catch(
           error=>{
                this.setState({loading:false})
           }
       )
    }

    render(){
        let form= <form>
                    <input className={classes.Input} type="text" name="Name" placeholder="Your Name"></input>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"></input>
                    <input className={classes.Input} type="text" name="street" placeholder="Street No"></input>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Pin"></input>
                  </form>
        if(this.state.loading)form=<Spinner/>
        return(
            <div className={classes.ContactData}>
                <h1>Contact  Form</h1>
                {form}
                <Button
                    btnType="Sucess"
                    clicked={this.OrderHandler}>ORDER</Button>
            </div>
        )
    }
    
};
export default ContactData;