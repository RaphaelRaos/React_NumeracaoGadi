import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Td, Tr } from './styles';


export const FormEditarRelRemessa = (props) => {

    const [id_remessa] = useState(props.match.params.id);
    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);
    const [numProcesso_remessa, setProcesso] = useState('');
    const [codtabua, setCodTabUa] = useState('');
    const [des_ua, setUA] = useState('');
    const [interessado_remessa, setInteressado] = useState('');
    const [assunto_remessa, setAssunto] = useState('');
    const [executor_remessa, setExecutor] = useState('');
    const [setorElaboracao_remessa, setCodSetor_remessa] = useState('');
    const [referencia_banquinho, setBanquinho] = useState('');
    const [area_remessa, setArea] = useState('');
    const [observacao_remessa, setObservacao] = useState('');


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editRemessa = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_REMESSA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_remessa, numProcesso_remessa, codtabua, interessado_remessa, executor_remessa, assunto_remessa, setorElaboracao_remessa, observacao_remessa, referencia_banquinho })
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
                    mensagem: "Relação de Remessa não editada, tente mais tarde!"
                });
            });
    }

    const unidadeAdministrativa = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_UNIDADES)
            .then((response) => response.json())
            .then((responseJson) => {
                setDestinacao(responseJson.registro_unidades);
            })
    }

    const setores = async () => {
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
            .then((response) => response.json())
            .then((responseJson) => {
                setSetorAlteracao(responseJson.registro_setor);
            })

    }


    useEffect(() => {

        const getRemessa = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_REMESSA + id_remessa)
                .then((response) => response.json())
                .then((responseJson) => {
                    setProcesso(responseJson.mensagem.numProcesso_remessa)
                    setCodTabUa(responseJson.mensagem.codtabua)
                    setUA(responseJson.mensagem.desua)
                    setInteressado(responseJson.mensagem.interessado_remessa)
                    setAssunto(responseJson.mensagem.assunto_remessa)
                    setExecutor(responseJson.mensagem.executor_remessa)
                    setCodSetor_remessa(responseJson.mensagem.codSetor_remessa)
                    setArea(responseJson.mensagem.area_remessa)
                    setObservacao(responseJson.mensagem.observacao_remessa)
                    setBanquinho (responseJson.mensagem.referencia_banquinho)
                })
        }
        getRemessa();
        setores();

        unidadeAdministrativa();

    }, [id_remessa]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR RELAÇÃO DE REMESSAS</Titulo>
                    <BotaoAcao>
                        <Link to="/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={editRemessa} >
                    <TableForm>
                        <tbody>
                            <Tr>
                                <Td>
                                    <Label>NUMERO SISRAD / PROCESSO </Label>
                                    <Input type="" placeholder="Numero Processo / Sisrad" name="numProcesso_remessa" value={numProcesso_remessa} onChange={e => setProcesso(e.target.value)}></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="codtabua" onChange={e => setCodTabUa(e.target.value)}>
                                        <option value={codtabua}>{des_ua}</option>
                                        {Object.values(nomenclaturaUA).map(unidadeAdministrativa => (
                                            <option key={unidadeAdministrativa.CodTabUa} value={unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.DESCRICAO_UA} </option>
                                        ))}
                                    </Select>
                                    <Label>INTERESSADO </Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_remessa" value={interessado_remessa} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Remessa" name="assunto_remessa" value={assunto_remessa} onChange={e => setAssunto(e.target.value)}></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_remessa" value={executor_remessa} onChange={e => setExecutor(e.target.value)}></Input>
                                </Td>
                                <Td>                                   
                                    <Label>SETOR</Label>
                                    <Select name="area_remessa" onChange={e => setCodSetor_remessa(e.target.value)}>
                                        <option value={setorElaboracao_remessa}>{area_remessa}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}>{setor.nome_setor}</option>
                                        ))}
                                    </Select> <br />
                                    <Label>Nº BANQUINHO </Label>
                                    <Input type="number" placeholder="Assunto Remessa" name="referencia_banquinho" value={referencia_banquinho} onChange={e => setBanquinho(e.target.value)}></Input>
                                    <Label>OBSERVAÇÃO </Label>
                                    <TextArea name="observacao_remessa" cols="50 rows" rows="5" id="" value={observacao_remessa} onChange={e => setObservacao(e.target.value)}></TextArea>
                                </Td>
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