import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, TH, AlertDanger, AlertSuccess, ConteudoReferencia, Tbody } from './styles';
import { Link } from 'react-router-dom';

export const FormViewNumRef = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getNumReferencia = async() => {
            const getNumReferencia =async() =>{
                await fetch("http://localhost/dashboard/sistemaNumeracao/num_referencia/visualizar_referencia.php?id=" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.numeroReferencia)
                })
            }
            getNumReferencia();
        }
    },[id]);
    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>VISUALIZAR NÚMERO DE REFERÊNCIA - INFORMAÇÃO</Titulo>
                    <BotaoAcao>                            
                        <Link to="/numeroReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                    </ConteudoTitulo>
                        
                           <div>
                           
                            <ConteudoReferencia>NÚMERO DE REFERÊNCIA</ConteudoReferencia>   
                           <ConteudoReferencia>NÚMERO DO PROCESSO</ConteudoReferencia> 
                            <ConteudoReferencia>UNIDADE ADMINISTRATIVA</ConteudoReferencia> 
                            <ConteudoReferencia>UNIDADE ORÇAMENTARIA</ConteudoReferencia> 
                            <ConteudoReferencia>INTERESSADO</ConteudoReferencia> 
                            <ConteudoReferencia>ASSUNTO</ConteudoReferencia> 
                            <ConteudoReferencia>DATA ENTRADA</ConteudoReferencia> 
                            </div>
                            <div>                          
                               <ConteudoReferencia>EXECUTOR</ConteudoReferencia> 
                                <ConteudoReferencia>UNIDADE DE POSSE</ConteudoReferencia> 
                                <ConteudoReferencia>SITUAÇÃO</ConteudoReferencia> 
                                <ConteudoReferencia>ANDAMENTO DO PROCESSO: </ConteudoReferencia> 
                                <ConteudoReferencia>OCORRÊNCIA</ConteudoReferencia> 
                                <ConteudoReferencia>VIGÊNCIA</ConteudoReferencia> 
                                <ConteudoReferencia>STATUS</ConteudoReferencia> 
                                <ConteudoReferencia>OBSERVAÇÃO</ConteudoReferencia>                                 
                            </div>   
                        
            </Container>        
        </div>
    );
}