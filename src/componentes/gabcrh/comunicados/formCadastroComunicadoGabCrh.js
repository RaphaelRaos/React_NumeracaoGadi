import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Tr, LineCadastro } from './styles';
import { Header } from '../../header/header';


export const FormCadComunicadosGabCrh = () => {

    const [comunicados, setComunicadoGabCrh] = useState({
        datEmissao_comunicado: "",
        assunto_comunicado: "",
        executor_comunicado: "",
        setorElaboracao_comunicado: "",
        observacao_comunicado: "",
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntoComunicado, setAssunto] = useState([]);

    const valorInput = e => setComunicadoGabCrh({ ...comunicados, [e.target.name]: e.target.value });

    const cadComunicados = async e => {    

        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_COMUNICADO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comunicados })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
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
                    setComunicadoGabCrh({
                        datEmissao_comunicado: "",
                        assunto_comunicado: "",
                        executor_comunicado: "",
                        setorElaboracao_comunicado: "",
                        observacao_comunicado: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Comunicado não cadastrado. Contate o Administrador do Sistema!!'
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

    const assuntosGabCrh = async() => {
        await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
        .then((response) => response.json())
        .then((responseJson)=>{
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
                    <Titulo>CADASTRO DE COMUNICADOS</Titulo>
                    <BotaoAcao>
                        <Link to="/ComunicadosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadComunicados}>
                    <TableForm >
                        <tbody>
                            <Tr>
                                <LineCadastro>
                                    <Label>ASSUNTO: </Label>
                                    <Select onChange={valorInput} name="assunto_comunicado" value={comunicados.assunto_comunicado} required>
                                        <option>Selecione</option>
                                        {Object.values(assuntoComunicado).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>DATA ELABORAÇÃO: </Label>
                                    <Input type="date" name="datEmissao_comunicado" onChange={valorInput} value={comunicados.datEmissao_comunicado} required></Input>
                                    <Label>EXECUTOR: </Label>
                                    <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" onChange={valorInput} value={comunicados.executor_comunicado} required></Input>
                                    <Label>AREA: </Label>
                                    <Select onChange={valorInput} name="setorElaboracao_comunicado" value={comunicados.setorElaboracao_comunicado} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇÃO</Label>
                                    <TextArea name="observacao_comunicado" cols="50 rows" rows="5" onChange={valorInput} value={comunicados.observacao_comunicado}></TextArea>
                                </LineCadastro>
                            </Tr>
                        </tbody>
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    );
}