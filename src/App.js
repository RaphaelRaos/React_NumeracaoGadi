import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';

import { Login } from './componentes/login/login'
import {MenuVert} from './componentes/menuSetores/menuVert'
import { Header } from './componentes/header/header'


//GADI
import { Menu } from './componentes/gadi/menu/menu'
//COMUNICADOS
import { Comunicados } from './componentes/gadi/comunicados/comunicados'
import { FormCadComunicado } from './componentes/gadi/comunicados/formCadastroComunicados'
import { FormViewComunicados } from './componentes/gadi/comunicados/formViewComunicados'
import { FormEditComunicados } from './componentes/gadi/comunicados/formEditarComunicados'
import { FormExcluirComunicados } from './componentes/gadi/comunicados/formExcluirComunicado'
//DESPACHOS
import { Despachos } from './componentes/gadi/despachos/despachos'
import { FormCadDespacho } from './componentes/gadi/despachos/formCadastroDespachos'
import { FormViewDespachos } from './componentes/gadi/despachos/formViewDespachos'
import { FormEditarDespachos } from './componentes/gadi/despachos/formEditarDespachos'
import { FormSaidaDespachos } from './componentes/gadi/despachos/formSaidaDespachos'
import { FormExcluirDespachos } from './componentes/gadi/despachos/formExcluirDespacho'
//INSTRUÇÕES
import { Instrucoes } from './componentes/gadi/instrucao/instrucoes'
import { FormCadInstrucao } from './componentes/gadi/instrucao/formCadInstrucao'
import { FormViewInstrucao } from './componentes/gadi/instrucao/formViewInstrucao'
import { FormEditarInstrucao } from './componentes/gadi/instrucao/formEditarInstrucao'
import { FormExcluirInstrucao } from './componentes/gadi/instrucao/formExcluirInstrucao'
//MEMORANDOS
import { Memorandos } from './componentes/gadi/memorando/memorandos'
import { FormCadMemorando } from './componentes/gadi/memorando/formCadMemorando'
import { FormViewMemorando } from './componentes/gadi/memorando/formViewMemorando'
import { FormEditarMemorando } from './componentes/gadi/memorando/formEditarMemorando'
import { FormExcluirMemorando } from './componentes/gadi/memorando/formExcluirMemorando'
//NÚMERO DE REFERÊNCIA
import { NumReferencia } from './componentes/gadi/numeroReferencia/numeroReferencia'
import { FormCadNumRef } from './componentes/gadi/numeroReferencia/formCadNumReferencia'
import { FormViewNumRef } from './componentes/gadi/numeroReferencia/formViewNumReferencia'
import { FormEditarNumRef } from './componentes/gadi/numeroReferencia/formEditarNumReferencia'
import { FormSaidaNumRef } from './componentes/gadi/numeroReferencia/formSaidaNumReferencia'
import { FormExcluirNumRef } from './componentes/gadi/numeroReferencia/formExcluirNumReferencia'
//OFÍCIOS
import { Oficios } from './componentes/gadi/oficios/oficios'
import { FormCadOficios } from './componentes/gadi/oficios/formCadOficios'
import { FormViewOficio } from './componentes/gadi/oficios/formViewOficios'
import { FormEditarOficio } from './componentes/gadi/oficios/formEditarOficios'
import { FormExcluirOficio } from './componentes/gadi/oficios/formExcluirOficios'
//RELAÇÃO DE REMESSA
import { RelRemessa } from './componentes/gadi/relacaoRemessa/relacaoRemessas'
import { FormCadRelRemessa } from './componentes/gadi/relacaoRemessa/formCadRelRemessa'
import { FormEditarRelRemessa } from './componentes/gadi/relacaoRemessa/formEditarRelRemessa'
import { FormViewRelRemessa } from './componentes/gadi/relacaoRemessa/formViewRelRemessa'
import { FormExcluirRelRemessa } from './componentes/gadi/relacaoRemessa/formExcluirRelRemessa'
//RELATÓRIOS
import { Relatorios } from './componentes/gadi/relatorios/relatorios'
import { FormCadRelatorios } from './componentes/gadi/relatorios/formcadrelatorios'
import { isAuthenticated } from './componentes/auth';
import { acesso1 } from './componentes/auth';


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component { ...props} />
    ) : (
      <Redirect to = {{pathname:"/", state: {from: props.location}}} />
    )
  )}/>
)

