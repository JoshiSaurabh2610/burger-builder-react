import axios from 'axios';
import * as actionType from './actionTypes';

export const logout=()=>{
    return dispatch=>{
        dispatch({type:actionType.AUTH_LOGOUT,})
    }
}

export const checkAuthTimeout =(expireTime)=>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        }, expireTime*1000);
    }
}

export const auth=(email,password,isSignUp) =>{
    return dispatch=>{
        dispatch({type:actionType.AUTH_START});
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtYNDDyT0hb7KkArG3Io2dqTxYPJIySb0';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtYNDDyT0hb7KkArG3Io2dqTxYPJIySb0'
        }
        let authData={
            email:email,
            password:password,
            returnSecureToken:true,
        };
        axios.post(url,authData).then(response=>{
                dispatch({type:actionType.AUTH_SUCESS,data:response.data});
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }
        ).catch(err=>{
            console.log(err);
            dispatch({type:actionType.AUTH_FAIL,err:err.response.data.error});
        })
    }
}