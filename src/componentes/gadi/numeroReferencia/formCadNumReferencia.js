import React, { useState, useEffect } from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, TBODY, TdCadastro } from './styles';
import { Link } from 'react-router-dom';

export const FormCadNumRef = () => {


    const [referencia, setReferencia] = useState({
        num_processo_referencia: "",
        codtabua: "",
        interessado_referencia: "",
        cod_assunto: "",
        datEmissao_referencia: "",
        executor_referencia: "",
        setorElaboracao_referencia: "",
        andamento: "",
        vigencia_referencia: "",
        observacao_referencia: "",
        referencia_banquinho: ""
    });


    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [andamentoProcesso, setAndamento] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);
    const [assuntoReferencia, setAssunto] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setReferencia({ ...referencia, [e.target.name]: e.target.value });

    const assunto = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_ASSUNTO)
            .then((response) => response.json())
            .then((responseJson) => {
                setAssunto(responseJson.registro_assunto);
            })
    }

    const visualizarUnidades = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_UNIDADES)
            .then((response) => response.json())
            .then((responseJson) => {
                setDestinacao(responseJson.registro_unidades);
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
                setAndamento(responseJson.lista_status);
            })
    }
    useEffect(() => {
        visualizarUnidades();
        setores();
        assunto();
        statusAndamentoProcesso();
    }, [])

    const cadReferencia = async e => {

        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_REFERENCIA, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ referencia })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.mensagem
                    });
                    setReferencia({
                        num_processo_referencia: "",
                        codtabua: "",
                        interessado_referencia: "",
                        cod_assunto: "",
                        datEmissao_referencia: "",
                        executor_referencia: "",
                        setorElaboracao_referencia: "",
                        andamento: "",
                        vigencia_referencia: "",
                        observacao_referencia: "",
                        referencia_banquinho: ""
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: "REFERÊNCIA NÃO CADASTRADA - CONTATE O ADMINISTRADOR - (ERRO 1-F)"
                });
            });
    }

    /*console.log(referencia);*/

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE NÚMERO DE REFERÊNCIAS</Titulo>
                    <BotaoAcao>
                        <Link to="/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadReferencia}>
                    <TableForm>
                        <TBODY>
                            <tr>
                                <TdCadastro>
                                    <Label>NÚMERO PROCESSO / SPDOC / SEM PAPEL</Label>
                                    <Input type="text" placeholder="Número Processo" name="num_processo_referencia" onChange={valorInput} value={referencia.num_processo_referencia} required ></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="codtabua" onChange={valorInput} value={referencia.codtabua} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUA).map(visualizarUnidades => (
                                            <option key={visualizarUnidades.CodTabUa} value={visualizarUnidades.CodTabUa}>{visualizarUnidades.DESCRICAO_UA}</option>
                                        ))}
                                    </Select>
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_referencia" onChange={valorInput} value={referencia.interessado_referencia} required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Select onChange={valorInput} name="cod_assunto" value={referencia.cod_assunto} required>
                                        <option>Selecione</option>
                                        {Object.values(assuntoReferencia).map(assunto => (
                                            <option key={assunto.id_assunto} value={assunto.id_assunto}> {assunto.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datEmissao_referencia" onChange={valorInput} value={referencia.datEmissao_referencia} required></Input>
                                    <Label>ANDAMENTO DO PROCESSO</Label>
                                    <Select onChange={valorInput} name="andamento" value={referencia.andamento} required>
                                        <option value="">Selecione</option>
                                        {Object.values(andamentoProcesso).map(andamento => (
                                            <option key={andamento.id_andamento} value={andamento.id_andamento}> {andamento.status_andamento}</option>
                                        ))}
                                    </Select>
                                </TdCadastro>
                                <TdCadastro>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_referencia" onChange={valorInput} value={referencia.executor_referencia} required></Input>
                                    <Label>UNIDADE DE POSSE</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_referencia" value={referencia.setorElaboracao_referencia} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>Nº BANQUINHO</Label>
                                    <Input type="number" placeholder="Executor" name="referencia_banquinho" onChange={valorInput} value={referencia.referencia_banquinho} required></Input>
                                    <Label>DATA DA VIGÊNCIA </Label>
                                    <Input type="date" name="vigencia_referencia" onChange={valorInput} value={referencia.vigencia_referencia}></Input>
                                    <Label>OBSERVAÇÃO</Label>
                                    <TextArea name="observacao_referencia" cols="50 rows" rows="8" id="" onChange={valorInput} value={referencia.observacao_referencia}></TextArea>
                                </TdCadastro>
                            </tr>
                        </TBODY>
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                        <br></br>

                    </DivButton>
                </form>
            </Container>
        </div>
    )
}