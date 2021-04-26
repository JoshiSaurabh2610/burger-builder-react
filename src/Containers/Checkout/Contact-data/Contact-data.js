import classes from "./contact-data.module.css";
import { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";


import * as actionCreator from '../../../store/actions';

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
                touched:false,
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
                touched:false,
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
                touched:false,
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
                touched:false,
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
                touched:false,
            }
        },
        formValid:false,
    }

    // componentDidMount(){
    //     console.log(this.props)
    // }

    OrderNowHandler=(event)=>{
        event.preventDefault()
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
        this.props.OrderNowHandler(order);
    }
    
    checkValidity(value,rules){
        if(!rules){
            return true;
        }
        let isValid=true;
        if(rules.Required){
            isValid= isValid && value.trim()!=='';
        }
        if(rules.minLength){
            isValid=isValid && value.length>=rules.minLength;
        }
        if(rules.maxLength){
            isValid=isValid && value.length<=rules.maxLength;
        }
        return isValid;
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        let updatedOrderForm={
            ...this.state.orderForm
        }
        let updatedItem={
            ...updatedOrderForm[inputIdentifier]
        }
        updatedItem.value=event.target.value;
        updatedItem.isValid=this.checkValidity(updatedItem.value,updatedItem.Validation);
        updatedItem.touched=true;
        updatedOrderForm[inputIdentifier]=updatedItem;

        let formValid=true;
        for(let inputIdentifier in this.state.orderForm){
            formValid=formValid && this.state.orderForm[inputIdentifier].isValid;
        }
        // console.log(this.state.formValid,formValid);
        this.setState({orderForm:updatedOrderForm,formValid:formValid}); 
    }

    render(){
        let form=null;
        form=(
            <form onSubmit={this.OrderNowHandler}>
                {    
                    Object.keys(this.state.orderForm).map(item=>{
                        return<Input key={item} 
                                    type={this.state.orderForm[item].ElementType}
                                    properties={this.state.orderForm[item].properties}
                                    value={this.state.orderForm[item].value}
                                    changed={(event)=>this.inputChangedHandler(event,item)}
                                    inValid={!this.state.orderForm[item].isValid}
                                    touched={this.state.orderForm[item].touched} />
                    })
                }
                <Button btnType="Sucess"
                    disable={!this.state.formValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form= <Spinner/>
        }
        return(
            <div className={classes.ContactForm}>
                <h2>Enter Your Contact Details</h2>
                {form}
            </div>
        );
    };
};

const mapStateToProps=state=>{
    return{
        loading:state.order.loading,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        OrderNowHandler: (order)=> dispatch(actionCreator.OrderNowHandler(order)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (ContactData);