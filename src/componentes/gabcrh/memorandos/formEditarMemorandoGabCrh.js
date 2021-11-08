import React, {useState, useEffect} from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/memorandos/styles';
import { Link } from 'react-router-dom';

export const FormEditMemorandoGabCrh = (props) => {

    const [id_memorando] = useState(props.match.params.id);
    const [assunto_memorando, setCodAssunto] = useState('');
    const [assuntoDescricao_memorando, setAssuntoDescricao] = useState('');
    const [executor_memorando, setExecutor] = useState('');
    const [setorElaboracao_memorando, setCodAreaDespacho] = useState('');
    const [descricaoArea_memorando, setAreaDespacho] = useState('');
    const [observacao_memorando, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editMemorando = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_MEMORANDOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_memorando, assunto_memorando, executor_memorando, setorElaboracao_memorando, observacao_memorando})
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro) {
                    setStatus({
                        type: 'error',
                        mensagem: responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.mensagem
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'error',
                    mensagem: "MEMORANDO não editado, tente mais tarde!"
                });
            });
    }

    const setores = async () => {
        await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_DEPARTAMENTOS)
            .then((response) => response.json())
            .then((responseJson) => {
                setSetor(responseJson.registro_departamento);
            })
    }

    useEffect(() => {
        const getMemorandoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_MEMORANDO + id_memorando)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.memorando.assunto_memorando)
                    setAssuntoDescricao(responseJson.memorando.assuntomemorando)
                    setExecutor(responseJson.memorando.executor_memorando)
                    setCodAreaDespacho(responseJson.memorando.setorElaboracao_memorando)
                    setAreaDespacho(responseJson.memorando.setormemorando)
                    setObservacao(responseJson.memorando.observacao_memorando)
                })
        }
        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        getMemorandoGabCrh();
        setores();
        assuntosGabCrh();

    }, [id_memorando]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR MEMORANDO</Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editMemorando}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_memorando" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_memorando}>{assuntoDescricao_memorando}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Memorando" name="executor_memorando" value={executor_memorando} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_memorando}>{descricaoArea_memorando}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_memorando" cols="50 rows" rows="5" id="" value={observacao_memorando} onChange={e => setObservacao(e.target.value)}></TextArea>
                                </th>
                            </tr>
                        </tbody>
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Editar</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    );


}