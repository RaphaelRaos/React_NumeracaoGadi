import React, { useEffect, useState } from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';
import { Link } from 'react-router-dom';

export const FormCadDespacho = () => {

    const [despacho, setDespacho] = useState({
        numero_sisrad_processo: "",        
        interessado_despacho: "",
        assunto_despacho: "",
        datEmissao_despacho: "",
        executor_despacho: "",
        referencia_banquinho: "",
        setorElaboracao_despacho: "",
        observacao_despacho: "",
        codtabua:""
    });

    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setDespacho({ ...despacho, [e.target.name]: e.target.value });

    const cadDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_DESPACHOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ despacho })
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
                    setDespacho({
                        numero_sisrad_processo: "",
                        codtabua: "",
                        interessado_despacho: "",
                        datEmissao_despacho: "",
                        assunto_despacho: "",
                        executor_despacho: "",
                        setorElaboracao_despacho: "",
                        observacao_despacho: "",
                        referencia_banquinho: ""
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Despacho não cadastrado. Contate o Administrador do Sistema!!'
                });
            });
    }
    const unidadeAdministrativa = async () => {
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
    useEffect(() => {
        unidadeAdministrativa();
        setores();
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadDespacho}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>NUMERO SISRAD/PROCESSOR</Label>
                                    <Input type="text" placeholder="Numero Sisrad / Processo" name="numero_sisrad_processo" onChange={valorInput} value={despacho.numero_sisrad_processo} required></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="codtabua" onChange={valorInput} value={despacho.codtabua} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUA).map(unidadeAdministrativa => (
                                            <option key={unidadeAdministrativa.CodTabUa} value={unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.DESCRICAO_UA}</option>
                                        ))}
                                    </Select>
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_despacho" onChange={valorInput} value={despacho.interessado_despacho}required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Despacho" name="assunto_despacho" onChange={valorInput} value={despacho.assunto_despacho} required></Input>

                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" placeholder="" name="datEmissao_despacho" onChange={valorInput} value={despacho.datEmissao_despacho} required></Input>

                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Interessado" name="executor_despacho" onChange={valorInput} value={despacho.executor_despacho}required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_despacho" value={despacho.setorElaboracao_despacho} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>REFERENCIA BANQUINHO</Label>
                                    <Input type="number" placeholder="Referência Planilha Excel" name="referencia_banquinho" onChange={valorInput} value={despacho.referencia_banquinho}></Input>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_despacho" cols="50 rows" rows="5" id="" onChange={valorInput} value={despacho.observacao_despacho}></TextArea>
                                </th>
                            </tr>
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