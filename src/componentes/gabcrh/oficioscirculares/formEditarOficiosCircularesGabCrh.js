import React, {useState, useEffect} from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/oficioCircular/styles';
import { Link } from 'react-router-dom';

export const FormEditOficioCircularGabCrh = (props) => {

    const [id_oficioCircular] = useState(props.match.params.id);
    const [assunto_oficioCircular, setCodAssunto] = useState('');
    const [assuntoDescricao_oficioCircular, setAssuntoDescricao] = useState('');
    const [executor_oficioCircular, setExecutor] = useState('');
    const [setorElaboracao_oficioCircular, setCodAreaDespacho] = useState('');
    const [descricaoArea_oficioCircular, setAreaDespacho] = useState('');
    const [observacao_oficioCircular, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editOficioCircular = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_OFICIOCIRCULAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_oficioCircular, assunto_oficioCircular, executor_oficioCircular, setorElaboracao_oficioCircular, observacao_oficioCircular})
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
                    mensagem: "OFICIO CIRCULAR não editado, tente mais tarde!"
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
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_OFICIOCIRCULAR + id_oficioCircular)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.oficioCircular.assunto_oficioCircular)
                    setAssuntoDescricao(responseJson.oficioCircular.assuntooficioCircular)
                    setExecutor(responseJson.oficioCircular.executor_oficioCircular)
                    setCodAreaDespacho(responseJson.oficioCircular.setorElaboracao_oficioCircular)
                    setAreaDespacho(responseJson.oficioCircular.setoroficioCircular)
                    setObservacao(responseJson.oficioCircular.observacao_oficioCircular)
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

    }, [id_oficioCircular]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR OFICIO CIRULAR</Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosCircularesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editOficioCircular}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_oficioCircular" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_oficioCircular}>{assuntoDescricao_oficioCircular}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Oficio" name="executor_oficioCircular" value={executor_oficioCircular} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_oficioCircular}>{descricaoArea_oficioCircular}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_oficioCircular" cols="50 rows" rows="5" id="" value={observacao_oficioCircular} onChange={e => setObservacao(e.target.value)}></TextArea>
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