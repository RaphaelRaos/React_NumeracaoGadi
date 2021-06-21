import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import {Login} from './componentes/login/login'
import {Menu} from './componentes/menu/menu'
import {Header} from './componentes/header/header'
import {Comunicados} from './componentes/comunicados/comunicados'

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/menu" component={Menu}/>
          <Route path="/header" component={Header}/>
          <Route path="/comunicados" component={Comunicados} />
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
