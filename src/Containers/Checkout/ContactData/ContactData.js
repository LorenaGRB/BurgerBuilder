import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.module.css';
class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render() {
        return (
            <div className={Classes.ContactData}>
                <h4>ENTER YOUR CONTACT DATA</h4>
                <form>
                    <div className={Classes.Container}>
                        <input type='text' name='name' placeholder='Your name'/>
                        <input className={Classes.large} type='text' name='email' placeholder='Your email'/>
                    </div>
                    <div className={Classes.Container}>
                        <input className={Classes.large} type='text' name='street' placeholder='Street'/>
                        <input type='text' name='postal' placeholder='Postal code'/>
                    </div>
                    <Button btnType='Success'>ORDER NOW!</Button>
                </form>
            </div>
        );
    }
}
export default ContactData;