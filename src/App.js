import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';

import { Login } from './componentes/login/login'
import { Menu } from './componentes/menu/menu'
import { Header } from './componentes/header/header'
import { Pesquisa } from './componentes/pesquisa/pesquisa'

//COMUNICADOS
import { Comunicados } from './componentes/comunicados/comunicados'
import { FormCadComunicado } from './componentes/comunicados/formcadastrocomunicados'
import { FormViewComunicados } from './componentes/comunicados/formViewComunicados'
import { FormEditComunicados } from './componentes/comunicados/formEditarComunicados'
import { FormExcluirComunicados } from './componentes/comunicados/formExcluirComunicado'
//DESPACHOS
import { Despachos } from './componentes/despachos/despachos'
import { FormCadDespacho } from './componentes/despachos/formCadastroDespachos'
import { FormViewDespachos } from './componentes/despachos/formViewDespachos'
import { FormEditarDespachos } from './componentes/despachos/formEditarDespachos'
import { FormSaidaDespachos } from './componentes/despachos/formSaidaDespachos'
import { FormExcluirDespachos } from './componentes/despachos/formExcluirDespacho'
//INSTRUÇÕES
import { Instrucoes } from './componentes/instrucao/instrucoes'
import { FormCadInstrucao } from './componentes/instrucao/formCadInstrucao'
import { FormViewInstrucao } from './componentes/instrucao/formViewInstrucao'
import { FormEditarInstrucao } from './componentes/instrucao/formEditarInstrucao'
import { FormExcluirInstrucao } from './componentes/instrucao/formExcluirInstrucao'
//MEMORANDOS
import { Memorandos } from './componentes/memorando/memorandos'
import { FormCadMemorando } from './componentes/memorando/formCadMemorando'
import { FormViewMemorando } from './componentes/memorando/formViewMemorando'
import { FormEditarMemorando } from './componentes/memorando/formEditarMemorando'
import { FormExcluirMemorando } from './componentes/memorando/formExcluirMemorando'
//NÚMERO DE REFERÊNCIA
import { NumReferencia } from './componentes/numeroReferencia/numeroReferencia'
import { FormCadNumRef } from './componentes/numeroReferencia/formCadNumReferencia'
import { FormViewNumRef } from './componentes/numeroReferencia/formViewNumReferencia'
import { FormEditarNumRef } from './componentes/numeroReferencia/formEditarNumReferencia'
import { FormSaidaNumRef } from './componentes/numeroReferencia/formSaidaNumReferencia'
import { FormExcluirNumRef } from './componentes/numeroReferencia/formExcluirNumReferencia'
//OCORRÊNCIAS
import { Ocorrencias } from './componentes/ocorrencias/ocorrencias'
import { FormCadOcorrencias } from './componentes/ocorrencias/formcadocorrencias'
//OFÍCIOS
import { Oficios } from './componentes/oficios/oficios'
import { FormCadOficios } from './componentes/oficios/formCadOficios'
import { FormViewOficio } from './componentes/oficios/formViewOficios'
import { FormEditarOficio } from './componentes/oficios/formEditarOficios'
import { FormExcluirOficio } from './componentes/oficios/formExcluirOficios'
//RELAÇÃO DE REMESSA
import { RelRemessa } from './componentes/relacaoRemessa/relacaoRemessas'
import { FormCadRelRemessa } from './componentes/relacaoRemessa/formCadRelRemessa'
import { FormEditarRelRemessa } from './componentes/relacaoRemessa/formEditarRelRemessa'
import { FormViewRelRemessa } from './componentes/relacaoRemessa/formViewRelRemessa'
import { FormExcluirRelRemessa } from './componentes/relacaoRemessa/formExcluirRelRemessa'
//RELATÓRIOS
import { Relatorios } from './componentes/relatorios/relatorios'
import { FormCadRelatorios } from './componentes/relatorios/formcadrelatorios'
import { isAuthenticated } from './componentes/auth';


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component { ...props} />
    ) : (
      <Redirect to = {{pathname:'/', state: {from: props.location}}} />
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
            <PrivateRoute path="/header" component={Header} />
            <PrivateRoute path="/pesquisa" component={Pesquisa} />

            {/* COMUNICADOS */}
            <PrivateRoute path="/comunicados" component={Comunicados} />
            <PrivateRoute path="/formComunicados" component={FormCadComunicado} />
            <PrivateRoute path="/formViewComunicados/:id" component={FormViewComunicados} />
            <PrivateRoute path="/formEditarComunicados/:id" component={FormEditComunicados} />
            <PrivateRoute path="/formExcluirComunicados/:id" component={FormExcluirComunicados} />
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
            {/* OCORRÊNCIAS */}
            <PrivateRoute path="/Ocorrencias" component={Ocorrencias} />
            <PrivateRoute path="/formOcorrencias" component={FormCadOcorrencias} />
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
