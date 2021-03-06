import classes from './SideDrawer.module.css';
import React from 'react'
import Navitem from '../NavItem/Navitem'
import Hamberger from '../../HambergerMenu/Hamberger';
const SideDrawer=(props)=>{
    let classAttached=[classes.SideDrawer,classes.close];
    if(props.show){
        classAttached=[classes.SideDrawer,classes.open];
    }
    return(
        <div className={classAttached.join(' ')}>
           <Hamberger clicked={props.toggle}
                        open={props.show}/>
            <Navitem link="/" exact >Home</Navitem>
            <Navitem link="/burgers">Burgers</Navitem>
            <Navitem link="/my-orders">My Orders</Navitem>
        </div>
    );
};
export default SideDrawer;