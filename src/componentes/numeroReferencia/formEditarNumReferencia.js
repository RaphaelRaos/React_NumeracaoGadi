import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, TH, AlertDanger, AlertSuccess } from './styles';
import { Link } from 'react-router-dom';



export const FormEditarNumRef = (props) => {

    const [id_referencia] = useState(props.match.params.id);
    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);
    const [assuntoReferencia, setAssunto] = useState([]);
    /* */
    const [num_processo_referencia, setProcesso] = useState('');
    const [des_ua, setUA] = useState('');
    const [des_uo, setUO] = useState('');
    const [interessado_referencia, setInteressado] = useState('');
    const [assunto, setAssuntoReferencia] = useState('');
    const [executor_referencia, setExecutor] = useState('');
    const [posse_referencia, setPosse] = useState('');
    const [situacao, setSituacao] = useState('');
    const [andamento_referencia, setAndamento] = useState('');
    const [ocorrencia_referencia, setOcorrencia] = useState('');
    const [vigencia_referencia, setVigencia] = useState('');
    const [status_referencia, setStatus] = useState('');
    const [observacao_referencia, setObservacao] = useState('');    
    
    const [status, setStatusMensagem] = useState({
        type: '',
        mensagem: ''
    })
    const editNumReferencia = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_REFERENCIAS,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_referencia,num_processo_referencia,des_ua,des_uo,interessado_referencia,assunto,executor_referencia,posse_referencia, situacao,andamento_referencia, ocorrencia_referencia,vigencia_referencia, status_referencia,observacao_referencia})
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.erro){
                setStatusMensagem({
                    type:'error',
                    mensagem: responseJson.mensagem
                });
            } else {
                setStatusMensagem({
                    type:'success',
                    mensagem: responseJson.mensagem
                });
            }
        }).catch(() => {
            setStatusMensagem({
                type:'error',
                mensagem: "NÚMERO DE REFERÊNCIA NÃO EDITADO, CONTATE O ADMINISTRADOR - (ERRO 1F)"
            });
        });
    }

    const assuntoTabela = async() => {
        await fetch(process.env.REACT_APP_VISUALIZAR_ASSUNTO)
        .then((response) => response.json())
        .then((responseJson) => {
            setAssunto(responseJson.registro_assunto);
        })
    }
    
    const unidadeAdministrativa = async() =>{
        await fetch(process.env.REACT_APP_VISUALIZAR_UA)
        .then((response) => response.json())
        .then((responseJson) => {
            setDestinacao(responseJson.registro_UA);
        })
    }

    const unidadeOrcamentaria = async() =>{
    await fetch(process.env.REACT_APP_VISUALIZAR_UO)
    .then((response) => response.json())
    .then((responseJson) => {
        setOrcamentaria(responseJson.registro_UO);
    })
    }

    const setores = async() =>{
    await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
    .then((response) => response.json())
    .then((responseJson) => {
        setSetor(responseJson.registro_setor);
    })  
    }
    useEffect (() => {

        const getNumReferencia =async() =>{
            await fetch(process.env.REACT_APP_VISUALIZAR_REFERENCIA + id_referencia)
            .then((response) => response.json())
            .then((responseJson) => {
                setProcesso(responseJson.numeroReferencia.num_processo_referencia);
                setUA(responseJson.numeroReferencia.des_ua);
                setUO(responseJson.numeroReferencia.des_uo);
                setInteressado(responseJson.numeroReferencia.interessado_referencia);
                setAssuntoReferencia(responseJson.numeroReferencia.assunto)
                setExecutor(responseJson.numeroReferencia.executor_referencia)
                setPosse(responseJson.numeroReferencia.posse_referencia)
                setSituacao(responseJson.numeroReferencia.situacao)
                setAndamento(responseJson.numeroReferencia.andamento_referencia)
                setOcorrencia(responseJson.numeroReferencia.ocorrencia_referencia)
                setVigencia(responseJson.numeroReferencia.vigencia_referencia)
                setStatus(responseJson.numeroReferencia.status_referencia)
                setObservacao(responseJson.numeroReferencia.observacao_referencia)
            })
        }
        getNumReferencia();
        unidadeAdministrativa();
        unidadeOrcamentaria();
        setores();
        assuntoTabela();
    },[id_referencia]);

    return (
        <div>
             <Header />
             <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE NÚMERO DE REFERÊNCIAS</Titulo>
                    <BotaoAcao>
                        <Link to = "/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                
                
                <form onSubmit={editNumReferencia}>
                    <TableForm>
                        <TH>
                            <Label>NÚMERO PROCESSO / SPDOC / SEM PAPEL</Label>
                                <Input type="text" placeholder="Número Processo" name="num_processo_referencia" value={num_processo_referencia} onChange={e => setProcesso(e.target.value)}></Input>
                            <Label>UNIDADE ADMINISTRATIVA</Label>
                                <Select name="des_ua" onChange={e => setUA(e.target.value)}>
                                                <option value={des_ua}>{des_ua}</option>
                                                {Object.values(nomenclaturaUA).map(unidadeAdministrativa =>(
                                                    <option key = {unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                                ))}                                           
                                            </Select>
                            <Label>COORDENADORIA</Label>
                                <Select name="des_uo" onChange = {e =>setUO(e.target.value) }>
                                                <option value={des_uo}>{des_uo}</option>
                                                {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria =>(
                                                    <option key = {unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                                ))}                       
                                 </Select>
                            <Label>INTERESSADO</Label>
                                <Input type="text" placeholder="Interessado" name="interessado_referencia" value={interessado_referencia}  onChange = {e =>setInteressado(e.target.value) }></Input>
                            <Label>ASSUNTO</Label>
                                <Select  name="assunto" onChange = {e => setAssuntoReferencia (e.target.value)}>
                                    <option value={assunto}>{assunto}</option>
                                    {Object.values(assuntoReferencia).map(assunto => (
                                        <option key={assunto.id_assunto}> {assunto.assunto}</option>
                                    ))}
                                </Select>
                            <Label>EXECUTOR</Label>
                                <Input type="text" placeholder="Executor" name="executor_referencia" value={executor_referencia} onChange={e =>setExecutor(e.target.value)}></Input>  
                            <Label>UNIDADE DE POSSE</Label>
                                <Select  name="posse_referencia" onChange={ e =>setPosse(e.target.value)}>
                                    <option value={posse_referencia}>{posse_referencia}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor}>{setor.nome_setor}</option>
                                        ))}                                            
                            </Select>                      
                        </TH>
                        <TH>                       
                            <Label>SITUAÇÃO</Label>
                            <Input type="text" placeholder="Situação" name="situação_referencia" value={situacao} onChange={e =>setSituacao(e.target.value)}></Input>
                            <Label>ANDAMENTO DO PROCESSO</Label>
                                <Select  name="assunto" onChange={e => setAndamento(e.target.value)}>
                                    <option value={andamento_referencia}>{andamento_referencia}</option>
                                    <option value="AGUARDANDO TRAMITAÇÃO">AGUARDANDO TRAMITAÇÃO</option>
                                    <option value="PARA REVISÃO">PARA REVISÃO</option>
                                    <option value="FINALIZADO">FINALIZADO</option>                                    
                                </Select>
                            <Label>OCORRENCIAS</Label>
                                <TextArea name="ocorrencias_referencia" cols="50 rows" rows = "3" id="" value={ocorrencia_referencia} onChange={e => setOcorrencia(e.target.value)}></TextArea>
                            <Label>DATA DA VIGÊNCIA </Label>
                                <Input type="date" name="vigencia_referencia" value={vigencia_referencia} onChange={e => setVigencia(e.target.value)}></Input>
                            <Label>STATUS</Label>
                                <Select  name="assunto" onChange={e => setAndamento(e.target.value)}>
                                    <option value={status_referencia}>{status_referencia}</option>
                                </Select>
                            <Label>OBSERVAÇÃO</Label>
                                <TextArea name = "observacao_referencia" cols = "20 rows" rows = "5" id=""  value={observacao_referencia} onChange={e => setObservacao(e.target.value)}></TextArea>
                        </TH>
                    </TableForm>
                    <DivButton>
                        <br></br>
                            <ButtonCadastrar type="submit">Editar</ButtonCadastrar>
                        <br></br>
                        <br></br>
                    </DivButton>
                </form>
                </Container>
            
        </div>
        
    );
}