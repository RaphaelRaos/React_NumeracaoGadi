import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';


export const FormEditarInstrucao = (props) => {

    const [id_instrucao] = useState(props.match.params.id);
    const [interessado_instrucao, setInteressado] = useState('');
    const [assunto_instrucao, setAssunto] = useState('');
    const [executor_instrucao, setExecutor] = useState('');
    const [setorElaboracao_instrucao, setSetorElaboracao_instrucao] = useState('');
    const [descrSetor_instrucao, setDescInstrucao] = useState('');
    const [observacao_instrucao, setObservacao] = useState('');
    const [referencia_banquinho, setReferencia] = useState('');
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);



    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editInstrucao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_INSTRUCOES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({ id_instrucao, interessado_instrucao, assunto_instrucao, executor_instrucao, setorElaboracao_instrucao, observacao_instrucao, referencia_banquinho  })
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
                    mensagem: "Produto n??o editado com sucesso, tente mais tarde!"
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
        const getInstrucoes = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_INSTRUCOES + id_instrucao)
                .then((response) => response.json())
                .then((responseJson) => {
                    setInteressado(responseJson.instrucao.interessado_instrucao);
                    setAssunto(responseJson.instrucao.assunto_instrucao);
                    setExecutor(responseJson.instrucao.executor_instrucao);
                    setSetorElaboracao_instrucao(responseJson.instrucao.codSetor_instrucao);
                    setDescInstrucao(responseJson.instrucao.setor);
                    setReferencia(responseJson.instrucao.referencia_banquinho);            
                    setObservacao(responseJson.instrucao.observacao_instrucao);
                })
        }
        getInstrucoes();
        setores();

    }, [id_instrucao]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR INSTRU????O</Titulo>
                    <BotaoAcao>
                        <Link to="/instrucoes">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editInstrucao}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>INTERESSADO</Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_instrucao" value={interessado_instrucao} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Despacho" name="assunto_instrucao" value={assunto_instrucao} onChange={e => setAssunto(e.target.value)}></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Interessado" name="executor_instrucao" value={executor_instrucao} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_instrucao" onChange={e => setSetorElaboracao_instrucao(e.target.value)}>
                                        <option value={setorElaboracao_instrucao}>{descrSetor_instrucao}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>REFER??NCIA BANQUINHO</Label>
                                    <Input type="number" placeholder="Referencia Banquinho" name="referencia_banquinho" value={referencia_banquinho} onChange={e => setReferencia(e.target.value)}></Input>
                                    <Label>OBSERVA??AO</Label>
                                    <TextArea name="observacao_instrucao" cols="50 rows" rows="5" id="" value={observacao_instrucao} onChange={e => setObservacao(e.target.value)}></TextArea>
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