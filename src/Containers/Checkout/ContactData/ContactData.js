import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import Input from "../../../Components/UI/Input/Input";
class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order={
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Lorena',
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json' , order) //para probar el witherrorhandler quitamos el .json
            .then (response=> {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch (error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype = "input" type='text' name='name' placeholder='Your name'/>
                <Input inputtype = "input" type='text' name='email' placeholder='Your email'/>
                <Input inputtype = "input" type='text' name='street' placeholder='Street'/>
                <Input inputtype = "input" type='text' name='postal' placeholder='Postal code'/>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER NOW!</Button>
            </form>
        );
        if( this.state.loading ){
            form = <Spinner />;
        }
        return (
            <div className={Classes.ContactData}>
                <h4>ENTER YOUR CONTACT DATA</h4>
                { form }
            </div>
        );
    }
}
export default ContactData;