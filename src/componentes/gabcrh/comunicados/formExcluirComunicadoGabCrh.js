import React,{useState, useEffect} from "react";
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContComunicado, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from './styles';
import { Link } from "react-router-dom";
import {Header} from '../../header/header';


export const FormExcluirComunicadosGabCrh = (props) =>{

    const [id_comunicado] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirComunicado = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_COMUNICADO, {
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
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_COMUNICADO + id_comunicado)
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
                    <Titulo>EXCLUIR COMUNICADO</Titulo>
                    <BotaoAcao>                            
                        <Link to="/ComunicadosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirComunicado}>
                    <table>
                    <tbody>
                        <tr>
                            <td>
                                <ContComunicado>NÚMERO COMUNICADO: {data.numero_comunicado}</ContComunicado>
                                <ContComunicado>ASSUNTO COMUNICADO: {data.assuntoComunicado}</ContComunicado> 
                                <ContComunicado>DATA DE EMISSÃO : {data.datEmissAo_comunicado}</ContComunicado> 
                                <ContComunicado>EXECUTOR: {data.executor_comunicado}</ContComunicado> 
                                <ContComunicado>AREA: {data.setorComunicado}</ContComunicado> 
                                <ContComunicado>NÚMERO COMUNICADO: {data.observacao_comunicado}</ContComunicado>  
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
        </div> 
    );
}