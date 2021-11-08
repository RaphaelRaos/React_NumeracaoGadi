import React, {useEffect, useState} from "react";
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoMemoCircular } from '../../styles/memocirculares/styles';
import { Link } from 'react-router-dom';

export const FormViewMemoCircularGabCrh = (props) => {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getMemoCircularGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_MEMOCIRCULARES + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.memorandoCircular)
                })
        }
        
        getMemoCircularGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR MEMORANDO CIRCULAR </Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoCircularGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoMemoCircular>NÚMERO MEMORANDO CIRCULAR: {data.numero_memorandoCircular}</ConteudoMemoCircular>
                    <ConteudoMemoCircular>ASSUNTO MEMORANDO CIRCULAR: {data.assunto_memorandoCircular}</ConteudoMemoCircular>                    
                    <ConteudoMemoCircular>DATA EMISSÃO MEMORANDO CIRCULAR: {data.datElaboracao_memorandoCircular}</ConteudoMemoCircular>
                    <ConteudoMemoCircular>EXECUTOR: {data.executor_memorandoCircular}</ConteudoMemoCircular>
                    <ConteudoMemoCircular>SETOR CADASTRANTE: {data.setormemorandoCircular}</ConteudoMemoCircular>
                    <ConteudoMemoCircular>OBSERVAÇÃO: {data.observacao_memorandoCircular}</ConteudoMemoCircular>                    
                   
                </div>
                
            </Container>
        </div>
    );

    
}