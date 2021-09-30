import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input,AlertDanger, AlertSuccess, ContDespachos } from './styles';

export const FormSaidaDespachos = (props) =>{

    const [id_despacho] = useState(props.match.params.id);
    const [numero_sisrad_processo,setProcesso] = useState('');
    const [des_ua,setUA] = useState('');
    const [des_ugo,setUO] = useState('');
    const [interessado_despacho,setInteressado] = useState('');
    const [assunto_despacho,setAssunto] = useState('');
    const [executor_despacho,setExecutor] = useState('');
    const [setor,setSetor] = useState('');
    const [observacao_despacho,setObservacao] = useState('');
    const [datSaida_despacho, setSaida] = useState('');  



    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const saidaDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_SAIDA_DESPACHOS, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_despacho, datSaida_despacho})   
        }).then((response) => response.json())                   
        .then((responseJson) => {
            if(responseJson.erro){
                setStatus({
                  type: 'erro',
                  mensagem: responseJson.mensagem
                });
              } else {
                setStatus({
                  type: 'success',
                  mensagem: responseJson.mensagem
                });
              }
            }).catch(() => {
              setStatus({
                type: 'erro',
                mensagem: 'Saída não Realizada. Contate o Administrador do Sistema (Erro 1-F)!!'
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
            })
        }
        getDespachos();

    },[id_despacho]);
    
     return (
        <div>
            <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>SAÍDA DE DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                
                <form onSubmit={saidaDespacho}>
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
                                    <hr></hr>
                                    <Label>DATA SAIDA</Label>
                                        <Input type="date" placeholder="" name="datSaida_despacho" value={datSaida_despacho} onChange={e => setSaida(e.target.value)}></Input>                            
                                </th>
                            </tr>                               
                        </tbody>   
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Saída</ButtonCadastrar>
                    </DivButton>
                </form>

            </Container>
        </div>
     );
    
}