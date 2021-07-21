import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ConteudoMemorando} from './styles';
import { Header } from '../header/header';
import {Link} from 'react-router-dom';


export const FormViewMemorando = (props) =>{

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getMemorando = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/memorandos/visualizar_memorando.php?id="+ id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.memorando);
            })
        }
        getMemorando();
    },[id]);

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>VISUALIZAR INSTRUÇÕES</Titulo>
                    <BotaoAcao>                            
                        <Link to="/memorandos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <ConteudoMemorando> NÚMERO INSTRUÇÃO: {data.numero_memorando} </ConteudoMemorando>
                <ConteudoMemorando> INTERESSADO : {data.interessado_memorando} </ConteudoMemorando>
                <ConteudoMemorando> ASSUNTO : {data.assunto_memorando} </ConteudoMemorando>
                <ConteudoMemorando> DATA EMISSÃO : {data.datEmissao_memorando} </ConteudoMemorando>
                <ConteudoMemorando> EXECUTOR : {data.executor_memorando} </ConteudoMemorando>
                <ConteudoMemorando> SETOR : {data.setor_memorando} </ConteudoMemorando>
                <ConteudoMemorando> OBSERVAÇÃO : {data.observacao_memorando} </ConteudoMemorando>
            </Container>
        </div>
    )
}