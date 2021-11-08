import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';

import { Login } from './componentes/login/login'
import {MenuVert} from './componentes/menuSetores/menuVert'
import { Header } from './componentes/header/header'


//GADI
import { Menu } from './componentes/gadi/menu/menu'
//GADI//COMUNICADOS
import { Comunicados } from './componentes/gadi/comunicados/comunicados'
import { FormCadComunicado } from './componentes/gadi/comunicados/formCadastroComunicados'
import { FormViewComunicados } from './componentes/gadi/comunicados/formViewComunicados'
import { FormEditComunicados } from './componentes/gadi/comunicados/formEditarComunicados'
import { FormExcluirComunicados } from './componentes/gadi/comunicados/formExcluirComunicado'
//GADI//DESPACHOS
import { Despachos } from './componentes/gadi/despachos/despachos'
import { FormCadDespacho } from './componentes/gadi/despachos/formCadastroDespachos'
import { FormViewDespachos } from './componentes/gadi/despachos/formViewDespachos'
import { FormEditarDespachos } from './componentes/gadi/despachos/formEditarDespachos'
import { FormSaidaDespachos } from './componentes/gadi/despachos/formSaidaDespachos'
import { FormExcluirDespachos } from './componentes/gadi/despachos/formExcluirDespacho'
//GADI//INSTRUÇÕES
import { Instrucoes } from './componentes/gadi/instrucao/instrucoes'
import { FormCadInstrucao } from './componentes/gadi/instrucao/formCadInstrucao'
import { FormViewInstrucao } from './componentes/gadi/instrucao/formViewInstrucao'
import { FormEditarInstrucao } from './componentes/gadi/instrucao/formEditarInstrucao'
import { FormExcluirInstrucao } from './componentes/gadi/instrucao/formExcluirInstrucao'
//GADI//MEMORANDOS
import { Memorandos } from './componentes/gadi/memorando/memorandos'
import { FormCadMemorando } from './componentes/gadi/memorando/formCadMemorando'
import { FormViewMemorando } from './componentes/gadi/memorando/formViewMemorando'
import { FormEditarMemorando } from './componentes/gadi/memorando/formEditarMemorando'
import { FormExcluirMemorando } from './componentes/gadi/memorando/formExcluirMemorando'
//GADI//NÚMERO DE REFERÊNCIA
import { NumReferencia } from './componentes/gadi/numeroReferencia/numeroReferencia'
import { FormCadNumRef } from './componentes/gadi/numeroReferencia/formCadNumReferencia'
import { FormViewNumRef } from './componentes/gadi/numeroReferencia/formViewNumReferencia'
import { FormEditarNumRef } from './componentes/gadi/numeroReferencia/formEditarNumReferencia'
import { FormSaidaNumRef } from './componentes/gadi/numeroReferencia/formSaidaNumReferencia'
import { FormExcluirNumRef } from './componentes/gadi/numeroReferencia/formExcluirNumReferencia'
//GADI//OFÍCIOS
import { Oficios } from './componentes/gadi/oficios/oficios'
import { FormCadOficios } from './componentes/gadi/oficios/formCadOficios'
import { FormViewOficio } from './componentes/gadi/oficios/formViewOficios'
import { FormEditarOficio } from './componentes/gadi/oficios/formEditarOficios'
import { FormExcluirOficio } from './componentes/gadi/oficios/formExcluirOficios'
//GADI//RELAÇÃO DE REMESSA
import { RelRemessa } from './componentes/gadi/relacaoRemessa/relacaoRemessas'
import { FormCadRelRemessa } from './componentes/gadi/relacaoRemessa/formCadRelRemessa'
import { FormEditarRelRemessa } from './componentes/gadi/relacaoRemessa/formEditarRelRemessa'
import { FormViewRelRemessa } from './componentes/gadi/relacaoRemessa/formViewRelRemessa'
import { FormExcluirRelRemessa } from './componentes/gadi/relacaoRemessa/formExcluirRelRemessa'
//GADI//RELATÓRIOS
import { Relatorios } from './componentes/gadi/relatorios/relatorios'
import { FormCadRelatorios } from './componentes/gadi/relatorios/formcadrelatorios'
import { isAuthenticated } from './componentes/auth';


