import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ContDespachos} from './styles';
import { Header } from '../header/header';
import {Link} from 'react-router-dom';

export const FormViewInstrucao = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getInstrucao = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/instrucoes/visualizar_instrucoes.php?id="+ id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.instrucao);
            })
        }
        getInstrucao();
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
                        <Link to="/instrucoes">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <ContDespachos> NÚMERO INSTRUÇÃO: {data.numero_instrucao} </ContDespachos>
                <ContDespachos> INTERESSADO : {data.interessado_instrucao} </ContDespachos>
                <ContDespachos> ASSUNTO : {data.assunto_instrucao} </ContDespachos>
                <ContDespachos> DATA EMISSÃO : {data.datEmissao_instrucao} </ContDespachos>
                <ContDespachos> EXECUTOR : {data.executor_instrucao} </ContDespachos>
                <ContDespachos> SETOR : {data.setor} </ContDespachos>
                <ContDespachos> OBSERVAÇÃO : {data.observacao_instrucao} </ContDespachos>
            </Container>
        </div> 
    );
}