import React, { useEffect, useState } from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';
import { Link } from 'react-router-dom';

export const FormCadMemorando = () => {

    const [memorando, setMemorando] = useState({
        interessado_memorando: "",
        assunto_memorando: "",
        datEmissao_memorando: "",
        executor_memorando: "",
        setorElaboracao_memorando: "",
        observacao_memorando: "",
        referencia_banquinho: ""
    })

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setMemorando({ ...memorando, [e.target.name]: e.target.value });

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

    const cadMemorando = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_MEMORANDOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memorando })
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
                    setMemorando({
                        interessado_memorando: "",
                        assunto_memorando: "",
                        datEmissao_memorando: "",
                        executor_memorando: "",
                        setorElaboracao_memorando: "",
                        observacao_memorando: "",
                        referencia_banquinho: ""
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Memorando n??o cadastrado. Contate o Administrador do Sistema!!'
                });
            });
    }

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE MEMORANDOS</Titulo>
                    <BotaoAcao>
                        <Link to="/memorandos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadMemorando}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <td>
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_memorando" onChange={valorInput} value={memorando.interessado_memorando} required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Memorando" name="assunto_memorando" onChange={valorInput} value={memorando.assunto_memorando} required></Input>
                                    <Label>DATA EMISS??O</Label>
                                    <Input type="date" onChange={valorInput} name="datEmissao_memorando" value={memorando.datEmissao_memorando} required></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_memorando" onChange={valorInput} value={memorando.executor_memorando} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_memorando" value={memorando.setorElaboracao_memorando} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>REFER??NCIA BANQUINHO</Label>
                                    <Input type="number" placeholder="N??mero de Refer??ncia Banquinho" name="referencia_banquinho" onChange={valorInput} value={memorando.referencia_banquinho} required></Input>
                                    <Label>OBSERVA????O</Label>
                                    <TextArea name="observacao_memorando" cols="50 rows" rows="5" id="" onChange={valorInput} value={memorando.observacao_memorando}></TextArea>
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