import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, AlertDanger, AlertSuccess, ConteudoInstrucao } from './styles';

export const FormExcluirInstrucao = (props) =>{

    const [id_instrucao] = useState(props.match.params.id);
    const [numero_instrucao,setNumero] = useState('');
    const [interessado_instrucao,setInteressado] = useState('');
    const [assunto_instrucao,setAssunto] = useState('');
    const [executor_instrucao,setExecutor] = useState('');
    const [setor,setSetor] = useState('');
    const [observacao_instrucao,setObservacao] = useState('');    


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const exclInstrucao = async e =>{
        e.preventDefault();

        await fetch("http://localhost/dashboard/sistemaNumeracao/instrucoes/excluir_instrucoes.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_instrucao})
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
                    mensagem: "Instrução não Excluída, tente mais tarde!"
                });
            });       
    } 

    useEffect(() => {
        const getInstrucoes = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/instrucoes/visualizar_instrucoes.php?id="+ id_instrucao)
            .then((response) => response.json())
            .then((responseJson) => {
                setNumero(responseJson.instrucao.numero_instrucao)
                setInteressado(responseJson.instrucao.interessado_instrucao)
                setAssunto(responseJson.instrucao.assunto_instrucao)
                setExecutor(responseJson.instrucao.executor_instrucao)
                setSetor(responseJson.instrucao.setor)
                setObservacao(responseJson.instrucao.observacao_instrucao)
            })
        }
        getInstrucoes();
        

    },[id_instrucao]);
    
     return (
        <div>
            <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>EXCLUIR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/instrucoes">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                
                <form onSubmit={exclInstrucao}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th> 
                                    <ConteudoInstrucao> NÚMERO INSTRUÇÃO: {numero_instrucao} </ConteudoInstrucao>                                                            
                                    <ConteudoInstrucao> INTERESSADO: {interessado_instrucao} </ConteudoInstrucao>
                                    <ConteudoInstrucao> ASSUNTO: {assunto_instrucao} </ConteudoInstrucao>
                                    <ConteudoInstrucao> EXECUTOR: {executor_instrucao} </ConteudoInstrucao>                                
                                    <ConteudoInstrucao> SETOR CADASTRANTE: {setor} </ConteudoInstrucao>
                                    <ConteudoInstrucao> OBSERVAÇÕES INSTRUÇÃO: {observacao_instrucao} </ConteudoInstrucao>                              
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
     );
    
}