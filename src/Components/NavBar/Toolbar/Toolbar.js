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
                    <Navitem active link="/">Home</Navitem>
                    <Navitem link="/burgers">Burgers</Navitem>
                    <Navitem link="/about">About</Navitem>
                </div>
            </div>
            <div className={classes.space}></div>
        </Aux>

    );
}
export default Toolbar;