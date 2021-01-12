import React from 'react';
import Classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={Classes.Toolbar}>
        <div>MENU</div>
        <Logo  height='80%'/>
        <nav className={Classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);
export default toolbar;