import React, { useEffect, useState } from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';
import { Link } from 'react-router-dom';

export const FormCadInstrucao = () => {

    const [instrucao, setInstrucao] = useState({
        interessado_instrucao: "",
        assunto_instrucao: "",
        datEmissao_instrucao: "",
        executor_instrucao: "",
        setorElaboracao_instrucao: "",
        observacao_instrucao: "",
        referencia_banquinho: ""
    })

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const valorInput = e => setInstrucao({ ...instrucao, [e.target.name]: e.target.value });

    const [nomenclaturaSetor, setSetor] = useState([]);


    const setores = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
            .then((response) => response.json())
            .then((responseJson) => {
                setSetor(responseJson.registro_setor);
            })
    }

    useEffect(() => {
        setores();
    }, [])

    const cadInstrucao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_INSTRUCOES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instrucao })
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
                    setInstrucao({
                        interessado_instrucao: "",
                        assunto_instrucao: "",
                        datEmissao_instrucao: "",
                        executor_instrucao: "",
                        setorElaboracao_instrucao: "",
                        observacao_instrucao: "",
                        referencia_banquinho: ""
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Instrução não Cadastrada. Contate o Administrador do Sistema!!'
                });
            });
    }

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE INSTRUÇÕES</Titulo>
                    <BotaoAcao>
                        <Link to="/instrucoes">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadInstrucao}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <td>
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado Instrução" name="interessado_instrucao" onChange={valorInput} value={instrucao.interessado_instrucao} required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto da Instrução" name="assunto_instrucao" onChange={valorInput} value={instrucao.assunto_instrucao} required></Input>
                                    <Label>DATA EMISSÃO</Label>
                                    <Input type="date" name="datEmissao_instrucao" onChange={valorInput} value={instrucao.datEmissao_instrucao} required></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor " name="executor_instrucao" onChange={valorInput} value={instrucao.executor_instrucao} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_instrucao" value={instrucao.setorElaboracao_instrucao} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>REFERÊNCIA BANQUINHO</Label>
                                    <Input type="number" placeholder="Número Banquinho " name="referencia_banquinho" onChange={valorInput} value={instrucao.referencia_banquinho} ></Input>
                                    <Label>OBSERVAÇÃO</Label>
                                    <TextArea name="observacao_instrucao" cols="50 rows" rows="5" id="" onChange={valorInput} value={instrucao.observacao_instrucao}></TextArea>
                                </td>
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