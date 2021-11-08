import React, { useEffect, useState } from "react";
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/despachos/styles';
import { Link } from 'react-router-dom';


export const FormCadDespachosGabCrh = () => {

    const [despacho, setDespacho] = useState({
        datElaboracao_despacho: "",
        assunto_despacho: "",
        executor_despacho:"",       
        setorElaboracao_despacho: "",
        observacao_despacho: "",
    });



    const [nomenclaturaDepartamento, setDepartamento] = useState([]);
    const [assunto_despacho, setAssunto] = useState([]);    

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setDespacho({ ...despacho, [e.target.name]: e.target.value });

    const cadDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_CADASTRAR_DESPACHOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ despacho })
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
                        mensagem: responseJson.numero_despacho,                            
                    });                                     
                    setDespacho({
                        datElaboracao_despacho: "",
                        assunto_despacho: "",
                        executor_despacho: "",
                        setorElaboracao_despacho: "",
                        observacao_despacho: "",                        
                    });                    
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Despacho não cadastrado. Contate o Administrador do Sistema!!'
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
                    <Titulo>CADASTRO DE DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/DespachosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>NÚMERO DO DESPACHO: {status.mensagem}</AlertSuccess> : ""}             
                <form onSubmit={cadDespacho}>
               
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>DATA ENTRADA</Label>
                                    <Input type="date" name="datElaboracao_despacho" onChange={valorInput} value={despacho.datElaboracao_despacho} required></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Select onChange={valorInput} name="assunto_despacho" value={despacho.assunto_comunicado} required>
                                        <option>Selecione</option>
                                        {Object.values(assunto_despacho).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Despacho" name="executor_despacho" onChange={valorInput} value={despacho.executor_despacho} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_despacho" value={despacho.setorElaboracao_despacho} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_despacho" cols="50 rows" rows="5" id="" onChange={valorInput} value={despacho.observacao_despacho}></TextArea>
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