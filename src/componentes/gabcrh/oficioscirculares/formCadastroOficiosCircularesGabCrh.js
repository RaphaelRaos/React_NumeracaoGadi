import React,  {useEffect, useState} from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/oficioCircular/styles';
import { Link } from 'react-router-dom';


export const FormCadOficioCircularGabCrh = () => {

    const [oficioCircular, setOficioCircular] = useState({
        datElaboracao_oficioCircular: "",
        assunto_oficioCircular: "",
        executor_oficioCircular: "",
        setorElaboracao_oficioCircular: "",
        observacao_oficioCircular: "",
    });

    const [nomenclaturaDepartamento, setDepartamento] = useState([]);
    const [assunto_oficioCircular, setAssunto] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setOficioCircular({ ...oficioCircular, [e.target.name]: e.target.value });

    const cadOficioCircular = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_OFICIOCIRCULAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oficioCircular })
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
                        mensagem: responseJson.numero_oficioCircular,
                    });
                    setOficioCircular({
                        datElaboracao_oficioCircular: "",
                        assunto_oficioCircular: "",
                        executor_oficioCircular: "",
                        setorElaboracao_oficioCircular: "",
                        observacao_oficioCircular: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Oficio Circular n??o Cadastrado. Contate o Administrador do Sistema!!'
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
                    <Titulo>CADASTRO DE OFICIO CIRCULAR</Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosCircularesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>N??MERO DO OFICIO: {status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadOficioCircular}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_oficioCircular" onChange={valorInput} value={oficioCircular.datElaboracao_oficioCircular} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Select onChange={valorInput} name="assunto_oficioCircular" value={oficioCircular.assunto_oficioCircular} required>
                                        <option>Selecione</option>
                                        {Object.values(assunto_oficioCircular).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Oficio" name="executor_oficioCircular" onChange={valorInput} value={oficioCircular.executor_oficioCircular} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_oficioCircular" value={oficioCircular.setorElaboracao_oficioCircular} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVA??AO</Label>
                                    <TextArea name="observacao_oficioCircular" cols="50 rows" rows="5" id="" onChange={valorInput} value={oficioCircular.observacao_oficioCircular}></TextArea>
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