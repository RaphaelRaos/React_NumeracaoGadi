import React from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const Oficios = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> OFÍCIOS </Titulo>
                    <BotaoAcao>                            
                        <Link to ="/formOficios">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo> 
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO OFICIO</th>
                            <th>INTERESSADO</th>
                            <th>DATA </th>
                            <th>EXECUTOR</th>
                            <th>AÇÕES</th>                                                     
                        </tr>
                    </thead>
                    <tbody>
                        <LineTD></LineTD>
                        <LineTD></LineTD>
                        <LineTD></LineTD>
                        <LineTD></LineTD>
                        <LineTD>
                            <ButtonPrimary>Visualizar</ButtonPrimary>
                            <ButtonPrimary>Editar</ButtonPrimary>
                            <ButtonPrimary>Apagar</ButtonPrimary>
                        </LineTD>
                    </tbody>
                </Table>  
            </Container>
        </div>
    );
}