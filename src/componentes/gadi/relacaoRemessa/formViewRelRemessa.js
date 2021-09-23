import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ConteudoRemessa} from './styles';
import {Link} from 'react-router-dom';

export const FormViewRelRemessa = (props) => {

    const [id_remessa] = useState(props.match.params.id);

    
    const [data, setData] = useState([]);

    useEffect(() => {
        const getRemessa = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/relacao_remessa/visualizar_remessas.php?id="+ id_remessa)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.mensagem);
               
            })
        }
        getRemessa();
    },[id_remessa]);

    return (
        <>
            <Header />
            <Container>
                <ConteudoTitulo>                   
                    <Titulo>VISUALIZAR REMESSAS</Titulo>
                    <BotaoAcao>                            
                        <Link to="/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>                
                <ConteudoRemessa> NÚMERO REMESSA: {data.numero_remessa} </ConteudoRemessa>
                <ConteudoRemessa> INTERESSADO : {data.numProcesso_remessa} </ConteudoRemessa>
                <ConteudoRemessa> ASSUNTO : {data.des_ua} </ConteudoRemessa>
                <ConteudoRemessa> DATA EMISSÃO : {data.des_uo} </ConteudoRemessa>
                <ConteudoRemessa> EXECUTOR : {data.interessado_remessa} </ConteudoRemessa>
                <ConteudoRemessa> SETOR : {data.assunto_remessa} </ConteudoRemessa>
                <ConteudoRemessa> OBSERVAÇÃO : {data.datEmissao_remessa} </ConteudoRemessa>
                <ConteudoRemessa> EXECUTOR : {data.executor_remessa} </ConteudoRemessa>
                <ConteudoRemessa> SETOR : {data.area_remessa} </ConteudoRemessa>
                <ConteudoRemessa> OBSERVAÇÃO : {data.observacao_remessa} </ConteudoRemessa>
            </Container>
        </>
    )
}