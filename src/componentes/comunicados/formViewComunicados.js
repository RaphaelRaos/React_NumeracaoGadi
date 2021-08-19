import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContComunicado } from './styles';
import { Header } from '../header/header';
import {Link} from 'react-router-dom';

export const FormViewComunicados = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getComunicados = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_COMUNICADO+ id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.comunicado);
            })
        }
        getComunicados();
    },[id]);
    return (
       <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>VISUALIZAR COMUNICADO</Titulo>
                    <BotaoAcao>                            
                        <Link to="/comunicados">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <ContComunicado>NÚMERO COMUNICADO: {data.numero_comunicado}</ContComunicado>
                <ContComunicado>ASSUNTO COMUNICADO: {data.assunto_comunicado}</ContComunicado> 
                <ContComunicado>DATA DE EMISSÃO : {data.datEmissao_comunicado}</ContComunicado> 
                <ContComunicado>EXECUTOR: {data.executor_comunicado}</ContComunicado> 
                <ContComunicado>AREA: {data.area_comunicado}</ContComunicado> 
                <ContComunicado>NÚMERO COMUNICADO: {data.observacao_comunicado}</ContComunicado>  
               
            </Container>
        </div> 
    );
}