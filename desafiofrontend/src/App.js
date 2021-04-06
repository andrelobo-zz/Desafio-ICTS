import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProdutoList from './ProdutoList';
import ProdutoEdit from './ProdutoEdit';
import CompraList from './CompraList';
import CompraEdit from './CompraEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/Produtos' exact={true} component={ProdutoList}/>
          <Route path='/Produtos/:id' component={ProdutoEdit}/>
          <Route path='/Compras' exact={true} component={CompraList}/>
          <Route path='/Compras/:id' component={CompraEdit}/>
        </Switch>
      </Router>
      
    )
  }
}

export default App;