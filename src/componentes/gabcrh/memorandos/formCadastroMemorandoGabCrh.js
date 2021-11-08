import React, {useState, useEffect} from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/memorandos/styles';
import { Link } from 'react-router-dom';

export const FormCadMemorandoGabCrh = () => {

    const [memorando, setMemorando] = useState({
        datElaboracao_memorando: "",
        assunto_memorando: "",
        executor_memorando: "",
        setorElaboracao_memorando: "",
        observacao_memorando: "",
    });



    const [nomenclaturaDepartamento, setDepartamento] = useState([]);
    const [assunto_memorando, setAssunto] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setMemorando({ ...memorando, [e.target.name]: e.target.value });

    const cadMemorando = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_MEMORANDOS, {
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
                        mensagem: responseJson.numero_memorando,
                    });
                    setMemorando({
                        datElaboracao_memorando: "",
                        assunto_memorando: "",
                        executor_memorando: "",
                        setorElaboracao_memorando: "",
                        observacao_memorando: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Memorando não Cadastrado. Contate o Administrador do Sistema!!'
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

    const assuntosGabCrh = async () => {
        await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
            .then((response) => response.json())
            .then((responseJson) => {
                setAssunto(responseJson.registro_assunto)
            })
    }

    useEffect(() => {
        setores();
        assuntosGabCrh();
    }, [])

    return (

        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE MEMORANDO</Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>NÚMERO DO MEMORANDO: {status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadMemorando}>

                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_memorando" onChange={valorInput} value={memorando.datElaboracao_memorando} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Select onChange={valorInput} name="assunto_memorando" value={memorando.assunto_memorando} required>
                                        <option>Selecione</option>
                                        {Object.values(assunto_memorando).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Memorando" name="executor_memorando" onChange={valorInput} value={memorando.executor_memorando} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_memorando" value={memorando.setorElaboracao_memorando} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_memorando" cols="50 rows" rows="5" id="" onChange={valorInput} value={memorando.observacao_memorando}></TextArea>
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