//GABCRH
import { MenuGabCrh } from './componentes/gabcrh/menu/menuGabCrh';
//GABCRH//COMUNICADOS
import {ComunicadosGabCrh} from './componentes/gabcrh/comunicados/comunicadosGabCrh';
import {FormCadComunicadosGabCrh} from './componentes/gabcrh/comunicados/formCadastroComunicadoGabCrh';
import {FormEditComunicadosGabCrh} from './componentes/gabcrh/comunicados/formEditarComunicadoGabCrh';
import {FormExcluirComunicadosGabCrh} from './componentes/gabcrh/comunicados/formExcluirComunicadoGabCrh';
import {FormViewComunicadosGabCrh} from './componentes/gabcrh/comunicados/formViewComunicadoGabCrh';
//GABCRH//DESPACHOS
import {DespachosGabCrh} from './componentes/gabcrh/despachos/despachosGabCrh';
import {FormCadDespachosGabCrh} from './componentes/gabcrh/despachos/formCadastroDespachosGabCrh';
import {FormEditDespachosGabCrh} from './componentes/gabcrh/despachos/formEditarDespachosGabCrh';
import {FormExcluirDespachosGabCrh} from './componentes/gabcrh/despachos/formExcluirDespachosGabCrh';
import {FormViewDespachosGabCrh} from './componentes/gabcrh/despachos/formViewDespachosGabCrh';
//GABCRH//INFORMACOES
import {InformacoesGabCrh} from './componentes/gabcrh/informacoes/informacoesGabCrh';
import {FormCadInformacaoGabCrh} from './componentes/gabcrh/informacoes/formCadastroInformacaoGabCrh';
import {FormEditInformacaoGabCrh} from './componentes/gabcrh/informacoes/formEditarInformacaoGabCrh';
import {FormExcluirInformacaoGabCrh} from './componentes/gabcrh/informacoes/formExcluirInformacaoGabCrh';
import {FormViewInformacaoGabCrh} from './componentes/gabcrh/informacoes/formViewInformacaoGabCrh';
//GABCRH//INSTRUCOES
import {InstrucoesGabCrh} from './componentes/gabcrh/instrucoes/instrucoesGabCrh';
import {FormCadInstrucaoGabCrh} from './componentes/gabcrh/instrucoes/formCadastroInstrucaoGabCrh';
import {FormEditInstrucaoGabCrh} from './componentes/gabcrh/instrucoes/formEditarInstrucaoGabCrh';
import {FormExcluirInstrucaoGabCrh} from './componentes/gabcrh/instrucoes/formExcluirInstrucaoGabCrh';
import {FormViewInstrucaoGabCrh} from './componentes/gabcrh/instrucoes/formViewInstrucaoGabCrh';
//GABCRH//MEMORANDOS
import {MemorandosGabCrh} from './componentes/gabcrh/memorandos/memorandosGabCrh';
import {FormCadMemorandoGabCrh} from './componentes/gabcrh/memorandos/formCadastroMemorandoGabCrh';
import {FormEditMemorandoGabCrh} from './componentes/gabcrh/memorandos/formEditarMemorandoGabCrh';
import {FormExcluirMemorandoGabCrh} from './componentes/gabcrh/memorandos/formExcluirMemorandoGabCrh';
import {FormViewMemorandoGabCrh} from './componentes/gabcrh/memorandos/formViewMemorandoGabCrh';
//GABCRH//MEMORANDOCIRCULAR
import {MemoCircularGabCrh} from './componentes/gabcrh/memocirculares/memorandosCircularesGabCrh';
import {FormCadMemoCircularGabCrh} from './componentes/gabcrh/memocirculares/formCadastroMemoCircularesGabCrh';
import {FormEditMemoCircularGabCrh} from './componentes/gabcrh/memocirculares/formEditarMemoCircularesGabCrh';
import {FormExcluirMemoCircularGabCrh} from './componentes/gabcrh/memocirculares/formExcluirMemoCircularesGabCrh';
import {FormViewMemoCircularGabCrh} from './componentes/gabcrh/memocirculares/formViewMemoCircularesGabCrh';
//GABCRH//OFICIOS
import {OficiosGabCrh} from './componentes/gabcrh/oficios/oficiosGabCrh';
import {FormCadOficiosGabCrh} from './componentes/gabcrh/oficios/formCadastroOficiosGabCrh';
import {FormEditOficiosGabCrh} from './componentes/gabcrh/oficios/formEditarOficiosGabCrh';
import {FormExcluirOficiosGabCrh} from './componentes/gabcrh/oficios/formExcluirOficiosGabCrh';
import {FormViewOficiosGabCrh} from './componentes/gabcrh/oficios/formViewOficiosGabCrh';
//GABCRH//OFICIOCIRCULAR
import {OficioCircularGabCrh} from './componentes/gabcrh/oficioscirculares/oficiosCircularesGabCrh';
import {FormCadOficioCircularGabCrh} from './componentes/gabcrh/oficioscirculares/formCadastroOficiosCircularesGabCrh';
import {FormEditOficioCircularGabCrh} from './componentes/gabcrh/oficioscirculares/formEditarOficiosCircularesGabCrh';
import {FormExcluirOficioCircularGabCrh} from './componentes/gabcrh/oficioscirculares/formExcluirOficiosCircularesGabCrh';
import {FormViewOficioCircularGabCrh} from './componentes/gabcrh/oficioscirculares/formViewOficiosCircularesGabCrh';
//GABCRH//PORTARIAS
import {PortariaGabCrh} from './componentes/gabcrh/portarias/portariasGabCrh';
import {FormCadPortariaGabCrh} from './componentes/gabcrh/portarias/formCadastrarPortariaGabCrh';
import {FormEditPortariaGabCrh} from './componentes/gabcrh/portarias/formEditarPortariaGabCrh';
import {FormExcluirPortariaGabCrh} from './componentes/gabcrh/portarias/formExcluirPortariaGabCrh';
import {FormViewPortariaGabCrh} from './componentes/gabcrh/portarias/formViewPortariaGabCrh';





