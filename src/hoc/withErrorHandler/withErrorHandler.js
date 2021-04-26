import React, { Component } from 'react'
import Model from '../../Components/UI/Model/Model';
import Aux from '../Auxilliary/Auxilliary';


const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null,
        }

        componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use(
                req=>{
                    this.setState({error:null});
                    // console.log('error set to null in req');
                    return req;
                }
            )
            this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
                    this.setState({error:error});
                    // console.log('error seted in response err');
                    return Promise.reject(error)
                }
            )
        }
         
        componentWillUnmount(){
            // console.log('component will unmount',this.resInterceptor,this.reqInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Aux>
                    <Model show={this.state.error}
                            cancel={this.errorConfirmHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Model>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
        
    }
}

export default withErrorHandler;