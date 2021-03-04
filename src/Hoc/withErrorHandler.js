import React, { Component } from 'react';
import Modal from '../Components/UI/Modal/Modal';
import Aux from './Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            initialized: false,
            error: null
        }
                
        componentDidMount() { 
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
            this.setState({ initialized: true });
        }
        //This is a lifecycle method which is executed at the point of time a component isnt required anymore
        //Now to be able to remove an interceptor here, we need to store a reference to the interceptors we create in properties of this class.
        componentWillUnmount(){//removemos los interceptor cuando no se usan
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        render(){
            const { initialized } = this.state;
            if (!initialized) return null;
            return(
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            );
        }
    }
}


export default withErrorHandler;