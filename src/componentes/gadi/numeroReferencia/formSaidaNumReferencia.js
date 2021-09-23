import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar,  Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, AlertDanger, AlertSuccess, ConteudoReferencia, InputSaida } from './styles';
import { Link } from 'react-router-dom';

export const FormSaidaNumRef = (props) => {



    const [id_referencia] = useState(props.match.params.id);
    const [data, setData] = useState([]);
    const [datSaida_numReferencia, setSaida] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const saidaNumReferencia = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_SAIDA_REFERENCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id_referencia, datSaida_numReferencia})
        }).then((response) => response.json())
        .then((responseJson)=>{
            if(responseJson.erro){
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.mensagem
                });
            }else {
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
        const getNumReferencia = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_REFERENCIA + id_referencia)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.numeroReferencia)
                })
            }
            getNumReferencia();
        },[id_referencia]);

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Titulo> SAÍDA NÚMERO DE REFERÊNCIA - INFORMAÇÃO</Titulo>
                    <BotaoAcao>                            
                        <Link to="/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                    </ConteudoTitulo>
                    {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                    {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                    <form onSubmit={saidaNumReferencia}>
                        <TableForm>             
                           <div>                                               
                                <ConteudoReferencia>NÚMERO DE REFERÊNCIA: {data.numero_referencia}</ConteudoReferencia>   
                                <ConteudoReferencia>NÚMERO DO PROCESSO: {data.num_processo_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>UNIDADE ADMINISTRATIVA: {data.des_ua}</ConteudoReferencia> 
                                <ConteudoReferencia>UNIDADE ORÇAMENTARIA: {data.des_uo}</ConteudoReferencia> 
                                <ConteudoReferencia>INTERESSADO: {data.interessado_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>ASSUNTO: {data.assunto}</ConteudoReferencia> 
                                <ConteudoReferencia>DATA ENTRADA: {data.datEntrada_referencia}</ConteudoReferencia>
                            </div>
                            <div>                                                  
                                <ConteudoReferencia>EXECUTOR: {data.executor_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>UNIDADE DE POSSE: {data.posse_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>SITUAÇÃO: {data.situacao}</ConteudoReferencia> 
                                <ConteudoReferencia>ANDAMENTO DO PROCESSO: {data.andamento_referencia} </ConteudoReferencia> 
                                <ConteudoReferencia>OCORRÊNCIA: {data.ocorrencia_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>VIGÊNCIA: {data.vigencia_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>STATUS: {data.status_referencia}</ConteudoReferencia> 
                                <ConteudoReferencia>OBSERVAÇÃO: {data.observacao_referencia}</ConteudoReferencia>
                                </div>
                                <hr></hr>
                                <Label>DATA SAIDA: </Label>
                                    <InputSaida type="date" name="datSaida_numReferencia" onChange={e => setSaida(e.target.value)} required ></InputSaida>
                            </TableForm>                                                            
                            <DivButton>                            
                                <br></br>                                
                                <ButtonCadastrar type="submit">Saída</ButtonCadastrar>
                                <br></br>
                                <br></br>                                                     
                            </DivButton>                          
                    </form>       
            </Container>        
        
        </div>
    );

    
}