import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';


export const FormEditarDespachos = (props) => {

    const [id_despacho] = useState(props.match.params.id);
    const [numero_sisrad_processo, setProcesso] = useState('');
    const [interessado_despacho, setInteressado] = useState('');
    const [assunto_despacho, setAssunto] = useState('');
    const [executor_despacho, setExecutor] = useState('');    
    const [observacao_despacho, setObservacao] = useState('');    
    const [referencia_banquinho,setBanquinho] = useState('');     
    const [setorElaboracao_despacho, setCodAreaDespacho] = useState('');
    const [descricaoArea_despacho, setAreaDespacho] = useState('');
    const [codtabua, setCodTabUa] = useState('');
    const [descricaoDestinacao, setDestinacaoCadastrada] = useState('');        
    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);



    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_DESPACHOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_despacho, numero_sisrad_processo, interessado_despacho, assunto_despacho, executor_despacho, observacao_despacho, referencia_banquinho, setorElaboracao_despacho, codtabua  })
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
                    mensagem: "Produto não editado com sucesso, tente mais tarde!"
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
        const getDespachos = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_DESPACHOS + id_despacho)
                .then((response) => response.json())
                .then((responseJson) => {                    
                    setProcesso(responseJson.despacho.numero_sisrad_processo)
                    setInteressado(responseJson.despacho.interessado_despacho)
                    setAssunto(responseJson.despacho.assunto_despacho)
                    setExecutor(responseJson.despacho.executor_despacho)
                    setObservacao(responseJson.despacho.observacao_despacho)
                    setBanquinho(responseJson.despacho.referencia_banquinho)
                    setCodAreaDespacho(responseJson.despacho.codArea_despacho)
                    setAreaDespacho(responseJson.despacho.area_despacho)
                    setCodTabUa(responseJson.despacho.codtabua)
                    setDestinacaoCadastrada(responseJson.despacho.desua)
                })
        }      
        getDespachos();
        setores();
        unidadeAdministrativa();
    }, [id_despacho]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editDespacho}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>NUMERO SISRAD/PROCESSOR</Label>
                                    <Input type="text" placeholder="Numero Sisrad / Processo" name="numero_sisrad_processo" value={numero_sisrad_processo} onChange={e => setProcesso(e.target.value)}></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>
                                    <Select name="codtabua" onChange={e => setDestinacaoCadastrada(e.target.value)}>
                                        <option value={codtabua}>{descricaoDestinacao}</option>
                                        {Object.values(nomenclaturaUA).map(unidade => (
                                            <option key={unidade.CodTabUa} value={unidade.CodTabUa}> {unidade.DESCRICAO_UA}</option>
                                        ))}
                                    </Select>                                   
                                    <Label>INTERESSADO</Label>
                                    <Input type ="text" placeholder="Interessado" name="interessado_despacho" value={interessado_despacho} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                    <Input type ="text" placeholder="Assunto Despacho" name="assunto_despacho" value ={assunto_despacho} onChange={e => setAssunto(e.target.value)}></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type ="text" placeholder="Executor Despacho" name ="executor_despacho" value={executor_despacho} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_despacho" onChange={e => setCodTabUa(e.target.value)}>
                                        <option value={setorElaboracao_despacho}>{descricaoArea_despacho}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor} value={setor.id_setor}> {setor.nome_setor}</option>
                                        ))}
                                    </Select>
                                    <Label>REFERÊNCIA BANQUINHO</Label>
                                    <Input type ="number" placeholder="Número de Rerência Banquinho Numeração" name ="referencia_banquinho" value={referencia_banquinho} onChange={e => setBanquinho(e.target.value)}></Input>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name = "observacao_despacho" cols = "50 rows" rows = "5" id="" value={observacao_despacho} onChange={e => setObservacao(e.target.value)}></TextArea>
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