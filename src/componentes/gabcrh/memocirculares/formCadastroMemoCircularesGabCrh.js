import React, {useState, useEffect} from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/memocirculares/styles';
import { Link } from 'react-router-dom';

export const FormCadMemoCircularGabCrh = () => {

    const [memorandoCircular, setMemoCircular] = useState({
        datElaboracao_memorandoCircular: "",
        assunto_memorandoCircular: "",
        executor_memorandoCircular: "",
        setorElaboracao_memorandoCircular: "",
        observacao_memorandoCircular: "",
    });
    const [nomenclaturaDepartamento, setDepartamento] = useState([]);
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setMemoCircular({ ...memorandoCircular, [e.target.name]: e.target.value });

    const cadMemorando = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_MEMOCIRCULARES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memorandoCircular })
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
                        mensagem: responseJson.numero_memorandoCircular,
                    });
                    setMemoCircular({
                        datElaboracao_memorandoCircular: "",
                        assunto_memorandoCircular: "",
                        executor_memorandoCircular: "",
                        setorElaboracao_memorandoCircular: "",
                        observacao_memorandoCircular: "",
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Memorando Circular n??o Cadastrado. Contate o Administrador do Sistema!!'
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

    useEffect(() => {
        setores();        
    }, [])

    return (

        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE MEMORANDO CIRCULAR</Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoCircularGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>N??MERO DO MEMORANDO CIRCULAR: {status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadMemorando}>

                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_memorandoCircular" onChange={valorInput} value={memorandoCircular.datElaboracao_memorandoCircular} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Input type="text" placeholder="Assunto Memorando Circular" name="assunto_memorandoCircular" onChange={valorInput} value={memorandoCircular.assunto_memorandoCircular} required></Input>                                  
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Memorando Circular" name="executor_memorandoCircular" onChange={valorInput} value={memorandoCircular.executor_memorandoCircular} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_memorandoCircular" value={memorandoCircular.setorElaboracao_memorandoCircular} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVA??AO</Label>
                                    <TextArea name="observacao_memorandoCircular" cols="50 rows" rows="5" id="" onChange={valorInput} value={memorandoCircular.observacao_memorandoCircular}></TextArea>
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