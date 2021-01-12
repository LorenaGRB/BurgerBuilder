import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Classes from './SideDrawer.module.css';

const sideDrawer = (props) => {

    return(
        <div className={Classes.SideDrawer} >
            <Logo height='11%'/>
            <nav>
                <NavigationItems />
            </nav>
        </div>

    );
}

export default sideDrawer;