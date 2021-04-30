import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from '../../../store/actions/index'
class Logout extends Component{
    componentDidMount(){
        this.props.logout();
    }
    render(){
        return <Redirect to='/burgers'/>
    }
};

const mapDispatchToProps=dispatch=>{
     return{
        logout: ()=> dispatch(actions.logout())
     }
}

export default connect(null,mapDispatchToProps)(Logout);