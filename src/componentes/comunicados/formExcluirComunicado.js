import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContComunicado, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from './styles';
import { Header } from '../header/header';
import {Link} from 'react-router-dom';

export const FormExcluirComunicados = (props) => {

    const [id_comunicado] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirComunicado = async e =>{
        e.preventDefault();

        await fetch("http://localhost/dashboard/sistemaNumeracao/comunicados/excluir_comunicado.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_comunicado})
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
                    mensagem: "Comunicado não Excluído, tente mais tarde!"
                });
            });       
    } 

    useEffect(() => {
        const getComunicados = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/comunicados/visualizar_comunicados.php?id="+ id_comunicado)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.comunicado);
            })
        }
        getComunicados();
    },[id_comunicado]);
    return (
       <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>EXCLUIR COMUNICADO</Titulo>
                    <BotaoAcao>                            
                        <Link to="/comunicados">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirComunicado}>
                    <tbody>
                        <tr>
                            <td>
                                <ContComunicado>NÚMERO COMUNICADO: {data.numero_comunicado}</ContComunicado>
                                <ContComunicado>ASSUNTO COMUNICADO: {data.assunto_comunicado}</ContComunicado> 
                                <ContComunicado>DATA DE EMISSÃO : {data.datEmissao_comunicado}</ContComunicado> 
                                <ContComunicado>EXECUTOR: {data.executor_comunicado}</ContComunicado> 
                                <ContComunicado>AREA: {data.area_comunicado}</ContComunicado> 
                                <ContComunicado>NÚMERO COMUNICADO: {data.observacao_comunicado}</ContComunicado>  
                            </td>
                        </tr>
                    </tbody>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Excluir</ButtonCadastrar>
                    </DivButton>
                </form>           
            </Container>
        </div> 
    );
}