import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, AlertDanger, AlertSuccess, ConteudoMemorando} from './styles';

export const FormExcluirMemorando = (props) => {

    const [id_memorando] = useState(props.match.params.id);
    const [numero_memorando,setNumero] = useState('');
    const [interessado_memorando,setInteressado] = useState('');
    const [assunto_memorando,setAssunto] = useState('');
    const [executor_memorando,setExecutor] = useState('');
    const [setor,setSetor] = useState('');
    const [observacao_memorando,setObservacao] = useState(''); 

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const exclMemorando = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_EXCLUIR_MEMORANDO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_memorando})
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
                    mensagem: "Memorando não Excluído, Tente mais tarde!!!"
                });
            });       
    } 

    useEffect(() => {
        const getMemorando = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_MEMORANDO + id_memorando)
            .then((response) => response.json())
            .then((responseJson) => {
                setNumero(responseJson.memorando.numero_memorando)
                setInteressado(responseJson.memorando.interessado_memorando)
                setAssunto(responseJson.memorando.assunto_memorando)
                setExecutor(responseJson.memorando.executor_memorando)
                setSetor(responseJson.memorando.setor_memorando)
                setObservacao(responseJson.memorando.observacao_memorando)
            })
        }
        getMemorando();
        

    },[id_memorando]);

    return (
        <div>
        <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>EXCLUIR MEMORANDOS</Titulo>
                    <BotaoAcao>
                        <Link to="/memorandos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                
                <form onSubmit={exclMemorando}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th> 
                                    <ConteudoMemorando> NÚMERO INSTRUÇÃO: {numero_memorando} </ConteudoMemorando>                                                            
                                    <ConteudoMemorando> INTERESSADO: {interessado_memorando} </ConteudoMemorando>
                                    <ConteudoMemorando> ASSUNTO: {assunto_memorando} </ConteudoMemorando>
                                    <ConteudoMemorando> EXECUTOR: {executor_memorando} </ConteudoMemorando>                                
                                    <ConteudoMemorando> SETOR CADASTRANTE: {setor} </ConteudoMemorando>
                                    <ConteudoMemorando> OBSERVAÇÕES INSTRUÇÃO: {observacao_memorando} </ConteudoMemorando>                              
                                </th>
                            </tr>                               
                        </tbody>   
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Excluir</ButtonCadastrar>
                    </DivButton>
                </form>

            </Container>
        </div> 
    )
}