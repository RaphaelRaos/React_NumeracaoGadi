import React, {useEffect, useState} from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/portarias/styles';
import { Link } from 'react-router-dom';


export const FormEditRemessaGabCrh = (props) => {

    const [id_remessa] = useState(props.match.params.id);
    const [assunto_remessa, setCodAssunto] = useState('');
    const [assuntoDescricao_remessa, setAssuntoDescricao] = useState('');
    const [executor_remessa, setExecutor] = useState('');
    const [setorElaboracao_remessa, setCodAreaDespacho] = useState('');
    const [descricaoArea_remessa, setAreaDespacho] = useState('');
    const [observacao_remessa, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editRemessa = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_REMESSA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_remessa, assunto_remessa, executor_remessa, setorElaboracao_remessa, observacao_remessa})
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
                    mensagem: "Remessa não editada, tente mais tarde!"
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
        const getRemessaGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_REMESSA + id_remessa)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.remessa.assunto_remessa)
                    setAssuntoDescricao(responseJson.remessa.assuntoremessa)
                    setExecutor(responseJson.remessa.executor_remessa)
                    setCodAreaDespacho(responseJson.remessa.setorElaboracao_remessa)
                    setAreaDespacho(responseJson.remessa.setorremessa)
                    setObservacao(responseJson.remessa.observacao_remessa)
                })
        }
        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        getRemessaGabCrh();
        setores();
        assuntosGabCrh();

    }, [id_remessa]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR REMESSA </Titulo>
                    <BotaoAcao>
                        <Link to="/RemessaGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editRemessa}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_remessa" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_remessa}>{assuntoDescricao_remessa}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Oficio" name="executor_remessa" value={executor_remessa} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_remessa}>{descricaoArea_remessa}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_remessa" cols="50 rows" rows="5" id="" value={observacao_remessa} onChange={e => setObservacao(e.target.value)}></TextArea>
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