const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
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
            <PrivateRoute path="/menuvert" component={MenuVert} />
            <PrivateRoute path="/header" component={Header} />
            
            {/* GADI*/}
            <PrivateRoute path="/menu" component={Menu} />
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
            {/*/ FIM GADI*/}            
            
            {/*GAB SECRETARIO*/}
            <PrivateRoute path="/MenuGabCrh" component={MenuGabCrh} />
             {/*COMUNICADOS*/}
             <PrivateRoute path="/ComunicadosGabCrh" component={ComunicadosGabCrh} />
             <PrivateRoute path="/formCadComunicadosGabCrh/" component={FormCadComunicadosGabCrh} /> 
             <PrivateRoute path="/formEditComunicadosGabCrh/:id" component={FormEditComunicadosGabCrh} /> 
             <PrivateRoute path="/formExcluirComunicadosGabCrh/:id" component={FormExcluirComunicadosGabCrh} /> 
             <PrivateRoute path="/formViewComunicadosGabCrh/:id" component={FormViewComunicadosGabCrh} />
             {/*DESPACHOS*/}
             <PrivateRoute path="/DespachosGabCrh" component={DespachosGabCrh} />
             <PrivateRoute path="/formCadDespachosGabCrh/" component={FormCadDespachosGabCrh} /> 
             <PrivateRoute path="/formEditDespachosGabCrh/:id" component={FormEditDespachosGabCrh} /> 
             <PrivateRoute path="/formExcluirDespachosGabCrh/:id" component={FormExcluirDespachosGabCrh} /> 
             <PrivateRoute path="/formViewDespachosGabCrh/:id" component={FormViewDespachosGabCrh} /> 
             {/*INFORMACAO*/}
             <PrivateRoute path="/InformacoesGabCrh" component={InformacoesGabCrh} />
             <PrivateRoute path="/formCadInformacaoGabCrh/" component={FormCadInformacaoGabCrh} /> 
             <PrivateRoute path="/formEditInformacaoGabCrh/:id" component={FormEditInformacaoGabCrh} /> 
             <PrivateRoute path="/formExcluirInformacaoGabCrh/:id" component={FormExcluirInformacaoGabCrh} /> 
             <PrivateRoute path="/formViewInformacaoGabCrh/:id" component={FormViewInformacaoGabCrh} /> 
             {/*INSTRUÇÃO*/}
             <PrivateRoute path="/InstrucoesGabCrh" component={InstrucoesGabCrh} />
             <PrivateRoute path="/formCadInstrucaoGabCrh/" component={FormCadInstrucaoGabCrh} /> 
             <PrivateRoute path="/formEditInstrucaoGabCrh/:id" component={FormEditInstrucaoGabCrh} /> 
             <PrivateRoute path="/formExcluirInstrucaoGabCrh/:id" component={FormExcluirInstrucaoGabCrh} /> 
             <PrivateRoute path="/formViewInstrucaoGabCrh/:id" component={FormViewInstrucaoGabCrh} /> 
             {/*MEMORANDOS*/}
             <PrivateRoute path="/MemorandoGabCrh" component={MemorandosGabCrh} />
             <PrivateRoute path="/formCadMemorandoGabCrh/" component={FormCadMemorandoGabCrh} /> 
             <PrivateRoute path="/formEditMemorandoGabCrh/:id" component={FormEditMemorandoGabCrh} /> 
             <PrivateRoute path="/formExcluirMemorandoGabCrh/:id" component={FormExcluirMemorandoGabCrh} /> 
             <PrivateRoute path="/formViewMemorandoGabCrh/:id" component={FormViewMemorandoGabCrh} /> 
             {/*MEMORANDOS CIRCULARES*/}
             <PrivateRoute path="/MemorandoCircularGabCrh" component={MemoCircularGabCrh} />
             <PrivateRoute path="/formCadMemorandoCircularGabCrh/" component={FormCadMemoCircularGabCrh} /> 
             <PrivateRoute path="/formEditMemorandoCircularGabCrh/:id" component={FormEditMemoCircularGabCrh} /> 
             <PrivateRoute path="/formExcluirMemorandoCircularGabCrh/:id" component={FormExcluirMemoCircularGabCrh} /> 
             <PrivateRoute path="/formViewMemorandoCircularGabCrh/:id" component={FormViewMemoCircularGabCrh} /> 
             {/*OFICIOS*/}
             <PrivateRoute path="/OficiosGabCrh" component={OficiosGabCrh} />
             <PrivateRoute path="/formCadOficiosGabCrh/" component={FormCadOficiosGabCrh} /> 
             <PrivateRoute path="/formEditOficiosGabCrh/:id" component={FormEditOficiosGabCrh} /> 
             <PrivateRoute path="/formExcluirOficiosGabCrh/:id" component={FormExcluirOficiosGabCrh} /> 
             <PrivateRoute path="/formViewOficiosGabCrh/:id" component={FormViewOficiosGabCrh} /> 
             {/*OFICIOS CIRCULARES*/}
             <PrivateRoute path="/OficiosCircularesGabCrh" component={OficioCircularGabCrh} />
             <PrivateRoute path="/formCadOficioCircularGabCrh/" component={FormCadOficioCircularGabCrh} /> 
             <PrivateRoute path="/formEditOficioCircularGabCrh/:id" component={FormEditOficioCircularGabCrh} /> 
             <PrivateRoute path="/formExcluirOficioCircularGabCrh/:id" component={FormExcluirOficioCircularGabCrh} /> 
             <PrivateRoute path="/formViewOficioCircularGabCrh/:id" component={FormViewOficioCircularGabCrh} />
             {/*PORTARIAS*/}
             <PrivateRoute path="/PortariaGabCrh" component={PortariaGabCrh} />
             <PrivateRoute path="/formCadPortariaGabCrh/" component={FormCadPortariaGabCrh} /> 
             <PrivateRoute path="/formEditPortariaGabCrh/:id" component={FormEditPortariaGabCrh} /> 
             <PrivateRoute path="/formExcluirPortariaGabCrh/:id" component={FormExcluirPortariaGabCrh} /> 
             <PrivateRoute path="/formViewPortariaGabCrh/:id" component={FormViewPortariaGabCrh} />  
            
            {/*FIM GAB SECRETARIO*/}
          </Switch>
        </Router>
      </BrowserRouter>

    </div>
  );
}

export default App;
