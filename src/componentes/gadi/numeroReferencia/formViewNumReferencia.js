import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoReferencia} from './styles';
import { Link } from 'react-router-dom';

export const FormViewNumRef = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getNumReferencia = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_REFERENCIA + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.numeroReferencia)
                })
            }
            getNumReferencia();
        },[id]);

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR NÚMERO DE REFERÊNCIA - INFORMAÇÃO</Titulo>
                    <BotaoAcao>                            
                        <Link to="/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                    </ConteudoTitulo>
                        
                           <div>                                               
                                    <ConteudoReferencia>NÚMERO DE REFERÊNCIA: {data.numero_referencia}</ConteudoReferencia>   
                                    <ConteudoReferencia>NÚMERO DO PROCESSO: {data.num_processo_referencia}</ConteudoReferencia> 
                                    <ConteudoReferencia>UNIDADE ADMINISTRATIVA: {data.desua}</ConteudoReferencia> 
                                    <ConteudoReferencia>UNIDADE ORÇAMENTARIA: {data.desuo}</ConteudoReferencia> 
                                    <ConteudoReferencia>INTERESSADO: {data.interessado_referencia}</ConteudoReferencia> 
                                    <ConteudoReferencia>ASSUNTO: {data.assuntoReferencia}</ConteudoReferencia> 
                                    <ConteudoReferencia>DATA ENTRADA: {data.datEmissao_referencia}</ConteudoReferencia>
                             
                            </div>
                            <div> 
                                                 
                                    <ConteudoReferencia>EXECUTOR: {data.executor_referencia}</ConteudoReferencia> 
                                    <ConteudoReferencia>UNIDADE DE POSSE: {data.area_numReferencia}</ConteudoReferencia> 
                                    <ConteudoReferencia>ANDAMENTO DO PROCESSO: {data.statusProcesso} </ConteudoReferencia> 
                                    <ConteudoReferencia>VIGÊNCIA: {data.vigencia_referencia}</ConteudoReferencia> 
                                    <ConteudoReferencia>Nº BANQUINHO: {data.referencia_banquinho}</ConteudoReferencia>
                                    <ConteudoReferencia>OBSERVAÇÃO: {data.observacao_referencia}</ConteudoReferencia>
                                    
                                                           
                                                           
                            </div>   
                        
            </Container>        
        </div>
    );
}