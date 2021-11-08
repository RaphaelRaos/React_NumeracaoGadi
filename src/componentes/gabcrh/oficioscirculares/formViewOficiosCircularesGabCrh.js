import React, {useState, useEffect} from 'react';
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoOficioCircular } from '../../styles/oficioCircular/styles';
import { Link } from 'react-router-dom';

export const FormViewOficioCircularGabCrh = (props) => {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getOficioCircularGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_OFICIOCIRCULAR + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.oficioCircular)
                })        }
        
        getOficioCircularGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR OFICIO CIRCULAR</Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosCircularesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoOficioCircular>NÚMERO OFICIO CIRCULAR: {data.numero_oficioCircular}</ConteudoOficioCircular>
                    <ConteudoOficioCircular>ASSUNTO OFICIO CIRCULAR: {data.assuntooficioCircular}</ConteudoOficioCircular>                    
                    <ConteudoOficioCircular>DATA EMISSÃO OFICIO CIRCULAR: {data.datElaboracao_oficioCircular}</ConteudoOficioCircular>
                    <ConteudoOficioCircular>EXECUTOR: {data.executor_oficioCircular}</ConteudoOficioCircular>
                    <ConteudoOficioCircular>SETOR CADASTRANTE: {data.setoroficioCircular}</ConteudoOficioCircular>
                    <ConteudoOficioCircular>OBSERVAÇÃO: {data.observacao_oficioCircular}</ConteudoOficioCircular>              
                </div>                
            </Container>
        </div>
    );

    
}