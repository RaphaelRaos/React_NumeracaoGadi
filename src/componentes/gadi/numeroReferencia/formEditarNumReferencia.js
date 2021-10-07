import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, TdCadastro } from './styles';
import { Link } from 'react-router-dom';

//PAREI AQUI - NECESSÁRIO RECOMEÇAR DO ZERO 30.09.2021

export const FormEditarNumRef = (props) => {

    const [id_referencia] = useState(props.match.params.id);
    const [nomenclaturaUA, setUnidades] = useState([]);
    const [AndamentoProcesso, setAndamentoStatus] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);
    const [assuntoReferencia, setAssuntoReferencia] = useState([]);
    /* */
    const [num_processo_referencia, setProcesso] = useState('');
    const [interessado_referencia, setInteressado] = useState('');
    const [id_assunto, setAssunto] = useState('');
    const [descAssunto, setDescAssunto] = useState('');
    const [executor_referencia, setExecutor] = useState('');
    const [setorElaboracao_referencia, setCodArea] = useState('');
    const [area_referencia, setAreaReferencia] = useState('');
    const [andamento, setCodStatus] = useState('');
    const [status_referencia, setStatusReferencia] = useState('');
    const [vigencia_referencia, setVigencia] = useState('');
    const [observacao_referencia, setObservacao] = useState('');
    const [referencia_banquinho, setBanquinho] = useState('');
    const [codtabua, setCodUA] = useState('');
    const [destinacaoUA, setDesUA] = useState('');
    const [motivoDevolucao_referencia, setMotivoDevolucao] = useState('');

    const [status, setStatusMensagem] = useState({
        type: '',
        mensagem: ''
    })

    
    const editNumReferencia = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_REFERENCIAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_referencia, num_processo_referencia,codtabua, interessado_referencia, id_assunto, executor_referencia, setorElaboracao_referencia, andamento, vigencia_referencia, status_referencia, observacao_referencia, referencia_banquinho, motivoDevolucao_referencia})
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.erro) {
                    setStatusMensagem({
                        type: 'error',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatusMensagem({
                        type: 'success',
                        mensagem: responseJson.mensagem
                    });
                }
            }).catch(() => {
                setStatusMensagem({
                    type: 'error',
                    mensagem: "NÚMERO DE REFERÊNCIA NÃO EDITADO, CONTATE O ADMINISTRADOR - (ERRO 1F)"
                });
            });
    }

    const assuntoTabela = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_ASSUNTO)
            .then((response) => response.json())
            .then((responseJson) => {
                setAssuntoReferencia(responseJson.registro_assunto);
            })
    }
    const visualizarUnidades = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_UNIDADES)
            .then((response) => response.json())
            .then((responseJson) => {
                setUnidades(responseJson.registro_unidades);
            })
    }
    const setores = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
            .then((response) => response.json())
            .then((responseJson) => {
                setSetor(responseJson.registro_setor);
            })
    }
    const statusAndamentoProcesso = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_STATUS_PROCESSO)
            .then((response) => response.json())
            .then((responseJson) => {
                setAndamentoStatus(responseJson.lista_status);
            })
    }
    useEffect(() => {
        const getNumReferencia = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_REFERENCIA + id_referencia)
                .then((response) => response.json())
                .then((responseJson) => {
                    setProcesso(responseJson.numeroReferencia.num_processo_referencia)
                    setInteressado(responseJson.numeroReferencia.interessado_referencia)
                    setAssunto(responseJson.numeroReferencia.id_assunto)
                    setDescAssunto(responseJson.numeroReferencia.assuntoReferencia)
                    setExecutor(responseJson.numeroReferencia.executor_referencia)
                    setCodArea(responseJson.numeroReferencia.codArea_referencia)
                    setAreaReferencia(responseJson.numeroReferencia.area_numReferencia)
                    setCodStatus(responseJson.numeroReferencia.idStatusProcesso)
                    setStatusReferencia(responseJson.numeroReferencia.statusProcesso)
                    setVigencia(responseJson.numeroReferencia.vigencia_referencia)
                    setObservacao(responseJson.numeroReferencia.observacao_referencia)
                    setBanquinho(responseJson.numeroReferencia.referencia_banquinho)
                    setCodUA(responseJson.numeroReferencia.CodTabUa)
                    setDesUA(responseJson.numeroReferencia.desua)
                    setMotivoDevolucao(responseJson.numeroReferencia.motivoDevolucao_referencia)
                    
                })
        }
        getNumReferencia();
        visualizarUnidades();
        setores();
        assuntoTabela();
        statusAndamentoProcesso();
    }, [id_referencia]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR NÚMERO DE REFERÊNCIAS</Titulo>
                    <BotaoAcao>
                        <Link to="/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={editNumReferencia}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <TdCadastro>
                                    <Label>NÚMERO PROCESSO / SPDOC / SEM PAPEL</Label>
                                    <Input type="text" placeholder="Número Processo" name="num_processo_referencia" value={num_processo_referencia} onChange={e => setProcesso(e.target.value)}></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="codtabua" onChange={e => setCodUA(e.target.value)}>
                                        <option value={codtabua}>{destinacaoUA}</option>
                                        {Object.values(nomenclaturaUA).map(unidade => (
                                            <option key={unidade.CodTabUa} value={unidade.CodTabUa}>{unidade.DESCRICAO_UA}</option>
                                        ))}
                                    </Select>                                    
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_referencia" value={interessado_referencia} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto" onChange={e => setAssunto(e.target.value)}>
                                        <option value={id_assunto}>{descAssunto}</option>
                                        {Object.values(assuntoReferencia).map(assunto => (
                                            <option key={assunto.id_assunto} value={assunto.id_assunto}> {assunto.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_referencia" value={executor_referencia} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>UNIDADE DE POSSE</Label>
                                    <Select name="posse_referencia" onChange={e => setCodArea(e.target.value)}>
                                        <option value={setorElaboracao_referencia}>{area_referencia}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}>{setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                </TdCadastro>
                                <TdCadastro>
                                    <Label>ANDAMENTO DO PROCESSO</Label>
                                    <Select name="posse_referencia" onChange={e => setCodStatus(e.target.value)}>
                                        <option value={andamento}>{status_referencia}</option>
                                        {Object.values(AndamentoProcesso).map(andamento => (
                                            <option key={andamento.id_andamento} value={andamento.id_andamento}>{andamento.status_andamento}</option>
                                        ))}
                                    </Select>
                                    <Label>DATA DA VIGÊNCIA </Label>
                                    <Input type="date" name="vigencia_referencia" value={vigencia_referencia} onChange={e => setVigencia(e.target.value)}></Input>
                                    <Label>Nº BANQUINHO</Label>
                                    <Input type="number" placeholder="Referência Banquinho" name="referencia_banquinho" value={referencia_banquinho} onChange={e => setBanquinho(e.target.value)}></Input>
                                    <Label>MOTIVO DEVOLUÇÃO</Label>
                                    <Input type="text" placeholder="Motivo Devolução - Caso Houver" name="motivoDevolucao_referencia" value={motivoDevolucao_referencia} onChange={e => setMotivoDevolucao(e.target.value)}></Input>
                                    <Label>OBSERVAÇÃO</Label>
                                    <TextArea name="observacao_referencia" cols="20 rows" rows="5" id="" value={observacao_referencia} onChange={e => setObservacao(e.target.value)}></TextArea>

                                </TdCadastro>
                            </tr>
                        </tbody>
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