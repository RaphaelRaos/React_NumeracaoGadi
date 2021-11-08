import React, {useState, useEffect} from 'react';
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoPortaria } from '../../styles/portarias/styles';
import { Link } from 'react-router-dom';

export const FormViewPortariaGabCrh = (props) => {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getPortariaGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_PORTARIAS + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.portaria)
                })        }
        
        getPortariaGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR PORTARIA</Titulo>
                    <BotaoAcao>
                        <Link to="/PortariaGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoPortaria>NÚMERO PORTARIA: {data.numero_portaria}</ConteudoPortaria>
                    <ConteudoPortaria>ASSUNTO PORTARIA: {data.assuntoportaria}</ConteudoPortaria>                    
                    <ConteudoPortaria>DATA EMISSÃO PORTARIA: {data.datElaboracao_portaria}</ConteudoPortaria>
                    <ConteudoPortaria>EXECUTOR: {data.executor_portaria}</ConteudoPortaria>
                    <ConteudoPortaria>SETOR CADASTRANTE: {data.setorportaria}</ConteudoPortaria>
                    <ConteudoPortaria>OBSERVAÇÃO: {data.observacao_portaria}</ConteudoPortaria>              
                </div>                
            </Container>
        </div>
    );
    
}