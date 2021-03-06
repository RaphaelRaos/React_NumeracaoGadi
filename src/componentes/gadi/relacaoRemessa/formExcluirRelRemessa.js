import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess,ConteudoRemessa, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess} from './styles';
import {Link} from 'react-router-dom';

export const FormExcluirRelRemessa = (props) => {
    
    const [id_remessa] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    
    const [data, setData] = useState([]);

    const excluirRemessa = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_EXCLUIR_REMESSA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_remessa})
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.erro){
                    setStatus({
                        type:'error',
                        mensagem:responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.mensagem
                    });
                }
            }).catch(() => {
                setStatus({ 
                    type: 'error',
                    mensagem: "Despacho não Excluído, tente mais tarde!"
                });
            });       
    } 

    useEffect(() => {
        const getRemessa = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_REMESSA + id_remessa)
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
                    <Titulo>EXCLUIR</Titulo>
                    <BotaoAcao>                            
                        <Link to="/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirRemessa}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ConteudoRemessa> NÚMERO REMESSA: {data.numero_remessa} </ConteudoRemessa>
                                    <ConteudoRemessa> INTERESSADO : {data.numProcesso_remessa} </ConteudoRemessa>
                                    <ConteudoRemessa> UNIDADE:  : {data.desua} </ConteudoRemessa>
                                    <ConteudoRemessa> DATA EMISSÃO : {data.datEmissao_remessa} </ConteudoRemessa>
                                    <ConteudoRemessa> EXECUTOR : {data.executor_remessa} </ConteudoRemessa>
                                    <ConteudoRemessa> SETOR : {data.area_remessa} </ConteudoRemessa>
                                    <ConteudoRemessa> Nº BANQUINHO : {data.referencia_banquinho} </ConteudoRemessa>
                                    <ConteudoRemessa> OBSERVAÇÃO : {data.observacao_remessa} </ConteudoRemessa>
                                    
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Excluir</ButtonCadastrar>
                    </DivButton>
                </form>                
                
            </Container>
        </>
    )

}