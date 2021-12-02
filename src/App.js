import React from 'react'
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { PermissionCrh, PermissionGadi } from './componentes/Permissoes/PermissionGate'
import { Login } from './componentes/login/login'
import { MenuVert } from './componentes/menuSetores/menuVert'
import { Header } from './componentes/header/header'
import { Home } from './componentes/home/home'
import { PrivateRoute } from './componentes/Autenticacao/PrivateRoute';


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



//GABCRH
import { MenuGabCrh } from './componentes/gabcrh/menu/menuGabCrh';
//GABCRH//COMUNICADOS
import { ComunicadosGabCrh } from './componentes/gabcrh/comunicados/comunicadosGabCrh';
import { FormCadComunicadosGabCrh } from './componentes/gabcrh/comunicados/formCadastroComunicadoGabCrh';
import { FormEditComunicadosGabCrh } from './componentes/gabcrh/comunicados/formEditarComunicadoGabCrh';
import { FormExcluirComunicadosGabCrh } from './componentes/gabcrh/comunicados/formExcluirComunicadoGabCrh';
import { FormViewComunicadosGabCrh } from './componentes/gabcrh/comunicados/formViewComunicadoGabCrh';
//GABCRH//DESPACHOS
import { DespachosGabCrh } from './componentes/gabcrh/despachos/despachosGabCrh';
import { FormCadDespachosGabCrh } from './componentes/gabcrh/despachos/formCadastroDespachosGabCrh';
import { FormEditDespachosGabCrh } from './componentes/gabcrh/despachos/formEditarDespachosGabCrh';
import { FormExcluirDespachosGabCrh } from './componentes/gabcrh/despachos/formExcluirDespachosGabCrh';
import { FormViewDespachosGabCrh } from './componentes/gabcrh/despachos/formViewDespachosGabCrh';
//GABCRH//INFORMACOES
import { InformacoesGabCrh } from './componentes/gabcrh/informacoes/informacoesGabCrh';
import { FormCadInformacaoGabCrh } from './componentes/gabcrh/informacoes/formCadastroInformacaoGabCrh';
import { FormEditInformacaoGabCrh } from './componentes/gabcrh/informacoes/formEditarInformacaoGabCrh';
import { FormExcluirInformacaoGabCrh } from './componentes/gabcrh/informacoes/formExcluirInformacaoGabCrh';
import { FormViewInformacaoGabCrh } from './componentes/gabcrh/informacoes/formViewInformacaoGabCrh';
//GABCRH//INSTRUCOES
import { InstrucoesGabCrh } from './componentes/gabcrh/instrucoes/instrucoesGabCrh';
import { FormCadInstrucaoGabCrh } from './componentes/gabcrh/instrucoes/formCadastroInstrucaoGabCrh';
import { FormEditInstrucaoGabCrh } from './componentes/gabcrh/instrucoes/formEditarInstrucaoGabCrh';
import { FormExcluirInstrucaoGabCrh } from './componentes/gabcrh/instrucoes/formExcluirInstrucaoGabCrh';
import { FormViewInstrucaoGabCrh } from './componentes/gabcrh/instrucoes/formViewInstrucaoGabCrh';
//GABCRH//MEMORANDOS
import { MemorandosGabCrh } from './componentes/gabcrh/memorandos/memorandosGabCrh';
import { FormCadMemorandoGabCrh } from './componentes/gabcrh/memorandos/formCadastroMemorandoGabCrh';
import { FormEditMemorandoGabCrh } from './componentes/gabcrh/memorandos/formEditarMemorandoGabCrh';
import { FormExcluirMemorandoGabCrh } from './componentes/gabcrh/memorandos/formExcluirMemorandoGabCrh';
import { FormViewMemorandoGabCrh } from './componentes/gabcrh/memorandos/formViewMemorandoGabCrh';
//GABCRH//MEMORANDOCIRCULAR
import { MemoCircularGabCrh } from './componentes/gabcrh/memocirculares/memorandosCircularesGabCrh';
import { FormCadMemoCircularGabCrh } from './componentes/gabcrh/memocirculares/formCadastroMemoCircularesGabCrh';
import { FormEditMemoCircularGabCrh } from './componentes/gabcrh/memocirculares/formEditarMemoCircularesGabCrh';
import { FormExcluirMemoCircularGabCrh } from './componentes/gabcrh/memocirculares/formExcluirMemoCircularesGabCrh';
import { FormViewMemoCircularGabCrh } from './componentes/gabcrh/memocirculares/formViewMemoCircularesGabCrh';
//GABCRH//OFICIOS
import { OficiosGabCrh } from './componentes/gabcrh/oficios/oficiosGabCrh';
import { FormCadOficiosGabCrh } from './componentes/gabcrh/oficios/formCadastroOficiosGabCrh';
import { FormEditOficiosGabCrh } from './componentes/gabcrh/oficios/formEditarOficiosGabCrh';
import { FormExcluirOficiosGabCrh } from './componentes/gabcrh/oficios/formExcluirOficiosGabCrh';
import { FormViewOficiosGabCrh } from './componentes/gabcrh/oficios/formViewOficiosGabCrh';
//GABCRH//OFICIOCIRCULAR
import { OficioCircularGabCrh } from './componentes/gabcrh/oficioscirculares/oficiosCircularesGabCrh';
import { FormCadOficioCircularGabCrh } from './componentes/gabcrh/oficioscirculares/formCadastroOficiosCircularesGabCrh';
import { FormEditOficioCircularGabCrh } from './componentes/gabcrh/oficioscirculares/formEditarOficiosCircularesGabCrh';
import { FormExcluirOficioCircularGabCrh } from './componentes/gabcrh/oficioscirculares/formExcluirOficiosCircularesGabCrh';
import { FormViewOficioCircularGabCrh } from './componentes/gabcrh/oficioscirculares/formViewOficiosCircularesGabCrh';
//GABCRH//PORTARIAS
import { PortariaGabCrh } from './componentes/gabcrh/portarias/portariasGabCrh';
import { FormCadPortariaGabCrh } from './componentes/gabcrh/portarias/formCadastrarPortariaGabCrh';
import { FormEditPortariaGabCrh } from './componentes/gabcrh/portarias/formEditarPortariaGabCrh';
import { FormExcluirPortariaGabCrh } from './componentes/gabcrh/portarias/formExcluirPortariaGabCrh';
import { FormViewPortariaGabCrh } from './componentes/gabcrh/portarias/formViewPortariaGabCrh';
//GABCRH//REMESSAS
import { RemessaGabCrh } from './componentes/gabcrh/remessas/remessasGabCrh';
import { FormCadRemessaGabCrh } from './componentes/gabcrh/remessas/formCadastrarRemessaGabCrh';
import { FormEditRemessaGabCrh } from './componentes/gabcrh/remessas/formEditarRemessaGabCrh';
import { FormExcluirRemessaGabCrh } from './componentes/gabcrh/remessas/formExcluirRemessaGabCrh';
import { FormViewRemessaGabCrh } from './componentes/gabcrh/remessas/formViewRemessaGabCrh';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/menuvert" component={MenuVert} />
            <PrivateRoute exact path="/header" component={Header} />
            <PrivateRoute exact path='/home' component={Home} />

            <PermissionCrh permissions={['canSeeForm']}>
              <PermissionGadi permissions={['canSeeForm']}>
                {/* GADI*/}
                <PrivateRoute exact path="/menu" component={Menu} />
                {/* COMUNICADOS */}
                <PrivateRoute exact path="/comunicados" component={Comunicados} />
                <PrivateRoute exact path="/formComunicados" component={FormCadComunicado} />
                <PrivateRoute exact path="/formViewComunicados/:id" component={FormViewComunicados} />
                <PrivateRoute exact path="/formEditarComunicados/:id" component={FormEditComunicados} />
                <PrivateRoute exact path="/formExcluirComunicados/:id" component={FormExcluirComunicados} />
                {/* DESPACHOS */}
                <PrivateRoute exact path="/despachos" component={Despachos} />
                <PrivateRoute exact path="/formDespachos" component={FormCadDespacho} />
                <PrivateRoute exact path="/formViewDespachos/:id" component={FormViewDespachos} />
                <PrivateRoute exact path="/FormEditarDespachos/:id" component={FormEditarDespachos} />
                <PrivateRoute exact path="/FormSaidaDespachos/:id" component={FormSaidaDespachos} />
                <PrivateRoute exact path="/FormExcluirDespachos/:id" component={FormExcluirDespachos} />
                {/* INSTRUÇÕES */}
                <PrivateRoute exact path="/instrucoes" component={Instrucoes} />
                <PrivateRoute exact path="/formInstrucao" component={FormCadInstrucao} />
                <PrivateRoute exact path="/formViewInstrucao/:id" component={FormViewInstrucao} />
                <PrivateRoute exact path="/formEditarInstrucao/:id" component={FormEditarInstrucao} />
                <PrivateRoute exact path="/formExcluirInstrucao/:id" component={FormExcluirInstrucao} />
                {/* MEMORANDOS*/}
                <PrivateRoute exact path="/Memorandos" component={Memorandos} />
                <PrivateRoute exact path="/formMemorando" component={FormCadMemorando} />
                <PrivateRoute exact path="/formViewMemorando/:id" component={FormViewMemorando} />
                <PrivateRoute exact path="/formEditarMemorando/:id" component={FormEditarMemorando} />
                <PrivateRoute exact path="/formExcluirMemorando/:id" component={FormExcluirMemorando} />
                {/* NUMERO DE REFERÊNCIA - INFORMAÇÃO */}
                <PrivateRoute exact path="/NumReferencia" component={NumReferencia} />
                <PrivateRoute exact path="/formNumReferencias" component={FormCadNumRef} />
                <PrivateRoute exact path="/formViewNumReferencias/:id" component={FormViewNumRef} />
                <PrivateRoute exact path="/formEditarNumReferencias/:id" component={FormEditarNumRef} />
                <PrivateRoute exact path="/formSaidaNumReferencias/:id" component={FormSaidaNumRef} />
                <PrivateRoute exact path="/formExcluirNumReferencias/:id" component={FormExcluirNumRef} />
                {/* OFÍCIOS */}
                <PrivateRoute exact path="/Oficios" component={Oficios} />
                <PrivateRoute exact path="/formCadOficios" component={FormCadOficios} />
                <PrivateRoute exact path="/formViewOficios/:id" component={FormViewOficio} />
                <PrivateRoute exact path="/formEditarOficios/:id" component={FormEditarOficio} />
                <PrivateRoute exact path="/formExcluirOficios/:id" component={FormExcluirOficio} />
                {/* RELAÇÃO DE REMESSA */}
                <PrivateRoute exact path="/RelRemessa" component={RelRemessa} />
                <PrivateRoute exact path="/FormCadRelRemessa" component={FormCadRelRemessa} />
                <PrivateRoute exact path="/formViewRelRemessa/:id" component={FormViewRelRemessa} />
                <PrivateRoute exact path="/formEditarRelRemessa/:id" component={FormEditarRelRemessa} />
                <PrivateRoute exact path="/formExclurRelRemessa/:id" component={FormExcluirRelRemessa} />
                {/* RELATÓRIOS */}
                <PrivateRoute exact path="/Relatorios" component={Relatorios} />
                <PrivateRoute exact path="/formRelatorios" component={FormCadRelatorios} />
                {/*/ FIM GADI*/}
              </PermissionGadi>

              {/*GAB SECRETARIO*/}
              <PrivateRoute exact path="/MenuGabCrh" component={MenuGabCrh} />
              {/*COMUNICADOS*/}
              <PrivateRoute exact path="/ComunicadosGabCrh" component={ComunicadosGabCrh} />
              <PrivateRoute exact path="/formCadComunicadosGabCrh/" component={FormCadComunicadosGabCrh} />
              <PrivateRoute exact path="/formEditComunicadosGabCrh/:id" component={FormEditComunicadosGabCrh} />
              <PrivateRoute exact path="/formExcluirComunicadosGabCrh/:id" component={FormExcluirComunicadosGabCrh} />
              <PrivateRoute exact path="/formViewComunicadosGabCrh/:id" component={FormViewComunicadosGabCrh} />
              {/*DESPACHOS*/}
              <PrivateRoute exact path="/DespachosGabCrh" component={DespachosGabCrh} />
              <PrivateRoute exact path="/formCadDespachosGabCrh/" component={FormCadDespachosGabCrh} />
              <PrivateRoute exact path="/formEditDespachosGabCrh/:id" component={FormEditDespachosGabCrh} />
              <PrivateRoute exact path="/formExcluirDespachosGabCrh/:id" component={FormExcluirDespachosGabCrh} />
              <PrivateRoute exact path="/formViewDespachosGabCrh/:id" component={FormViewDespachosGabCrh} />
              {/*INFORMACAO*/}
              <PrivateRoute exact path="/InformacoesGabCrh" component={InformacoesGabCrh} />
              <PrivateRoute exact path="/formCadInformacaoGabCrh/" component={FormCadInformacaoGabCrh} />
              <PrivateRoute exact path="/formEditInformacaoGabCrh/:id" component={FormEditInformacaoGabCrh} />
              <PrivateRoute exact path="/formExcluirInformacaoGabCrh/:id" component={FormExcluirInformacaoGabCrh} />
              <PrivateRoute exact path="/formViewInformacaoGabCrh/:id" component={FormViewInformacaoGabCrh} />
              {/*INSTRUÇÃO*/}
              <PrivateRoute exact path="/InstrucoesGabCrh" component={InstrucoesGabCrh} />
              <PrivateRoute exact path="/formCadInstrucaoGabCrh/" component={FormCadInstrucaoGabCrh} />
              <PrivateRoute exact path="/formEditInstrucaoGabCrh/:id" component={FormEditInstrucaoGabCrh} />
              <PrivateRoute exact path="/formExcluirInstrucaoGabCrh/:id" component={FormExcluirInstrucaoGabCrh} />
              <PrivateRoute exact path="/formViewInstrucaoGabCrh/:id" component={FormViewInstrucaoGabCrh} />
              {/*MEMORANDOS*/}
              <PrivateRoute exact path="/MemorandoGabCrh" component={MemorandosGabCrh} />
              <PrivateRoute exact path="/formCadMemorandoGabCrh/" component={FormCadMemorandoGabCrh} />
              <PrivateRoute exact path="/formEditMemorandoGabCrh/:id" component={FormEditMemorandoGabCrh} />
              <PrivateRoute exact path="/formExcluirMemorandoGabCrh/:id" component={FormExcluirMemorandoGabCrh} />
              <PrivateRoute exact path="/formViewMemorandoGabCrh/:id" component={FormViewMemorandoGabCrh} />
              {/*MEMORANDOS CIRCULARES*/}
              <PrivateRoute exact path="/MemorandoCircularGabCrh" component={MemoCircularGabCrh} />
              <PrivateRoute exact path="/formCadMemorandoCircularGabCrh/" component={FormCadMemoCircularGabCrh} />
              <PrivateRoute exact path="/formEditMemorandoCircularGabCrh/:id" component={FormEditMemoCircularGabCrh} />
              <PrivateRoute exact path="/formExcluirMemorandoCircularGabCrh/:id" component={FormExcluirMemoCircularGabCrh} />
              <PrivateRoute exact path="/formViewMemorandoCircularGabCrh/:id" component={FormViewMemoCircularGabCrh} />
              {/*OFICIOS*/}
              <PrivateRoute exact path="/OficiosGabCrh" component={OficiosGabCrh} />
              <PrivateRoute exact path="/formCadOficiosGabCrh/" component={FormCadOficiosGabCrh} />
              <PrivateRoute exact path="/formEditOficiosGabCrh/:id" component={FormEditOficiosGabCrh} />
              <PrivateRoute exact path="/formExcluirOficiosGabCrh/:id" component={FormExcluirOficiosGabCrh} />
              <PrivateRoute exact path="/formViewOficiosGabCrh/:id" component={FormViewOficiosGabCrh} />
              {/*OFICIOS CIRCULARES*/}
              <PrivateRoute exact path="/OficiosCircularesGabCrh" component={OficioCircularGabCrh} />
              <PrivateRoute exact path="/formCadOficioCircularGabCrh/" component={FormCadOficioCircularGabCrh} />
              <PrivateRoute exact path="/formEditOficioCircularGabCrh/:id" component={FormEditOficioCircularGabCrh} />
              <PrivateRoute exact path="/formExcluirOficioCircularGabCrh/:id" component={FormExcluirOficioCircularGabCrh} />
              <PrivateRoute exact path="/formViewOficioCircularGabCrh/:id" component={FormViewOficioCircularGabCrh} />
              {/*PORTARIAS*/}
              <PrivateRoute exact path="/PortariaGabCrh" component={PortariaGabCrh} />
              <PrivateRoute exact path="/formCadPortariaGabCrh/" component={FormCadPortariaGabCrh} />
              <PrivateRoute exact path="/formEditPortariaGabCrh/:id" component={FormEditPortariaGabCrh} />
              <PrivateRoute exact path="/formExcluirPortariaGabCrh/:id" component={FormExcluirPortariaGabCrh} />
              <PrivateRoute exact path="/formViewPortariaGabCrh/:id" component={FormViewPortariaGabCrh} />
              {/*REMESSAS*/}
              <PrivateRoute exact path="/RemessaGabCrh" component={RemessaGabCrh} />
              <PrivateRoute exact path="/formCadRemessaGabCrh/" component={FormCadRemessaGabCrh} />
              <PrivateRoute exact path="/formEditRemessaGabCrh/:id" component={FormEditRemessaGabCrh} />
              <PrivateRoute exact path="/formExcluirRemessaGabCrh/:id" component={FormExcluirRemessaGabCrh} />
              <PrivateRoute exact path="/formViewRemessaGabCrh/:id" component={FormViewRemessaGabCrh} />
            </PermissionCrh>
            {/*FIM GAB SECRETARIO*/}
          </Switch>
        </Router>
      </BrowserRouter>

    </div>
  );
}

export default App;
