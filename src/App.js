import React,{ Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/burgerBuilder";
import Layout from "./Components/Layout/Layout";
import Checkout from "./Containers/Checkout/checkout";
import { Route } from "react-router";
class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/burgers" exact component={BurgerBuilder}></Route>
        <Route path="/checkout"  component={Checkout}></Route>
      </Layout>
    );
  }
};

export default App;
