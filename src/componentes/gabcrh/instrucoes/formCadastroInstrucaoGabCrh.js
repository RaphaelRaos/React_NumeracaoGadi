import React, { useEffect, useState } from "react"
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/instrucoes/styles';
import { Link } from 'react-router-dom';

export const FormCadInstrucaoGabCrh = () => {

    const [instrucao, setInstrucao] = useState({
        datElaboracao_instrucao: "",
        assunto_instrucao: "",
        executor_instrucao: "",
        setorElaboracao_instrucao: "",
        observacao_instrucao: "",
    });

    const [nomenclaturaDepartamento, setDepartamento] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setInstrucao({ ...instrucao, [e.target.name]: e.target.value });

    const cadInstrucao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_INSTRUCOES, {
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
                        mensagem: responseJson.numero_instrucao,
                    });
                    setInstrucao({
                        datElaboracao_instrucao: "",
                        assunto_instrucao: "",
                        executor_instrucao: "",
                        setorElaboracao_instrucao: "",
                        observacao_instrucao: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Instrução não Cadastrada. Contate o Administrador do Sistema!!'
                });
            });
    }

    const setores = async () => {
        await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_DEPARTAMENTOS)
            .then((response) => response.json())
            .then((responseJson) => {
                setDepartamento(responseJson.registro_departamento);
            })
    }

    useEffect(() => {
        setores();
    }, [])

    return (

        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE INSTRUÇÃO</Titulo>
                    <BotaoAcao>
                        <Link to="/InstrucoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>NÚMERO DA INSTRUCAO: {status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadInstrucao}>

                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_instrucao" onChange={valorInput} value={instrucao.datElaboracao_instrucao} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Input type="text" placeholder="Assunto Instrução" name="assunto_instrucao" onChange={valorInput} value={instrucao.assunto_instrucao} required></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Instrução" name="executor_instrucao" onChange={valorInput} value={instrucao.executor_instrucao} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_instrucao" value={instrucao.setorElaboracao_instrucao} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_instrucao" cols="50 rows" rows="5" id="" onChange={valorInput} value={instrucao.observacao_instrucao}></TextArea>
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
