import axios from "../../axios-orders";
import { Component } from "react";
import Order from "../../Components/My_Order/My_order";

class Orders extends Component{
    state={
        ingredients:[],
    }
    componentDidMount(){
        axios.get('/orders.json').then((res)=>{
            let ingredients=Object.entries(res.data).map(item=>{
                    return item;    
                })
            // console.log(ingredients);
            this.setState({ingredients:ingredients})
        });
    }
    render(){
        let orders=this.state.ingredients.map(item=>{
            const id=item[0];
            const ingredient=item[1].ingredient;
            // console.log(ingredient)
            return <Order key={id} ingredients={ingredient}/>
        })
        return(
            orders
            // <h1>asdf</h1>
        );
    }
};

export default Orders;