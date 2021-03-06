import React, {useEffect, useState} from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/memocirculares/styles';
import { Link } from 'react-router-dom';

export const FormEditMemoCircularGabCrh = (props) => {

    const [id_memorandoCircular] = useState(props.match.params.id);
    const [assunto_memorandoCircular, setAssuntoDescricao] = useState('');
    const [executor_memorandoCircular, setExecutor] = useState('');
    const [setorElaboracao_memorandoCircular, setCodAreaDespacho] = useState('');
    const [setormemorandoCircular, setAreaDespacho] = useState('');
    const [observacao_memorandoCircular, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editMemoCircular = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_MEMOCIRCULARES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_memorandoCircular, assunto_memorandoCircular, executor_memorandoCircular, setorElaboracao_memorandoCircular, observacao_memorandoCircular})
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
                    mensagem: "MEMORANDO CIRCULAR n??o editado, tente mais tarde!"
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
        const getMemorandoCircularGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_MEMOCIRCULARES + id_memorandoCircular)
                .then((response) => response.json())
                .then((responseJson) => {
                    setAssuntoDescricao(responseJson.memorandoCircular.assunto_memorandoCircular)
                    setExecutor(responseJson.memorandoCircular.executor_memorandoCircular)
                    setCodAreaDespacho(responseJson.memorandoCircular.setorElaboracao_memorandoCircular)
                    setAreaDespacho(responseJson.memorandoCircular.setormemorandoCircular)
                    setObservacao(responseJson.memorandoCircular.observacao_memorandoCircular)
                })
        }
        getMemorandoCircularGabCrh();
        setores();        

    }, [id_memorandoCircular]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR MEMORANDO CIRCULAR</Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoCircularGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editMemoCircular}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Memorando" name="assunto_memorandoCircular" value={assunto_memorandoCircular} onChange={e => setAssuntoDescricao(e.target.value)}></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Memorando" name="executor_memorandoCircular" value={executor_memorandoCircular} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_memorandoCircular}>{setormemorandoCircular}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVA??AO</Label>
                                    <TextArea name="observacao_memorandoCircular" cols="50 rows" rows="5" id="" value={observacao_memorandoCircular} onChange={e => setObservacao(e.target.value)}></TextArea>
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