import React, { useEffect, useState } from 'react';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Tr, LineCadastro } from './styles';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';


export const FormEditComunicados = (props) => {

    const [id_comunicado] = useState(props.match.params.id);
    const [interessado_comunicado, setInteressado] = useState('');
    const [assunto_comunicado, setAssunto] = useState('');
    const [datEmissao_comunicado, setData] = useState('');
    const [executor_comunicado, setExecutor] = useState('');
    const [observacao_comunicado, setObservacao] = useState('');
    const [referencia_banquinho, setReferencia] = useState('');
    const [setorElaboracao_comunicado, setCodComunicado] = useState('');
    const [descricaoArea_comunicado, setDescricaoComunicado] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    const [nomenclaturaSetor, setSetores] = useState([]);



    const editComunicado = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_COMUNICADO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_comunicado,interessado_comunicado, assunto_comunicado, datEmissao_comunicado, executor_comunicado, observacao_comunicado, referencia_banquinho, setorElaboracao_comunicado })
            
        }).then((response) => response.json())            
            .then((responseJson) => {
                
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
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Comunicado n??o Editado. Contate o Administrador do Sistema!!'
                });
            });    }


    useEffect(() => {
        const getComunicados = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_COMUNICADO + id_comunicado)
                .then((response) => response.json())
                .then((responseJson) => {
                    setInteressado(responseJson.comunicado.interessado_comunicado);
                    setAssunto(responseJson.comunicado.assunto_comunicado);
                    setData(responseJson.comunicado.datEmissao_comunicado);
                    setExecutor(responseJson.comunicado.executor_comunicado);
                    setObservacao(responseJson.comunicado.observacao_comunicado);
                    setReferencia(responseJson.comunicado.referencia_banquinho);
                    setCodComunicado(responseJson.comunicado.cod_areaComunicado);
                    setDescricaoComunicado(responseJson.comunicado.area_comunicado)
                })
        }

        const setores = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
                .then((response) => response.json())
                .then((responseJson) => {
                    setSetores(responseJson.registro_setor);
                })
        }
        setores();
        getComunicados();
    }, [id_comunicado]);
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR COMUNICADOS</Titulo>
                    <BotaoAcao>
                        <Link to="/comunicados">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={editComunicado}>
                    <TableForm >
                        <tbody>
                            <Tr>
                                <LineCadastro>
                                    <Label>Interessado: </Label>
                                    <Input type="text" name="interessado_comunicado" placeholder="Assunto" value={interessado_comunicado} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO: </Label>
                                    <Input type="text" name="assunto_comunicado" placeholder="Assunto" value={assunto_comunicado} onChange={e => setAssunto(e.target.value)}></Input>
                                    <Label>DATA ELABORA????O: </Label>
                                    <Input type="date" name="data_elaboracao" value={datEmissao_comunicado} onChange={e => setData(e.target.value)}></Input>
                                    <Label>EXECUTOR: </Label>
                                    <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" value={executor_comunicado} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodComunicado(e.target.value)}>
                                    <option value={setorElaboracao_comunicado}>{descricaoArea_comunicado}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>REFER??NCIA BANQUINHO: </Label>
                                    <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" value={referencia_banquinho} onChange={e => setReferencia(e.target.value)}></Input>
                                    <Label>OBSERVA????O</Label>
                                    <TextArea name="observacao_comunicado" cols="50 rows" rows="5" value={observacao_comunicado} onChange={e => setObservacao(e.target.value)}></TextArea>
                                </LineCadastro>
                            </Tr>
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