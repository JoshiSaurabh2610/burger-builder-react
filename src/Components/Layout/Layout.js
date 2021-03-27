import React from 'react'
import Aux from '../../hoc/Auxilliary/Auxilliary'
const Layout=(props)=>{
    return(
        <Aux>
            <div>Toolbar,sideDrawer,BaackDrop</div>
            <main>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;
