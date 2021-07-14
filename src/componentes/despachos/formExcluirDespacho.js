import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';

export const FormExcluirDespachos = () =>{

    return (
        <div>
            <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>EXCLUIR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
            </Container>
        </div>
    );
}