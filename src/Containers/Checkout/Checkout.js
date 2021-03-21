import React, { Component  } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }
    
componentWillMount() {
    const query = new URLSearchParams( this.props.location.search );
    const ingredients = {};
    let price = false;
    for (let param of query.entries()){
        //param = ['salad','1'] 
        if ( param[0] == 'price' ){
            price = param[1];//guardamos el total price en price
        }else{
            ingredients[param[0]] = +param[1];
        }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
}

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler}
                />
                <Route 
                path={ this.props.match.path + '/contact-data' }
                // component={ContactData} Se usara el metodo render para poder pasar los ingredientes y el precio por medio de props
                //para que el push en history en contact data funcione se pasan props y asi despues de que se cargen los datos al firebase la pagina regrese al inicio.
                render={ (props) => (<ContactData  ingredients={ this.state.ingredients } totalPrice={ this.state.totalPrice } {...props}/>) }
                />
            </div>
        )
    }
}

export default Checkout;