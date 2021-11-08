import React, {useEffect, useState} from "react";
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoMemorando } from '../../styles/memorandos/styles';
import { Link } from 'react-router-dom';

export const FormViewMemorandoGabCrh = (props) => {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getMemorandoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_MEMORANDO + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.memorando)
                })
        }
        
        getMemorandoGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR MEMORANDO </Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoMemorando>NÚMERO MEMORANDO: {data.numero_memorando}</ConteudoMemorando>
                    <ConteudoMemorando>ASSUNTO MEMORANDO: {data.assuntomemorando}</ConteudoMemorando>                    
                    <ConteudoMemorando>DATA EMISSÃO MEMORANDO: {data.datElaboracao_memorando}</ConteudoMemorando>
                    <ConteudoMemorando>EXECUTOR: {data.executor_memorando}</ConteudoMemorando>
                    <ConteudoMemorando>SETOR CADASTRANTE: {data.setormemorando}</ConteudoMemorando>
                    <ConteudoMemorando>OBSERVAÇÃO: {data.observacao_memorando}</ConteudoMemorando>                    
                   
                </div>
                
            </Container>
        </div>
    );

    
}