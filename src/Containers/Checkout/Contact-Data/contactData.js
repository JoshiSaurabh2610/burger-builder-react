import axios from '../../../axios-orders';
import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './contactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name :{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:''
            },
            streetNo:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value:''
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE',
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                },
                value:''
            },
            deliveryMethod: {
                elementType:'input',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},

                    ]
                },
                value:''
            },
        },
        loading: false,
    }

    OrderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({ loading: true });
        const order = {
            ingredient: this.props.ingredient,
            price: this.props.price,
            customer: {
                'name': 'Saurabh Joshi',
                address: {
                    streetNo: '04',
                    area: 'vijayPark,Maujpur',
                    zipCode: '110053',
                    Landmark: 'near Shiv Mandir'
                },
                email: 'joshisaurabh2610@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(
            response => {
                //console.log(response);
                this.setState({ loading: false })
                this.props.history.push('/burgers');
            }
        ).catch(
            error => {
                this.setState({ loading: false })
            }
        )
    }

    render() {
        let formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            });
        }
        let form = <form>
            {
                formElementArray.map(formElement=>{
                return <Input 
                        key={formElement.id}   
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
                })
            }
        </form>

        if (this.state.loading) form = <Spinner />

        return (
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