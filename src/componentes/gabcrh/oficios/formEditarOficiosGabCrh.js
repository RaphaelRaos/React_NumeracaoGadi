import React, {useState, useEffect} from 'react';
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/oficios/styles';
import { Link } from 'react-router-dom';

export const FormEditOficiosGabCrh = (props) => {

    const [id_oficio] = useState(props.match.params.id);
    const [assunto_oficio, setCodAssunto] = useState('');
    const [assuntoDescricao_oficio, setAssuntoDescricao] = useState('');
    const [executor_oficio, setExecutor] = useState('');
    const [setorElaboracao_oficio, setCodAreaDespacho] = useState('');
    const [descricaoArea_oficio, setAreaDespacho] = useState('');
    const [observacao_oficio, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_OFICIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_oficio, assunto_oficio, executor_oficio, setorElaboracao_oficio, observacao_oficio})
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
        const getOficioGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_OFICIOS + id_oficio)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.oficio.assunto_oficio)
                    setAssuntoDescricao(responseJson.oficio.assuntooficio)
                    setExecutor(responseJson.oficio.executor_oficio)
                    setCodAreaDespacho(responseJson.oficio.setorElaboracao_oficio)
                    setAreaDespacho(responseJson.oficio.setorOficio)
                    setObservacao(responseJson.oficio.observacao_oficio)
                })
        }
        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        getOficioGabCrh();
        setores();
        assuntosGabCrh();

    }, [id_oficio]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR OFICIO</Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editOficio}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_oficio" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_oficio}>{assuntoDescricao_oficio}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Oficio" name="executor_oficio" value={executor_oficio} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_oficio}>{descricaoArea_oficio}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_oficio" cols="50 rows" rows="5" id="" value={observacao_oficio} onChange={e => setObservacao(e.target.value)}></TextArea>
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
