import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxilliary/Auxilliary'
import SideDrawer from '../NavBar/SideDrawer/SideDrawer'
import Toolbar from '../NavBar/Toolbar/Toolbar'
import Backdrops from '../UI/Backdrops/Backdrop'
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    toggleSideDrawer=()=>{
        // console.log('show side drawer function invoked');
        // console.log(this.state.showSideDrawer);
        this.setState({
            showSideDrawer:!this.state.showSideDrawer
        });
    }
    render(){
        return(
            <Aux>     
                <Toolbar toggle={this.toggleSideDrawer}
                        show={this.state.showSideDrawer}
                        isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer toggle={this.toggleSideDrawer}
                        show={this.state.showSideDrawer}
                        isAuthenticated={this.props.isAuthenticated}/>
                <Backdrops 
                        show={this.state.showSideDrawer}
                        cancel={this.toggleSideDrawer}/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.idToken!=null,
    }
}
export default connect(mapStateToProps)(Layout);
