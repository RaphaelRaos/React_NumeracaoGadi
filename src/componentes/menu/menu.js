import React from 'react'
import { Header } from '../header/header';
import {Link} from 'react-router-dom';
import { Container, BotaoMenu, DivMenu, Body} from './styles';



export const Menu = () => {

    return (
        <Body>
         <Header/>
         <div>
            <Container>
                <DivMenu>
                    <Link to="/comunicados"><BotaoMenu>COMUNICADOS</BotaoMenu></Link>
                    <Link to ="/despachos"><BotaoMenu>DESPACHOS</BotaoMenu></Link>
                    <Link to ="/instrucoes"><BotaoMenu>INSTRUÇÕES</BotaoMenu></Link>
                </DivMenu>
                <DivMenu>
                    <Link to ="/Memorandos"><BotaoMenu>MEMORANDOS</BotaoMenu></Link>
                    <Link to ="/NumReferencia"><BotaoMenu>NÚMERO DE REFERÊNCIA</BotaoMenu></Link>    
                    <Link to ="/Ocorrencias"><BotaoMenu>OCORRÊNCIAS</BotaoMenu></Link>    
                </DivMenu>
                <DivMenu>
                    <Link to ="/Oficios">  <BotaoMenu>OFÍCIOS</BotaoMenu></Link>  
                    <Link to ="/RelRemessa"><BotaoMenu>RELAÇÃO DE REMESSA</BotaoMenu></Link>    
                    <Link to ="/Relatorios"><BotaoMenu>RELATÓRIOS</BotaoMenu></Link>    
                </DivMenu>   
            </Container>
         </div>
        </Body>
    );
}