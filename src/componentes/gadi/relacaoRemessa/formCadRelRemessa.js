import React, { useEffect, useState } from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Tr, Td } from './styles';
import { Link } from 'react-router-dom';

export const FormCadRelRemessa = () => {

    const [remessa, setRemessa] = useState({

        numProcesso_remessa: "",
        codtabua: "",       
        interessado_remessa: "",
        assunto_remessa: "",
        datEmissao_remessa: "",
        executor_remessa: "",
        setorElaboracao_remessa: "",
        referencia_banquinho:"",
        observacao_remessa: ""
    })

    const [nomenclaturaUnidades, setDestinacao] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setRemessa({ ...remessa, [e.target.name]: e.target.value });

    const cadRemessa = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_REMESSA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remessa })
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
                        mensagem: responseJson.mensagem
                    });
                    setRemessa({
                        numProcesso_remessa: "",
                        codtabua: "",
                        des_uo: "",
                        interessado_remessa: "",
                        assunto_remessa: "",
                        datEmissao_remessa: "",
                        executor_remessa: "",
                        setorElaboracao_remessa: "",
                        observacao_remessa: "",
                        referencia_banquinho:"",
                    })
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Remessa não cadastrada. Contate o Administrador do Sistema!!'
                });
            });
    }

    const visualizarUnidades = async () => {
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
                setSetor(responseJson.registro_setor);
            })
    }

    useEffect(() => {
        visualizarUnidades();        
        setores();
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE RELAÇÃO DE REMESSAS</Titulo>
                    <BotaoAcao>
                        <Link to="/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadRemessa}>
                    <TableForm>
                        <tbody>
                            <Tr>
                                <Td>
                                    <Label>NUMERO SISRAD / PROCESSO </Label>
                                    <Input type="" placeholder="Numero Processo / Sisrad" name="numProcesso_remessa" onChange={valorInput} value={remessa.numProcesso_remessa} required></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="codtabua" onChange={valorInput} value={remessa.codtabua} required>
                                        <option value="">Selecione</option>
                                        {Object.values(nomenclaturaUnidades).map(unidadeAdministrativa => (
                                            <option key={unidadeAdministrativa.CodTabUa} value={unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.DESCRICAO_UA}</option>
                                        ))}
                                    </Select>                                    
                                    <Label>INTERESSADO </Label>
                                    <Input type="text" placeholder="Interessado" name="interessado_remessa" onChange={valorInput} value={remessa.interessado_remessa} required></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Remessa" name="assunto_remessa" onChange={valorInput} value={remessa.assunto_remessa} required></Input>
                                    <Label>DATA DE EMISSÃO</Label>
                                    <Input type="date" name="datEmissao_remessa" onChange={valorInput} value={remessa.datEmissao_remessa} required></Input>
                                </Td>
                                <Td>                                    
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_remessa" onChange={valorInput} value={remessa.executor_remessa} required></Input>
                                    <Label>SETOR</Label>
                                    <Select onChange={valorInput} name="setorElaboracao_remessa" value={remessa.setorElaboracao_despacho} required>
                                        <option>Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select> <br />
                                    <Label>Nº BANQUINHO </Label>
                                    <Input type="number" placeholder="Nº Referência Banquinho" name="referencia_banquinho" onChange={valorInput} value={remessa.referencia_banquinho}></Input>
                                    <Label>OBSERVAÇÃO</Label>
                                    <TextArea name="observacao_remessa" cols="50 rows" rows="5" id="" onChange={valorInput} value={remessa.observacao_remessa}></TextArea>
                                </Td>
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
    )
}