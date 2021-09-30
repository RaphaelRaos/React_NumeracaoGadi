import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ConteudoInstrucao} from './styles';
import { Header } from '../../header/header';
import {Link} from 'react-router-dom';

export const FormViewInstrucao = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getInstrucao = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_INSTRUCOES + id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.instrucao);
            })
        }
        getInstrucao();
    },[id]);
    return (
       <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>VISUALIZAR INSTRUÇÕES</Titulo>
                    <BotaoAcao>                            
                        <Link to="/instrucoes">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <ConteudoInstrucao> NÚMERO INSTRUÇÃO: {data.numero_instrucao} </ConteudoInstrucao>
                <ConteudoInstrucao> INTERESSADO : {data.interessado_instrucao} </ConteudoInstrucao>
                <ConteudoInstrucao> ASSUNTO : {data.assunto_instrucao} </ConteudoInstrucao>
                <ConteudoInstrucao> DATA EMISSÃO : {data.datEmissao_instrucao} </ConteudoInstrucao>
                <ConteudoInstrucao> EXECUTOR : {data.executor_instrucao} </ConteudoInstrucao>
                <ConteudoInstrucao> SETOR : {data.setor} </ConteudoInstrucao>
                <ConteudoInstrucao> NÚMERO BANQUINHO : {data.referencia_banquinho} </ConteudoInstrucao>
                <ConteudoInstrucao> OBSERVAÇÃO : {data.observacao_instrucao} </ConteudoInstrucao>
            </Container>
        </div> 
    );
}