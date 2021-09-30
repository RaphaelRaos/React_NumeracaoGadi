import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ContDespachos} from './styles';
import { Header } from '../../header/header';
import {Link} from 'react-router-dom';

export const FormViewDespachos = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getDespachos = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_DESPACHOS + id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.despacho);
            })
        }
        getDespachos();
    },[id]);
    return (
       <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>VISUALIZAR DESPACHOS</Titulo>
                    <BotaoAcao>                            
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <ContDespachos> NÚMERO DESPACHO: {data.numero_despacho} </ContDespachos>
                <ContDespachos> NÚMERO SISRAD / PROCESSO : {data.numero_sisrad_processo} </ContDespachos>
                <ContDespachos> UNIDADE CADASTRANTE: {data.desua} </ContDespachos>
                <ContDespachos> COORDENADORIA: {data.desuo} </ContDespachos>
                <ContDespachos> INTERESSADO: {data.interessado_despacho} </ContDespachos>
                <ContDespachos> ASSUNTO: {data.assunto_despacho} </ContDespachos>
                <ContDespachos> DATA DE ENTRADA: {data.datEmissao_despacho} </ContDespachos>
                <ContDespachos> EXECUTOR: {data.executor_despacho} </ContDespachos>
                <ContDespachos> SETOR CADASTRANTE: {data.area_despacho} </ContDespachos>
                <ContDespachos> REFERÊNCIA BANQUINHO: {data.referencia_banquinho} </ContDespachos>
                <ContDespachos> OBSERVAÇÕES DESPACHO: {data.observacao_despacho} </ContDespachos>
            </Container>
        </div> 
    );
}