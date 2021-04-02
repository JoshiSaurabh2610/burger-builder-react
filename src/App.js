import React,{ Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/burgerBuilder";
import Layout from "./Components/Layout/Layout";
class App extends Component {
  state={
    show:true
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({show:false});
    },5000)
  }
  render() {
    return (
      <Layout>
        {this.state.show? <BurgerBuilder/>: null}
      </Layout>
    );
  }
};

export default App;
