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
                    <BotaoMenu>DESPACHOS</BotaoMenu>
                    <BotaoMenu>INSTRUÇÕES</BotaoMenu>
                </DivMenu>
                <DivMenu>
                    <BotaoMenu>MEMORANDOS</BotaoMenu>
                    <BotaoMenu>NÚMERO DE REFERÊNCIA</BotaoMenu>
                    <BotaoMenu>OCORRÊNCIAS</BotaoMenu>
                </DivMenu>
                <DivMenu>
                    <BotaoMenu>OFÍCIOS</BotaoMenu>
                    <BotaoMenu>RELAÇÃO DE REMESSA</BotaoMenu>
                    <BotaoMenu>RELATÓRIOS</BotaoMenu>
                </DivMenu>   
            </Container>
         </div>
        </Body>
    );
}