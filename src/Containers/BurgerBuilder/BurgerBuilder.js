import React,{ Component } from 'react';
import Aux from '../../Hoc/Auxiliary'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../Hoc/withErrorHandler";

const INGREDIENT_PRICES= {
    salad:  0.5,
    cheese: 0.4,
    meat:   1.3,
    bacon:  0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasingToSeeModal: false,
        loading: false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey =>{
                return ingredients[igkey];
            })
            .reduce((sum,el) =>{
                return sum + el;
            },0);
        this.setState({purchasable: sum>0 })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState ({totalPrice: newPrice , ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseCancelHandler = () => {
        this.setState({purchasingToSeeModal: false});
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[ type ] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState ({totalPrice: newPrice , ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasingToSeeModal: true});
    }
    purchaseContinueHandler = () => {
         // alert('You continue');
        this.setState({ loading: true });
        const order={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Lorena',
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json' , order) //para probar el witherrorhandler quitamos el .json
            .then (response=> {
                this.setState({loading: false, purchasingToSeeModal: false});
            })
            .catch (error => {
                this.setState({loading: false});
            });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
            //llenamos el objeto con false or true ej: {salad:false,cheese:true, bacon:false,meat: true} dependiendo si son menores a cero las cantidades.
        }
        let orderSummary = <OrderSummary price={this.state.totalPrice} ingredients= {this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>;
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show= {this.state.purchasingToSeeModal} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded ={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler( BurgerBuilder, axios );