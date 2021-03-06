import React, {useEffect, useState} from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/portarias/styles';
import { Link } from 'react-router-dom';

export const FormEditPortariaGabCrh = (props) => {

    const [id_portaria] = useState(props.match.params.id);
    const [assunto_portaria, setCodAssunto] = useState('');
    const [assuntoDescricao_portaria, setAssuntoDescricao] = useState('');
    const [executor_portaria, setExecutor] = useState('');
    const [setorElaboracao_portaria, setCodAreaDespacho] = useState('');
    const [descricaoArea_portaria, setAreaDespacho] = useState('');
    const [observacao_portaria, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editPortaria = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_PORTARIAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_portaria, assunto_portaria, executor_portaria, setorElaboracao_portaria, observacao_portaria})
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
                    mensagem: "OFICIO CIRCULAR n??o editado, tente mais tarde!"
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
        const getOficioCircularGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_PORTARIAS + id_portaria)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.portaria.assunto_portaria)
                    setAssuntoDescricao(responseJson.portaria.assuntoportaria)
                    setExecutor(responseJson.portaria.executor_portaria)
                    setCodAreaDespacho(responseJson.portaria.setorElaboracao_portaria)
                    setAreaDespacho(responseJson.portaria.setorportaria)
                    setObservacao(responseJson.portaria.observacao_portaria)
                })
        }
        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        getOficioCircularGabCrh();
        setores();
        assuntosGabCrh();

    }, [id_portaria]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR PORTARIA </Titulo>
                    <BotaoAcao>
                        <Link to="/PortariaGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editPortaria}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_portaria" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_portaria}>{assuntoDescricao_portaria}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Oficio" name="executor_portaria" value={executor_portaria} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_portaria}>{descricaoArea_portaria}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVA??AO</Label>
                                    <TextArea name="observacao_portaria" cols="50 rows" rows="5" id="" value={observacao_portaria} onChange={e => setObservacao(e.target.value)}></TextArea>
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