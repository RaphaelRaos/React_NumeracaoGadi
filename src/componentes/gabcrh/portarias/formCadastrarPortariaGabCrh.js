import React, {useState, useEffect} from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/portarias/styles';
import { Link } from 'react-router-dom';

export const FormCadPortariaGabCrh = () => {

    const [portaria, setPortaria] = useState({
        datElaboracao_portaria: "",
        assunto_portaria: "",
        executor_portaria: "",
        setorElaboracao_portaria: "",
        observacao_portaria: "",
    });

    const [nomenclaturaDepartamento, setDepartamento] = useState([]);
    const [assunto_portaria, setAssunto] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setPortaria({ ...portaria, [e.target.name]: e.target.value });

    const cadOficioCircular = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_PORTARIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ portaria })
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
                        mensagem: responseJson.numero_portaria,
                    });
                    setPortaria({
                        datElaboracao_portaria: "",
                        assunto_portaria: "",
                        executor_portaria: "",
                        setorElaboracao_portaria: "",
                        observacao_portaria: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Portaria não Cadastrada. Contate o Administrador do Sistema!!'
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
                    <Titulo>CADASTRO DE PORTARIA</Titulo>
                    <BotaoAcao>
                        <Link to="/PortariaGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>NÚMERO DA PORTARIA: {status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadOficioCircular}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_portaria" onChange={valorInput} value={portaria.datElaboracao_portaria} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Select onChange={valorInput} name="assunto_portaria" value={portaria.assunto_portaria} required>
                                        <option>Selecione</option>
                                        {Object.values(assunto_portaria).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Oficio" name="executor_portaria" onChange={valorInput} value={portaria.executor_portaria} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_portaria" value={portaria.setorElaboracao_portaria} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_portaria" cols="50 rows" rows="5" id="" onChange={valorInput} value={portaria.observacao_portaria}></TextArea>
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

