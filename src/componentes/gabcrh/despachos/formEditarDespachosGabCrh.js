import React, { useState, useEffect } from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/despachos/styles';
import { Link } from 'react-router-dom';


export const FormEditDespachosGabCrh = (props) => {


    const [id_despacho] = useState(props.match.params.id);
    const [assunto_despacho, setCodAssunto] = useState('');
    const [assuntoDescricao_despacho, setAssuntoDescricao] = useState('');
    const [executor_despacho, setExecutor] = useState('');
    const [setorElaboracao_despacho, setCodAreaDespacho] = useState('');
    const [descricaoArea_despacho, setAreaDespacho] = useState('');
    const [observacao_despacho, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_DESPACHOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_despacho, assunto_despacho, executor_despacho, setorElaboracao_despacho, observacao_despacho})
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
                    mensagem: "Produto n??o editado com sucesso, tente mais tarde!"
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
        const getDespachoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_DESPACHOS + id_despacho)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.despacho.assunto_despacho)
                    setAssuntoDescricao(responseJson.despacho.assuntodespacho)
                    setExecutor(responseJson.despacho.executor_despacho)
                    setCodAreaDespacho(responseJson.despacho.setorElaboracao_despacho)
                    setAreaDespacho(responseJson.despacho.setordespacho)
                    setObservacao(responseJson.despacho.observacao_despacho)
                })
        }
        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        getDespachoGabCrh();
        setores();
        assuntosGabCrh();

    }, [id_despacho]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/DespachosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editDespacho}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_despacho" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_despacho}>{assuntoDescricao_despacho}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Despacho" name="executor_despacho" value={executor_despacho} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_despacho}>{descricaoArea_despacho}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVA??AO</Label>
                                    <TextArea name="observacao_despacho" cols="50 rows" rows="5" id="" value={observacao_despacho} onChange={e => setObservacao(e.target.value)}></TextArea>
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