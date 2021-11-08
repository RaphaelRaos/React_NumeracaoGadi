import React, {useEffect, useState} from "react"
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/informacoes/styles';
import { Link } from 'react-router-dom';


export const FormCadInformacaoGabCrh = () => {
    const [informacao, setInformacao] = useState({
        datElaboracao_informacao: "",
        assunto_informacao: "",
        executor_informacao: "",
        setorElaboracao_informacao: "",
        observacao_informacao: "",
    });



    const [nomenclaturaDepartamento, setDepartamento] = useState([]);
    const [assunto_informacao, setAssunto] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setInformacao({ ...informacao, [e.target.name]: e.target.value });

    const cadInformacao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_INFORMACAO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ informacao })
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
                        mensagem: responseJson.numero_informacao,
                    });
                    setInformacao({
                        datElaboracao_informacao: "",
                        assunto_informacao: "",
                        executor_informacao: "",
                        setorElaboracao_informacao: "",
                        observacao_informacao: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Informação não Cadastrada. Contate o Administrador do Sistema!!'
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
                    <Titulo>CADASTRO DE INFORMAÇÃO</Titulo>
                    <BotaoAcao>
                        <Link to="/InformacoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>NÚMERO DA INFORMAÇÃO: {status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadInformacao}>

                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_informacao" onChange={valorInput} value={informacao.datElaboracao_informacao} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Select onChange={valorInput} name="assunto_informacao" value={informacao.assunto_informacao} required>
                                        <option>Selecione</option>
                                        {Object.values(assunto_informacao).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Informacao" name="executor_informacao" onChange={valorInput} value={informacao.executor_informacao} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_informacao" value={informacao.setorElaboracao_informacao} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_informacao" cols="50 rows" rows="5" id="" onChange={valorInput} value={informacao.observacao_informacao}></TextArea>
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