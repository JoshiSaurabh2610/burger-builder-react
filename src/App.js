import React,{ Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/burgerBuilder";
import Layout from "./Components/Layout/Layout";
import Checkout from "./Containers/Checkout/Checkout";
import {Route} from 'react-router-dom'
import Orders from "./Containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <Layout>
         <Route path='/burgers' exact component={BurgerBuilder} />
         <Route path='/burgers/checkout' component={Checkout}/>
         <Route path='/my-orders' component={Orders} />
      </Layout>
    );
  }
};

export default App;
