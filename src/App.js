import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/Containers/Checkout/Checkout';
import { Route,Switch } from 'react-router-dom';

class App extends Component {


  render()  {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/' component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
