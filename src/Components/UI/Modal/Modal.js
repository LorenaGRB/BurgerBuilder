import React, {Component} from 'react';
import Classes from './Modal.module.css';
import Aux from '../../../Hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

shouldComponentUpdate(nextProps,nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
}
componentWillUnmount () {
    console.log ('Modal will updated');
}
    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                    <div 
                    className={Classes.Modal}
                    style={{
                        transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show? '1' : '0'
                    }}>
                        {this.props.children}
                    </div>
            </Aux> 
        );
    }
}

export default Modal;