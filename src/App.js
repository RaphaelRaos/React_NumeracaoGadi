import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import {Login} from './componentes/login/login'
import {Menu} from './componentes/menu/menu'
import {Header} from './componentes/header/header'
import {Comunicados} from './componentes/comunicados/comunicados'
import {Despachos} from './componentes/despachos/despachos'
import {Instrucoes} from './componentes/instrucao/instrucoes'
import {Memorandos} from './componentes/memorando/memorandos'
import {NumReferencia} from './componentes/numeroReferencia/numeroReferencia'
import {Ocorrencias} from './componentes/ocorrencias/ocorrencias'
import {Oficios} from './componentes/oficios/oficios'
import {RelRemessa} from './componentes/relacaoRemessa/relacaoRemessas'
import {Relatorios} from './componentes/relatorios/relatorios'


function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/menu" component={Menu}/>
          <Route path="/header" component={Header}/>
          <Route path="/comunicados" component={Comunicados} />
          <Route path="/despachos" component={Despachos} />
          <Route path="/instrucoes" component={Instrucoes} />
          <Route path="/Memorandos" component={Memorandos} />
          <Route path="/NumReferencia" component={NumReferencia} />
          <Route path="/Ocorrencias" component={Ocorrencias} />
          <Route path="/Oficios" component={Oficios} />
          <Route path="/RelRemessa" component={RelRemessa} />
          <Route path="/Relatorios" component={Relatorios} />
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
