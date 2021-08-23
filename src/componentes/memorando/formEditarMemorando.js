import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';


export const FormEditarMemorando = (props) => {

    const [id_memorando] = useState(props.match.params.id);
    const [interessado_memorando,setInteressado] = useState('');
    const [assunto_memorando,setAssunto] = useState('');
    const [executor_memorando,setExecutor] = useState('');
    const [setor_memorando,setSetor] = useState('');
    const [observacao_memorando,setObservacao] = useState('');
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editMemorando = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_MEMORANDOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_memorando,interessado_memorando, assunto_memorando, executor_memorando, setor_memorando, observacao_memorando})
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.erro){
                    setStatus({
                        type:'error',
                        mensagem:responseJson.mensagem
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
                    mensagem: "Memorando, tente mais tarde!"
                });
            });       
    }

    const setores = async() =>{
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
        .then((response) => response.json())
        .then((responseJson) => {
            setSetorAlteracao(responseJson.registro_setor);
        })
    }

    useEffect(() => {
        const getMemorando = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_MEMORANDO + id_memorando)
            .then((response) => response.json())
            .then((responseJson) => {
                setInteressado(responseJson.memorando.interessado_memorando)
                setAssunto(responseJson.memorando.assunto_memorando)
                setExecutor(responseJson.memorando.executor_memorando)
                setSetor(responseJson.memorando.setor_memorando)
                setObservacao(responseJson.memorando.observacao_memorando)
            })
        }
        getMemorando();
        setores();

    },[id_memorando]);

    return (
        <div>
            <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>EDITAR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/memorandos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                
                <form onSubmit={editMemorando}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>                                                                         
                                    <Label>INTERESSADO</Label>
                                        <Input type="text" placeholder="Interessado" name="interessado_memorando" value={interessado_memorando} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                        <Input type="text" placeholder="Assunto Despacho" name="assunto_memorando" value ={assunto_memorando} onChange={e => setAssunto(e.target.value)}></Input>                       
                                    <Label>EXECUTOR</Label>
                                        <Input type="text" placeholder="Interessado" name ="executor_memorando" value={executor_memorando} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                        <Select name="setor_memorando" onChange={e => setSetor(e.target.value)}>
                                            <option value={setor_memorando}>{setor_memorando}</option>
                                            {Object.values(nomenclaturaSetor).map(setor => (
                                                <option key={setor.id_setor}>{setor.nome_setor}</option>
                                        ))}
                                        </Select>
                                    <Label>OBSERVAÇAO</Label>
                                        <TextArea name = "observacao_memorando" cols = "50 rows" rows = "5" id="" value={observacao_memorando} onChange={e => setObservacao(e.target.value)}></TextArea>                                
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