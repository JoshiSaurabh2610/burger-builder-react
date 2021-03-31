import React, { Component } from 'react'
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
                        show={this.state.showSideDrawer}/>
                <SideDrawer toggle={this.toggleSideDrawer}
                        show={this.state.showSideDrawer}/>
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

export default Layout;
