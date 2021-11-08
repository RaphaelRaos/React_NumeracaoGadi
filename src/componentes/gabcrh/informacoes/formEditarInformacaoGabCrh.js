import React, {useEffect, useState} from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/informacoes/styles';
import { Link } from 'react-router-dom';


export const FormEditInformacaoGabCrh = (props) =>{
 
    const [id_informacao] = useState(props.match.params.id);
    const [assunto_informacao, setCodAssunto] = useState('');
    const [assuntoDescricao_informacao, setAssuntoDescricao] = useState('');
    const [executor_informacao, setExecutor] = useState('');
    const [setorElaboracao_informacao, setCodAreaDespacho] = useState('');
    const [descricaoArea_informacao, setAreaDespacho] = useState('');
    const [observacao_informacao, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    const [assuntosGabCrh, setGabCrhAssunto] = useState([]);


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editInformacao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_INFORMACAO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_informacao, assunto_informacao, executor_informacao, setorElaboracao_informacao, observacao_informacao})
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
                    mensagem: "INFORMAÇÃO não editada, tente mais tarde!"
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


    useEffect(() => {
        const getInformacaoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_INFORMACAO + id_informacao)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCodAssunto(responseJson.informacao.assunto_informacao)
                    setAssuntoDescricao(responseJson.informacao.assuntoInformacao)
                    setExecutor(responseJson.informacao.executor_informacao)
                    setCodAreaDespacho(responseJson.informacao.setorElaboracao_informacao)
                    setAreaDespacho(responseJson.informacao.setorInformacao)
                    setObservacao(responseJson.informacao.observacao_informacao)
                })
        }
        const assuntosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_ASSUNTO)
                .then((response) => response.json())
                .then((responseJson) => {
                    setGabCrhAssunto(responseJson.registro_assunto)
                })
        }

        getInformacaoGabCrh();
        setores();
        assuntosGabCrh();

    }, [id_informacao]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR INFORMAÇÃO </Titulo>
                    <BotaoAcao>
                        <Link to="/InformacoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={editInformacao}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>ASSUNTO</Label>
                                    <Select name="assunto_informacao" onChange={e => setCodAssunto(e.target.value)}>
                                        <option value={assunto_informacao}>{assuntoDescricao_informacao}</option>
                                        {Object.values(assuntosGabCrh).map(assuntos => (
                                            <option key={assuntos.id_assunto} value={assuntos.id_assunto}> {assuntos.assunto}</option>
                                        ))}
                                    </Select>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Informacao" name="executor_informacao" value={executor_informacao} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_informacao}>{descricaoArea_informacao}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
                                    <TextArea name="observacao_informacao" cols="50 rows" rows="5" id="" value={observacao_informacao} onChange={e => setObservacao(e.target.value)}></TextArea>
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