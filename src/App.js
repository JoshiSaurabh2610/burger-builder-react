import React,{ Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/burgerBuilder";
import Layout from "./Components/Layout/Layout";
import Checkout from "./Containers/Checkout/checkout";
import { Route } from "react-router";
import Orders from './Containers/Orders/Order'
import Auth from './Containers/auth/Auth';
class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/burgers" exact component={BurgerBuilder}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" exact component={Orders}></Route>
        <Route path="/auth" exact component={Auth}></Route>
      </Layout>
    );
  }
};

export default App;
