import React, {useEffect, useState} from "react";
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContDespachos } from '../../styles/despachos/styles';
import { Link } from 'react-router-dom';


export const FormViewDespachosGabCrh = (props) =>{

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getDespachoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_DESPACHOS + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.despacho)
                })
        }
        
        getDespachoGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR DESPACHO </Titulo>
                    <BotaoAcao>
                        <Link to="/DespachosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ContDespachos>NÚMERO DESPACHO: {data.numero_despacho}</ContDespachos>
                    <ContDespachos>ASSUNTO DESPACHO: {data.assuntodespacho}</ContDespachos>                    
                    <ContDespachos>DATA EMISSÃO DESPACHO: {data.datElaboracao_despacho}</ContDespachos>
                    <ContDespachos>EXECUTOR: {data.executor_despacho}</ContDespachos>
                    <ContDespachos>SETOR CADASTRANTE: {data.setordespacho}</ContDespachos>
                    <ContDespachos>OBSERVAÇÃO: {data.setordespacho}</ContDespachos>                    
                   
                </div>
                
            </Container>
        </div>
    );

    
}