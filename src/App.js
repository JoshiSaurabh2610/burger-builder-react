import React,{ Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/burgerBuilder";
import Layout from "./Components/Layout/Layout";
import Checkout from "./Containers/Checkout/Checkout";
import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Layout>
         <Route path='/burgers' exact component={BurgerBuilder} />
         <Route path='/burgers/checkout' exact  component={Checkout}/>
         {/* <BurgerBuilder/>
         <Checkout/> */}
      </Layout>
    );
  }
};

export default App;
