import React from 'react'
import { Header } from '../header/header';
import {Link} from 'react-router-dom';
import { Container, BotaoMenu, DivMenu, Body} from './styles';



export const Menu = () => {

    return (
        <Body>
         <Header/>
            <div>
                <br></br>
                <Container>
                    <DivMenu>
                        <Link to="/comunicados"><BotaoMenu>COMUNICADOS</BotaoMenu></Link>
                        <Link to ="/despachos"><BotaoMenu>DESPACHOS</BotaoMenu></Link>
                        <Link to ="/instrucoes"><BotaoMenu>INSTRUÇÕES</BotaoMenu></Link>
                        <Link to ="/Memorandos"><BotaoMenu>MEMORANDOS</BotaoMenu></Link>
                    </DivMenu>
                    <DivMenu>                        
                        <Link to ="/NumReferencia"><BotaoMenu>NÚMERO DE REFERÊNCIA</BotaoMenu></Link>
                        <Link to ="/Oficios"><BotaoMenu>OFÍCIOS</BotaoMenu></Link>
                        <Link to ="/RelRemessa"><BotaoMenu>RELAÇÃO DE REMESSA</BotaoMenu></Link>
                        <Link to ="/Relatorios"><BotaoMenu>RELATÓRIOS</BotaoMenu></Link>
                    </DivMenu>
                    <DivMenu>                      

                    </DivMenu>   
                </Container>
            </div>
        </Body>
    );
}