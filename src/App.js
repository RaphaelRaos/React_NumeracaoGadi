import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import {Login} from './componentes/login/login'
import {Menu} from './componentes/menu/menu'
import {Header} from './componentes/header/header'
//COMUNICADOS
import {Comunicados} from './componentes/comunicados/comunicados'
import {FormCadComunicado} from './componentes/comunicados/formcadastrocomunicados'
import {FormViewComunicados} from './componentes/comunicados/formViewComunicados'
import {FormEditComunicados} from './componentes/comunicados/formEditarComunicados'
//DESPACHOS
import {Despachos} from './componentes/despachos/despachos'
import {FormCadDespacho} from './componentes/despachos/formCadastroDespachos'
import {FormViewDespachos} from './componentes/despachos/formViewDespachos'
import {FormEditarDespachos} from './componentes/despachos/formEditarDespachos'
import {FormSaidaDespachos} from './componentes/despachos/formSaidaDespachos'
import {FormExcluirDespachos} from './componentes/despachos/formExcluirDespacho'
//INSTRUÇÕES
import {Instrucoes} from './componentes/instrucao/instrucoes'
import {FormCadInstrucao} from './componentes/instrucao/formCadInstrucao'
import {FormViewInstrucao} from './componentes/instrucao/formViewInstrucao'
import {FormEditarInstrucao} from './componentes/instrucao/formEditarInstrucao'
import {FormExcluirInstrucao} from './componentes/instrucao/formExcluirInstrucao'
//MEMORANDOS
import {Memorandos} from './componentes/memorando/memorandos'
import {FormCadMemorando} from './componentes/memorando/formCadMemorando'
import {FormViewMemorando} from './componentes/memorando/formViewMemorando'
import {FormEditarMemorando} from './componentes/memorando/formEditarMemorando'
import {FormExcluirMemorando}from './componentes/memorando/formExcluirMemorando'
//NÚMERO DE REFERÊNCIA
import {NumReferencia} from './componentes/numeroReferencia/numeroReferencia'
import {FormCadNumRef} from './componentes/numeroReferencia/formCadNumReferencia'
import {FormViewNumRef} from './componentes/numeroReferencia/formViewNumReferencia'
import {FormEditarNumRef} from './componentes/numeroReferencia/formEditarNumReferencia'
import {FormSaidaNumRef} from './componentes/numeroReferencia/formSaidaNumReferencia'
import {FormExcluirNumRef} from './componentes/numeroReferencia/formExcluirNumReferencia'
//OCORRÊNCIAS
import {Ocorrencias} from './componentes/ocorrencias/ocorrencias'
import {FormCadOcorrencias} from './componentes/ocorrencias/formcadocorrencias'
//OFÍCIOS
import {Oficios} from './componentes/oficios/oficios'
import {FormCadOficios} from './componentes/oficios/formcadoficios'
//RELAÇÃO DE REMESSA
import {RelRemessa} from './componentes/relacaoRemessa/relacaoRemessas'
import {FormCadRelRemessa} from './componentes/relacaoRemessa/formcadrelremessa'
//RELATÓRIOS
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
          <Route path="/FormEditarDespachos/:id" component={FormEditarDespachos} />
          <Route path="/FormSaidaDespachos/:id" component={FormSaidaDespachos} />
          <Route path="/FormExcluirDespachos/:id" component={FormExcluirDespachos} />
          {/* INSTRUÇÕES */}
          <Route path="/instrucoes" component={Instrucoes} />
          <Route path="/formInstrucao" component={FormCadInstrucao} />
          <Route path="/formViewInstrucao/:id" component={FormViewInstrucao} />
          <Route path="/formEditarInstrucao/:id" component={FormEditarInstrucao} />
          <Route path="/formExcluirInstrucao/:id" component={FormExcluirInstrucao} />
          {/* MEMORANDOS*/}
          <Route path="/Memorandos" component={Memorandos} />
          <Route path="/formMemorando" component={FormCadMemorando} />
          <Route path="/formViewMemorando/:id" component={FormViewMemorando} />
          <Route path="/formEditarMemorando/:id" component={FormEditarMemorando} />
          <Route path="/formExcluirMemorando/:id" component={FormExcluirMemorando} />
          {/* NUMERO DE REFERÊNCIA - INFORMAÇÃO */}
          <Route path="/NumReferencia" component={NumReferencia} />
          <Route path="/formNumReferencias" component={FormCadNumRef} />
          <Route path="/formViewNumReferencias/:id" component={FormViewNumRef} />
          <Route path="/formEditarNumReferencias/:id" component={FormEditarNumRef} />
          <Route path="/formSaidaNumReferencias/:id" component={FormSaidaNumRef} />
          <Route path="/formExcluirNumReferencias/:id" component={FormExcluirNumRef} />
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
