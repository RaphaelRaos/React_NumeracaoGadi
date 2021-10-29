import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContComunicado } from './styles';
import { Link } from 'react-router-dom';

export const FormViewComunicadosGabCrh = (props) => {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    const getComunicadoGabCrh = async () => {
        await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_COMUNICADO + id)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.comunicado)
            })
    }
    useEffect(() => {
        getComunicadoGabCrh();
        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR NÚMERO DE REFERÊNCIA - INFORMAÇÃO</Titulo>
                    <BotaoAcao>
                        <Link to="/ComunicadosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ContComunicado>NÚMERO COMUNICADO: {data.numero_comunicado}</ContComunicado>
                    <ContComunicado>ASSUNTO COMUNICADO: {data.assuntoComunicado}</ContComunicado>                    
                    <ContComunicado>DATA EMISSÃO COMUNICADO: {data.datEmissAo_comunicado}</ContComunicado>
                    <ContComunicado>EXECUTOR: {data.executor_comunicado}</ContComunicado>
                    <ContComunicado>SETOR CADASTRANTE: {data.setorComunicado}</ContComunicado>
                    <ContComunicado>OBSERVAÇÃO: {data.observacao_comunicado}</ContComunicado>                    
                   
                </div>
                
            </Container>
        </div>
    );
}