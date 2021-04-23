import axios from '../../../axios-orders';
import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './contactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
class ContactData extends Component {
    state = {
        orderForm: {

            name :{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },

            streetNo:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },

            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6,
                },
                valid:false,
                touched:false,
            },

            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },

            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},
                    ]
                },
                value:'cheapest',
                validation:{},
                valid:true,
            },
        },
        loading: false,
        formValid:false,
    }

    OrderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({ loading: true });
        const formData={};
        for(let identifier in this.state.orderForm){
            formData[identifier]=this.state.orderForm[identifier].value
        }
        const order = {
            ingredient: this.props.ingredient,
            price: this.props.price,
            orderData: formData,  
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

    checkValidity(value,rules){
        if(!rules)return true; 

        let isValid=true;

        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        // console.log(event.target.value);
        // console.log(inputIdentifier);
        let updatedOrderForm={
            ...this.state.orderForm
        }
        let updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        updatedFormElement.touched=true;
        // console.log(updatedOrderForm);
        let formValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formValid=formValid && updatedOrderForm[inputIdentifier].valid;
        }
        this.setState({orderForm:updatedOrderForm,formValid:formValid})
    }

    render() {
        let formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            });
        }
        let form = <form onSubmit={this.OrderHandler}>
            {
                formElementArray.map(formElement=>{
                return <Input 
                        key={formElement.id}   
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        inValid={!formElement.config.valid}
                        touched={formElement.config.touched}/>
                })
            }
            <Button
                    btnType="Sucess"
                    disable={!this.state.formValid}>ORDER</Button>
        </form>

        if (this.state.loading) form = <Spinner />

        return (
            <div className={classes.ContactData}>
                <h1>Contact  Form</h1>
                {form}
            </div>
        )
    }

};
const mapStateToProps=(state)=>{
    return{
        ingredient:state.ingredients,
        price:state.totalPrice,
    }
}
export default connect(mapStateToProps)(ContactData);