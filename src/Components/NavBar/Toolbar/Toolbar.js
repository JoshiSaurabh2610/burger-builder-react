import classes from './Toolbar.module.css';
import React from 'react'
import Logo from '../../Logo/logo'
import Navitem from '../NavItem/Navitem'
import Hamberger from '../../HambergerMenu/Hamberger';
import Aux from '../../../hoc/Auxilliary/Auxilliary';

const Toolbar=(props)=>{
    return(
        <Aux>
        <div className={classes.Toolbar}>
            <Hamberger clicked={props.toggle}
                        open={props.show}/>
            <Logo />
            <div className={classes.Navitems}>
                <Navitem link="/">Home</Navitem>
                <Navitem link="/burgers">Burgers</Navitem>
                {
                    props.isAuthenticated?<Navitem link="/orders">Orders</Navitem>:null
                }
                {
                    props.isAuthenticated ?<Navitem link="/logout">Logout</Navitem>
                            : <Navitem link="/auth">Login</Navitem>
                }
            </div>
        </div>
        <div className={classes.spaceDiv}></div>
        </Aux>
    );
}
export default Toolbar;