import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import {Login} from './componentes/login/login'
import {Menu} from './componentes/menu/menu'
import {Header} from './componentes/header/header'
import {Comunicados} from './componentes/comunicados/comunicados'
import {FormCadComunicado} from './componentes/comunicados/formcadastrocomunicados'
import {FormViewComunicados} from './componentes/comunicados/formViewComunicados'
import {FormEditComunicados} from './componentes/comunicados/formEditarComunicados'
import {Despachos} from './componentes/despachos/despachos'
import {FormCadDespacho} from './componentes/despachos/formcadastrodespachos'
import {FormViewDespachos} from './componentes/despachos/formViewDespachos'
import {Instrucoes} from './componentes/instrucao/instrucoes'
import {FormCadInstrucao} from './componentes/instrucao/formcadinstrucao'
import {Memorandos} from './componentes/memorando/memorandos'
import {FormCadMemorando} from './componentes/memorando/formcadmemorando'
import {NumReferencia} from './componentes/numeroReferencia/numeroReferencia'
import {FormCadNumRef} from './componentes/numeroReferencia/formcadnumreferencia'
import {Ocorrencias} from './componentes/ocorrencias/ocorrencias'
import {FormCadOcorrencias} from './componentes/ocorrencias/formcadocorrencias'
import {Oficios} from './componentes/oficios/oficios'
import {FormCadOficios} from './componentes/oficios/formcadoficios'
import {RelRemessa} from './componentes/relacaoRemessa/relacaoRemessas'
import {FormCadRelRemessa} from './componentes/relacaoRemessa/formcadrelremessa'
import {Relatorios} from './componentes/relatorios/relatorios'
import {FormCadRelatorios} from './componentes/relatorios/formcadrelatorios'


function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/menu" component={Menu}/>
          <Route path="/header" component={Header}/>
          {/* COMUNICADOS */}
          <Route path="/comunicados" component={Comunicados} />
          <Route path="/formComunicados" component={FormCadComunicado} />
          <Route path="/formViewComunicados/:id" component={FormViewComunicados} />
          <Route path="/formEditarComunicados/:id" component={FormEditComunicados} />
          {/* DESPACHOS */}
          <Route path="/despachos" component={Despachos} />
          <Route path="/formDespachos" component={FormCadDespacho} />
          <Route path="/formViewDespachos/:id" component={FormViewDespachos} />
          {/* INSTRUÇÕES */}
          <Route path="/instrucoes" component={Instrucoes} />
          <Route path="/formInstrucao" component={FormCadInstrucao} />
          {/* MEMORANDOS*/}
          <Route path="/Memorandos" component={Memorandos} />
          <Route path="/formMemorando" component={FormCadMemorando} />
          {/* NUMERO DE REFERÊNCIA - INFORMAÇÃO */}
          <Route path="/NumReferencia" component={NumReferencia} />
          <Route path="/formNumReferencias" component={FormCadNumRef} />
          {/* OCORRÊNCIAS */}
          <Route path="/Ocorrencias" component={Ocorrencias} />
          <Route path="/formOcorrencias" component={FormCadOcorrencias} />
          {/* OFÍCIOS */}
          <Route path="/Oficios" component={Oficios} />
          <Route path="/formOficios" component={FormCadOficios} />
          {/* RELAÇÃO DE REMESSA */}
          <Route path="/RelRemessa" component={RelRemessa} />
          <Route path="/formRelRemessa" component={FormCadRelRemessa} />
          {/* RELATÓRIOS */}
          <Route path="/Relatorios" component={Relatorios} />
          <Route path="/formRelatorios" component={FormCadRelatorios} />
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
