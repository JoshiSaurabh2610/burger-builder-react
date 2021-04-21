import classes from "./contact-data.module.css";
import { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import axios from "../../../axios-orders";
import Input from "../../../Components/UI/Input/Input";



class ContactData extends Component{

    state={
        orderForm:{
            name:{
                ElementType:'input',
                properties:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:'',
                Validation:{
                    Required:true,
                    maxLength:25,
                },
                isValid:false,
            },
            email:{
                ElementType:'input',
                properties:{
                    type:'email',
                    placeholder:'Your Email',
                },
                value:'',
                Validation:{
                    Required:true,
                },
                isValid:false,
            },
            address:{
                ElementType:'input',
                properties:{
                    type:'text',
                    placeholder:'Your Address',
                },
                value:'',
                Validation:{
                    Required:true,
                    maxLength:30,
                },
                isValid:false,
            },
            pinCode:{
                ElementType:'input',
                properties:{
                    type:'number',
                    placeholder:'Pin Code',
                },
                value:'',
                Validation:{
                    Required:true,
                    maxLength:6,
                    minLength:6,
                },
                isValid:false,
            },
            deliveryMethod:{
                ElementType:'select',
                properties:[
                    {value:'cheapest',displayValue:'Cheapeast (Free) '},
                    {value:'fastest',displayValue:'Fastest (50 Rupees) '}
                ],
                value:'cheapest',
                Validation:{},
                isValid:true,
            }
        },
        loading:false,
    }

    // componentDidMount(){
    //     console.log(this.props)
    // }

    OrderNowHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredient: this.props.ingredients,
            price: this.props.TotalPrice,
            customer:{
                name:this.state.orderForm['name'].value,
                address:this.state.orderForm['address'].value,
                pinCode:this.state.orderForm['pinCode'].value,
                email:this.state.orderForm['email'].value,
            },
            deliveryMethod:this.state.orderForm['deliveryMethod'].value,
        }
       axios.post('/orders.json',order).then(
           response=>{
            //    console.log(response);
                this.setState({loading:false})
                this.props.history.replace('/burgers');
           }
       ).catch(
           error=>{
                this.setState({loading:false})
           }
       )
    }
   
    inputChangedHandler=(event,inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.orderForm
        }
        let updatedItem={
            ...updatedOrderForm[inputIdentifier]
        }
        updatedItem.value=event.target.value;
        updatedOrderForm[inputIdentifier]=updatedItem;
        this.setState({orderForm:updatedOrderForm})
    }

    render(){
        let inputElement=null;
        inputElement=Object.keys(this.state.orderForm).map(item=>{
            return<Input key={item} 
                        type={this.state.orderForm[item].ElementType}
                        properties={this.state.orderForm[item].properties}
                        value={this.state.orderForm[item].value}
                        changed={(event)=>this.inputChangedHandler(event,item)}/>
        });
        return(
            <div className={classes.ContactForm}>
                <h2>Enter Your Contact Details</h2>
                <form>
                    {inputElement}
                </form>

                <Button 
                    btnType="Danger"
                    clicked={this.props.Cancel}>Cancel</Button>

                <Button 
                    btnType="Sucess"
                    clicked={this.OrderNowHandler}>Continue</Button>
            </div>
        );
    };
};

export default ContactData;