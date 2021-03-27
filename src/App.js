import React,{ Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/burgerBuilder";
import Layout from "./Components/Layout/Layout";
class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder/>
      </Layout>
    );
  }
};

export default App;
