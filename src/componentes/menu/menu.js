import React from 'react'
import { Header } from '../header/header';
import {Link} from 'react-router-dom';
import { Container, BotaoMenu, Body, Main, Table, TBODY, TR, TD} from './styles';



export const Menu = () => {

    return (
        <Body>
         <Header/>            
                <br></br>
                <Container>
                    <Main>
                        <Table>                            
                            <TBODY>
                                <TR>
                                    <TD><Link to="/comunicados"><BotaoMenu>COMUNICADOS</BotaoMenu></Link></TD>
                                    <TD><Link to ="/despachos"><BotaoMenu>DESPACHOS</BotaoMenu></Link></TD>
                                    <TD><Link to ="/instrucoes"><BotaoMenu>INSTRUÇÕES</BotaoMenu></Link></TD>  
                                </TR>
                                <TR>
                                    <TD><Link to ="/Memorandos"><BotaoMenu>MEMORANDOS</BotaoMenu></Link></TD>
                                    <TD><Link to ="/NumReferencia"><BotaoMenu>NÚMERO DE REFERÊNCIA</BotaoMenu></Link></TD>
                                    <TD><Link to ="/Oficios"><BotaoMenu>OFÍCIOS</BotaoMenu></Link></TD>
                                </TR>
                                <TR>
                                    <TD><Link to ="/RelRemessa"><BotaoMenu>RELAÇÃO DE REMESSA</BotaoMenu></Link></TD>
                                    <TD><Link to ="/Relatorios"><BotaoMenu>RELATÓRIOS</BotaoMenu></Link></TD>
                                    <TD><BotaoMenu></BotaoMenu></TD>
                                </TR>                                
                            </TBODY>
                        </Table>
                    </Main>                     
                </Container>            
        </Body>
    );
}