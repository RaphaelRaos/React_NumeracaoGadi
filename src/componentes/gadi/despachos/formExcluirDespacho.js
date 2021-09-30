import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, AlertDanger, AlertSuccess, ContDespachos } from './styles';

export const FormExcluirDespachos = (props) =>{

    const [id_despacho] = useState(props.match.params.id);
    const [numero_sisrad_processo,setProcesso] = useState('');
    const [des_ua,setUA] = useState('');
    const [des_ugo,setUO] = useState('');
    const [interessado_despacho,setInteressado] = useState('');
    const [assunto_despacho,setAssunto] = useState('');
    const [executor_despacho,setExecutor] = useState('');
    const [setor,setSetor] = useState('');
    const [observacao_despacho,setObservacao] = useState('');
    const [referencia_banquinho, setBanquinho] = useState('');

     


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const exclDespacho = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_EXCLUIR_DESPACHOS, {
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
            await fetch(process.env.REACT_APP_VISUALIZAR_DESPACHOS + id_despacho)
            .then((response) => response.json())
            .then((responseJson) => {
                setProcesso(responseJson.despacho.numero_sisrad_processo)
                setUA(responseJson.despacho.desua)
                setUO(responseJson.despacho.desuo)
                setInteressado(responseJson.despacho.interessado_despacho)
                setAssunto(responseJson.despacho.assunto_despacho)
                setExecutor(responseJson.despacho.executor_despacho)
                setSetor(responseJson.despacho.area_despacho)
                setObservacao(responseJson.despacho.observacao_despacho)
                setBanquinho(responseJson.despacho.referencia_banquinho)
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
                        <Link to="/despachos">
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
                                    <ContDespachos> REFERÊNCIA BANQUINHO: {referencia_banquinho} </ContDespachos>
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