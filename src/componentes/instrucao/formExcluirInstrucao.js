import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, AlertDanger, AlertSuccess, ContDespachos } from './styles';

export const FormExcluirInstrucao = (props) =>{

    const [id_despacho] = useState(props.match.params.id);
    const [numero_sisrad_processo,setProcesso] = useState('');
    const [des_ua,setUA] = useState('');
    const [des_ugo,setUO] = useState('');
    const [interessado_despacho,setInteressado] = useState('');
    const [assunto_despacho,setAssunto] = useState('');
    const [executor_despacho,setExecutor] = useState('');
    const [setor,setSetor] = useState('');
    const [observacao_despacho,setObservacao] = useState('');

     


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const exclDespacho = async e =>{
        e.preventDefault();

        await fetch("http://localhost/dashboard/sistemaNumeracao/despachos/excluir_despachos.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_despacho,numero_sisrad_processo, des_ua, des_ugo, interessado_despacho, assunto_despacho, executor_despacho, setor, observacao_despacho})
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
        const getDespachos = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/despachos/visualizar_despachos.php?id="+ id_despacho)
            .then((response) => response.json())
            .then((responseJson) => {
                setProcesso(responseJson.despacho.numero_sisrad_processo)
                setUA(responseJson.despacho.des_ua)
                setUO(responseJson.despacho.des_ugo)
                setInteressado(responseJson.despacho.interessado_despacho)
                setAssunto(responseJson.despacho.assunto_despacho)
                setExecutor(responseJson.despacho.executor_despacho)
                setSetor(responseJson.despacho.setor)
                setObservacao(responseJson.despacho.observacao_despacho)
            })
        }
        getDespachos();
    },[id_despacho]);
    
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
                
                <form onSubmit={exclDespacho}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>                                                             
                                    <ContDespachos> NÚMERO SISRAD / PROCESSO :  {numero_sisrad_processo} </ContDespachos>                                      
                                    <ContDespachos> UNIDADE CADASTRANTE: {des_ua} </ContDespachos>
                                    <ContDespachos> COORDENADORIA: {des_ugo} </ContDespachos>
                                    <ContDespachos> INTERESSADO: {interessado_despacho} </ContDespachos>
                                    <ContDespachos> ASSUNTO: {assunto_despacho} </ContDespachos>                                
                                    <ContDespachos> EXECUTOR: {executor_despacho} </ContDespachos>
                                    <ContDespachos> SETOR CADASTRANTE: {setor} </ContDespachos>
                                    <ContDespachos> OBSERVAÇÕES DESPACHO: {observacao_despacho} </ContDespachos>                              
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