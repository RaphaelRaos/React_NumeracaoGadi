import React, {useEffect, useState} from "react";
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoRemessa } from '../../styles/remessas/styles';
import { Link } from 'react-router-dom';

export const FormViewRemessaGabCrh = (props) => {


    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getRemessaGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_REMESSA + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.remessa)
                })        }
        
        getRemessaGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR REMESSA</Titulo>
                    <BotaoAcao>
                        <Link to="/RemessaGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoRemessa>NÚMERO REMESSA: {data.numero_remessa}</ConteudoRemessa>
                    <ConteudoRemessa>ASSUNTO REMESSA: {data.assuntoremessa}</ConteudoRemessa>                    
                    <ConteudoRemessa>DATA EMISSÃO REMESSA: {data.datElaboracao_remessa}</ConteudoRemessa>
                    <ConteudoRemessa>EXECUTOR: {data.executor_remessa}</ConteudoRemessa>
                    <ConteudoRemessa>SETOR CADASTRANTE: {data.setorremessa}</ConteudoRemessa>
                    <ConteudoRemessa>OBSERVAÇÃO: {data.observacao_remessa}</ConteudoRemessa>              
                </div>                
            </Container>
        </div>
    );
    
    
}