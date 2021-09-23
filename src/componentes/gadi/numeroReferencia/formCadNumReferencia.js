import React, { useState, useEffect } from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, TBODY, TdCadastro } from './styles';
import { Link } from 'react-router-dom';

export const FormCadNumRef = () => {


    const [referencia, setReferencia] = useState({
        num_processo_referencia: "",
        des_ua: "",
        des_uo: "",
        interessado_referencia: "",
        assunto: "",
        datEntrada_referencia: "",
        executor_referencia: "",
        posse_referencia: "",
        vigencia_referencia: "",
        observacao_referencia: "",
    });


    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
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

    const unidadeAdministrativa = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_UA)
            .then((response) => response.json())
            .then((responseJson) => {
                setDestinacao(responseJson.registro_UA);
            })
    }
    const unidadeOrcamentaria = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_UO)
            .then((response) => response.json())
            .then((responseJson) => {
                setOrcamentaria(responseJson.registro_UO);
            })
    }
    const setores = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
            .then((response) => response.json())
            .then((responseJson) => {
                setSetor(responseJson.registro_setor);
            })
    }
    useEffect(() => {
        unidadeAdministrativa();
        unidadeOrcamentaria();
        setores();
        assunto();
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
                        des_ua: "",
                        des_uo: "",
                        interessado_referencia: "",
                        assunto: "",
                        datEntrada_referencia: "",
                        executor_referencia: "",
                        posse_referencia: "",
                        vigencia_referencia: "",
                        observacao_referencia: "",
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
                                    <Input type="text" placeholder="Número Processo" name="num_processo_referencia" onChange={valorInput}  value={referencia.num_processo_referencia} required ></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="des_ua" onChange={valorInput} value={referencia.des_ua} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUA).map(unidadeAdministrativa => (
                                            <option key={unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                        ))}
                                    </Select>
                                    <Label>COORDENADORIA</Label>
                                    <Select name="des_uo" onChange={valorInput} value={referencia.des_uo} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria => (
                                            <option key={unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                        ))}
                                    </Select>
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_referencia" onChange={valorInput}  value ={referencia.interessado_referencia} required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Select onChange={valorInput} name="assunto"  value={referencia.assunto} required>
                                        <option value="">Selecione</option>
                                        {Object.values(assuntoReferencia).map(assunto => (
                                            <option key={assunto.id_assunto}> {assunto.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datEntrada_referencia" onChange={valorInput} value={referencia.datEntrada_referencia} required></Input>
                                </TdCadastro>
                                <TdCadastro>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_referencia" onChange={valorInput} value={referencia.executor_referencia} required></Input>
                                    <Label>UNIDADE DE POSSE</Label>
                                    <Select onChange={valorInput} name="posse_referencia" value={referencia.posse_referencia} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_area}>{setor.area}</option>
                                        ))}
                                    </Select>
                                    <Label>DATA DA VIGÊNCIA </Label>
                                    <Input type="date" name="vigencia_referencia" onChange={valorInput} value ={referencia.vigencia_referencia}></Input>
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