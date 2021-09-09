import React, { useEffect, useState } from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Tr, Td } from './styles';
import { Link } from 'react-router-dom';

export const FormCadRelRemessa = () => {

    const [remessa, setRemessa] = useState({

        numProcesso_remessa: "",
        des_ua: "",
        des_uo: "",
        interessado_remessa: "",
        assunto_remessa: "",
        datEmissao_remessa: "",
        executor_remessa: "",
        area_remessa: "",
        observacao_remessa: ""
    })

    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setRemessa({ ...remessa, [e.target.name]: e.target.value });

    const cadRemessa = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_OFICIOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remessa })
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
                    setRemessa({
                        numProcesso_remessa: "",
                        des_ua: "",
                        des_uo: "",
                        interessado_remessa: "",
                        assunto_remessa: "",
                        datEmissao_remessa: "",
                        executor_remessa: "",
                        area_remessa: "",
                        observacao_remessa: ""
                    })
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Despacho não cadastrado. Contate o Administrador do Sistema!!'
                });
            });
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
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE RELAÇÃO DE REMESSAS</Titulo>
                    <BotaoAcao>
                        <Link to="/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadRemessa}>
                    <TableForm>
                        <tbody>
                            <Tr>
                                <Td>
                                    <Label>NUMERO SISRAD / PROCESSO </Label>
                                    <Input type="" placeholder="Numero Processo / Sisrad" name="numProcesso_remessa" onChange={valorInput} value={remessa.numProcesso_remessa} required></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="des_ua" onChange={valorInput} value={remessa.des_ua} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUA).map(unidadeAdministrativa => (
                                            <option key={unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                        ))}
                                    </Select>
                                    <Label>UNIDADE ORÇAMENTÁRIA</Label>
                                    <Select name="des_uo" onChange={valorInput} value={remessa.des_uo} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria => (
                                            <option key={unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                        ))}
                                    </Select>
                                    <Label>INTERESSADO </Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_remessa" onChange={valorInput} value={remessa.interessado_remessa} required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Remessa" name="assunto_remessa" onChange={valorInput} value={remessa.assunto_remessa} required></Input>
                                </Td>
                                <Td>
                                    <Label>DATA DE EMISSÃO</Label>
                                    <Input type="date" name="datEmissao_remessa" onChange={valorInput} value={remessa.datEmissao_remessa} required></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_remessa" onChange={valorInput} value={remessa.executor_remessa} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="area_remessa" value={remessa.area_remessa} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_area}>{setor.area}</option>
                                        ))}
                                    </Select>
                                    <TextArea name="observacao_remessa" cols="50 rows" rows="5" id="" onChange={valorInput} value={remessa.observacao_remessa}></TextArea>
                                </Td>
                            </Tr>
                        </tbody>
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    )
}