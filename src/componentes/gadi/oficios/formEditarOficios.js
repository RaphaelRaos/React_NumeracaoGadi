import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';


export const FormEditarOficio = (props) => {

    const [id_oficio] = useState(props.match.params.id);
    const [interessado_oficio, setInteressado] = useState('');
    const [assunto_oficio, setAssunto] = useState('');
    const [executor_oficio, setExecutor] = useState('');
    const [setorElaboracao_oficio, setCodSetor] = useState('');
    const [setor_oficio, setSetor] = useState('');
    const [referencia_banquinho, setBanquinho] = useState('');
    const [observacao_oficio, setObservacao] = useState('');
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_OFICIOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_oficio, interessado_oficio, assunto_oficio, executor_oficio, setorElaboracao_oficio, observacao_oficio, referencia_banquinho })
        })
            .then((response) => response.json())
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
                    mensagem: "Ofício não editado, tente mais tarde!"
                });
            });
    }

    const setores = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
            .then((response) => response.json())
            .then((responseJson) => {
                setSetorAlteracao(responseJson.registro_setor);
            })
    }

    useEffect(() => {
        const getOficio = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_OFICIOS + id_oficio)
                .then((response) => response.json())
                .then((responseJson) => {
                    setInteressado(responseJson.mensagem.interessado_oficio)
                    setAssunto(responseJson.mensagem.assunto_oficio)
                    setExecutor(responseJson.mensagem.executor_oficio)
                    setCodSetor(responseJson.mensagem.codSetor_oficio)
                    setSetor(responseJson.mensagem.area_oficio)
                    setObservacao(responseJson.mensagem.observacao_oficio)
                    setBanquinho (responseJson.mensagem.referencia_banquinho)
                })
        }
        setores();
        getOficio();
    }, [id_oficio]);


    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR OFÍCIOS</Titulo>
                    <BotaoAcao>
                        <Link to="/oficios">
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
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_oficio" value={interessado_oficio} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Despacho" name="assunto_oficio" value={assunto_oficio} onChange={e => setAssunto(e.target.value)}></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Interessado" name="executor_oficio" value={executor_oficio} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setor_oficio" onChange={e => setSetor(e.target.value)}>
                                        <option value={setorElaboracao_oficio}>{setor_oficio}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}>{setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>Nº BANQUINHO</Label>
                                    <Input type="text" placeholder="referencia_banquinho" name="executor_oficio" value={referencia_banquinho} onChange={e => setBanquinho(e.target.value)}></Input>
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
    )
}