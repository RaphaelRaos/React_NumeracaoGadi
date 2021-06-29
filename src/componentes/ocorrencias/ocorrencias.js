import React from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const Ocorrencias = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> OCORRÊNCIAS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formOcorrencias">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo> 
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DESPACHO</th>
                            <th>PROCESSO / SISRAD</th>
                            <th>UA</th>
                            <th>UO</th>
                            <th>INTERESSADO</th>
                            <th>ASSUNTO</th>
                            <th>DATA ENTRADA</th>
                            <th>OBS</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <LineTD></LineTD>
                        <LineTD></LineTD>
                        <LineTD></LineTD>
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