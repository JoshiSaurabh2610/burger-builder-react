import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Auth extends Component {
    state={
        orderForm:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true,
                },
                valid:false,
                touched:false,
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                },
                valid:false,
                touched:false,
            },
        },
        isSignUp:true,
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
        
        if(rules.isEmail){
            const pattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid=pattern.test(value) && isValid;
        }

        if(rules.isNumeric){
            const pattern=/^\d+$/;
            isValid=pattern.test(value)&&isValid;
        }

        return isValid;
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedOrderForm={
            ...this.state.orderForm,
            [controlName]:{
                ...this.state.orderForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.orderForm[controlName].validation),
                touched:true,
            }
        }
        this.setState({orderForm:updatedOrderForm});
    }

    authHandler=(event)=>{
        event.preventDefault();
        this.props.auth(this.state.orderForm.email.value,this.state.orderForm.password.value,this.state.isSignUp);
    }
    
    authSwitchModeHandler=()=>{
        console.log('[authSwitchModeHandler]');
        this.setState(prevstate=>{
            return{isSignUp: !prevstate.isSignUp};
        })
    }

    render(){
        let formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            });
        }
        let form = formElementArray.map(formElement=>{
                return <Input 
                        key={formElement.id}   
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        inValid={!formElement.config.valid}
                        touched={formElement.config.touched}/>
                })
        let errMsg=null;
        if(this.props.error){
            errMsg=<p style={{color:'red'}}>{this.props.error.message}</p>
        }
            
        return(
            <div className={classes.authDiv}>  
                {errMsg}
                <form onSubmit={this.authHandler}>
                    {this.props.loading?<Spinner/>:form}
                    <Button
                        btnType="Sucess">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.authSwitchModeHandler} >Switch To {this.state.isSignUp?'SIGN IN': 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        auth: (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);