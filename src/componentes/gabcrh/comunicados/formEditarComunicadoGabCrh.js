import React, { useState, useEffect } from "react";
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Tr, LineCadastro } from './styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';


export const FormEditComunicadosGabCrh = (props) => {

    const [id_comunicado] = useState(props.match.params.id);
    const [assunto_comunicado, setCodAssunto] = useState('');
    const [descAssunto_comunicado, setAssunto] = useState('');
    const [executor_comunicado, setExecutor] = useState('');
    const [observacao_comunicado, setObservacao] = useState('');
    const [setorElaboracao_comunicado, setCodComunicado] = useState('');
    const [descricaoArea_comunicado, setDescricaoComunicado] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);



    const editComunicado = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_COMUNICADO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_comunicado, assunto_comunicado, executor_comunicado, setorElaboracao_comunicado, observacao_comunicado })

        }).then((response) => response.json())
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
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Comunicado não Editado. Contate o Administrador do Sistema!!'
                });
            });
    }


    useEffect(() => {
        const getComunicados = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_COMUNICADO + id_comunicado)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.comunicado.assunto_comunicado);
                    setAssunto(responseJson.comunicado.assuntoComunicado);
                    setExecutor(responseJson.comunicado.executor_comunicado);
                    setObservacao(responseJson.comunicado.observacao_comunicado);
                    setCodComunicado(responseJson.comunicado.setorElaboracao_comunicado);
                    setDescricaoComunicado(responseJson.comunicado.setorComunicado)
                })
        }

        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        const setores = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_DEPARTAMENTOS)
                .then((response) => response.json())
                .then((responseJson) => {
                    setSetor(responseJson.registro_departamento);
                })
        }
        setores();
        getComunicados();
        assuntosGabCrh();
    }, [id_comunicado]);
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR COMUNICADOS</Titulo>
                    <BotaoAcao>
                        <Link to="/ComunicadosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={editComunicado}>
                    <TableForm >
                        <tbody>
                            <Tr>
                                <LineCadastro>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_comunicado" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_comunicado}>{descAssunto_comunicado}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR: </Label>
                                    <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" value={executor_comunicado} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodComunicado(e.target.value)}>
                                        <option value={setorElaboracao_comunicado}>{descricaoArea_comunicado}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇÃO</Label>
                                    <TextArea name="observacao_comunicado" cols="50 rows" rows="5" value={observacao_comunicado} onChange={e => setObservacao(e.target.value)}></TextArea>
                                </LineCadastro>
                            </Tr>
                        </tbody>

                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Editar</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    )
}
