import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ConteudoOficio} from './styles';
import { Header } from '../header/header';
import {Link} from 'react-router-dom';

export const FormViewOficio = (props) => {

    const[id] = useState(props.match.params.id);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getOficio = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_OFICIOS + id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.mensagem);
            })
        }
        getOficio();
    },[id]);

    return (
        <div>
           <Header />
           <Container>
                <ConteudoTitulo>                   
                    <Titulo>VISUALIZAR INSTRUÇÕES</Titulo>
                    <BotaoAcao>                            
                        <Link to="/oficios">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <ConteudoOficio> NÚMERO OFÍCIO: {data.numero_oficio} </ConteudoOficio>
                <ConteudoOficio> INTERESSADO : {data.interessado_oficio} </ConteudoOficio>
                <ConteudoOficio> ASSUNTO : {data.assunto_oficio} </ConteudoOficio>
                <ConteudoOficio> DATA EMISSÃO : {data.datEmissao_oficio} </ConteudoOficio>
                <ConteudoOficio> EXECUTOR : {data.executor_oficio} </ConteudoOficio>
                <ConteudoOficio> SETOR : {data.setor_oficio} </ConteudoOficio>
                <ConteudoOficio> OBSERVAÇÃO : {data.observacao_oficio} </ConteudoOficio>
            </Container>
        </div>
    )
}