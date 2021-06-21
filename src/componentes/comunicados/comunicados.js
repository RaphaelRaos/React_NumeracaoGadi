import React from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';


export const Comunicados = () => {

    return (
        <div>
            <Container>
                 <ConteudoTitulo>
                    <Titulo>COMUNICADOS</Titulo>
                    <BotaoAcao>                            
                        <Link>
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo> 
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ASSUNTO</th>
                            <th>DATA ELABORAÇÃO</th>
                            <th>EXECUTOR</th>
                            <th>ÁREA</th>
                            <th>OBSERVAÇÃO</th>
                            <th>AÇÕES</th>                            
                        </tr>
                    </thead>
                    <tbody>
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