const AcessoGadi = ({component: Component, ...rest}) =>(
  <Route {...rest} render={props => (
    acesso1()? (
      <Component { ...props} />
    ) : (
      <Redirect to = {{pathname:"/", state: {from: props.location}}} />
    )
  )}/>
)

function App() {

  return (
    <div>
      <BrowserRouter>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/menu" component={Menu} />
            <PrivateRoute path="/menuvert" component={MenuVert} />
            <PrivateRoute path="/header" component={Header} />
            
            
            {/* COMUNICADOS */}
            <AcessoGadi  path="/comunicados" component={Comunicados} />
            <PrivateRoute path="/formComunicados" component={FormCadComunicado} />
            <AcessoGadi path="/formViewComunicados/:id" component={FormViewComunicados} />
            <AcessoGadi path="/formEditarComunicados/:id" component={FormEditComunicados} />
            <AcessoGadi path="/formExcluirComunicados/:id" component={FormExcluirComunicados} />
            {/* DESPACHOS */}
            <PrivateRoute path="/despachos" component={Despachos} />
            <PrivateRoute path="/formDespachos" component={FormCadDespacho} />
            <PrivateRoute path="/formViewDespachos/:id" component={FormViewDespachos} />
            <PrivateRoute path="/FormEditarDespachos/:id" component={FormEditarDespachos} />
            <PrivateRoute path="/FormSaidaDespachos/:id" component={FormSaidaDespachos} />
            <PrivateRoute path="/FormExcluirDespachos/:id" component={FormExcluirDespachos} />
            {/* INSTRUÇÕES */}
            <PrivateRoute path="/instrucoes" component={Instrucoes} />
            <PrivateRoute path="/formInstrucao" component={FormCadInstrucao} />
            <PrivateRoute path="/formViewInstrucao/:id" component={FormViewInstrucao} />
            <PrivateRoute path="/formEditarInstrucao/:id" component={FormEditarInstrucao} />
            <PrivateRoute path="/formExcluirInstrucao/:id" component={FormExcluirInstrucao} />
            {/* MEMORANDOS*/}
            <PrivateRoute path="/Memorandos" component={Memorandos} />
            <PrivateRoute path="/formMemorando" component={FormCadMemorando} />
            <PrivateRoute path="/formViewMemorando/:id" component={FormViewMemorando} />
            <PrivateRoute path="/formEditarMemorando/:id" component={FormEditarMemorando} />
            <PrivateRoute path="/formExcluirMemorando/:id" component={FormExcluirMemorando} />
            {/* NUMERO DE REFERÊNCIA - INFORMAÇÃO */}
            <PrivateRoute path="/NumReferencia" component={NumReferencia} />
            <PrivateRoute path="/formNumReferencias" component={FormCadNumRef} />
            <PrivateRoute path="/formViewNumReferencias/:id" component={FormViewNumRef} />
            <PrivateRoute path="/formEditarNumReferencias/:id" component={FormEditarNumRef} />
            <PrivateRoute path="/formSaidaNumReferencias/:id" component={FormSaidaNumRef} />
            <PrivateRoute path="/formExcluirNumReferencias/:id" component={FormExcluirNumRef} />
            {/* OFÍCIOS */}
            <PrivateRoute path="/Oficios" component={Oficios} />
            <PrivateRoute path="/formCadOficios" component={FormCadOficios} />
            <PrivateRoute path="/formViewOficios/:id" component={FormViewOficio} />
            <PrivateRoute path="/formEditarOficios/:id" component={FormEditarOficio} />
            <PrivateRoute path="/formExcluirOficios/:id" component={FormExcluirOficio} />
            {/* RELAÇÃO DE REMESSA */}
            <PrivateRoute path="/RelRemessa" component={RelRemessa} />
            <PrivateRoute path="/FormCadRelRemessa" component={FormCadRelRemessa} />
            <PrivateRoute path="/formViewRelRemessa/:id" component={FormViewRelRemessa} />
            <PrivateRoute path="/formEditarRelRemessa/:id" component={FormEditarRelRemessa} />
            <PrivateRoute path="/formExclurRelRemessa/:id" component={FormExcluirRelRemessa} />
            {/* RELATÓRIOS */}
            <PrivateRoute path="/Relatorios" component={Relatorios} />
            <PrivateRoute path="/formRelatorios" component={FormCadRelatorios} />
          </Switch>
        </Router>
      </BrowserRouter>

    </div>
  );
}

export default App;
