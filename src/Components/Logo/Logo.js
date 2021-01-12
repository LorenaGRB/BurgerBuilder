import burgerLogo from "../../Assets/images/burger-logo.png";
import React from 'react';
import Classes from './Logo.module.css'

const logo = (props) => (
    <div className={Classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt='MyBurgerLogo'/>  
    </div>
);

export default logo;