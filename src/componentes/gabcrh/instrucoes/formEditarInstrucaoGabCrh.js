import React, {useEffect, useState} from 'react'
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from '../../styles/instrucoes/styles';
import { Link } from 'react-router-dom';


export const FormEditInstrucaoGabCrh = (props) => {

    const [id_instrucao] = useState(props.match.params.id);
    const [assunto_instrucao, setAssunto] = useState('');    
    const [executor_instrucao, setExecutor] = useState('');
    const [setorElaboracao_instrucao, setCodAreaDespacho] = useState('');
    const [descricaoArea_instrucao, setAreaDespacho] = useState('');
    const [observacao_instrucao, setObservacao] = useState('');

    const [nomenclaturaDepartamento, setSetor] = useState([]);
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editInstrucao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EDITAR_INSTRUCOES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_instrucao, assunto_instrucao, executor_instrucao, setorElaboracao_instrucao, observacao_instrucao})
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
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_INSTRUCOES + id_instrucao)
                .then((response) => response.json())
                .then((responseJson) => {
                    setAssunto(responseJson.instrucao.assunto_instrucao)                    
                    setExecutor(responseJson.instrucao.executor_instrucao)
                    setCodAreaDespacho(responseJson.instrucao.setorElaboracao_instrucao)
                    setAreaDespacho(responseJson.instrucao.setor_instrucao)
                    setObservacao(responseJson.instrucao.observacao_instrucao)
                })
        }
        getInformacaoGabCrh();
        setores();
       
    }, [id_instrucao]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR INSTRUÇÕES</Titulo>
                    <BotaoAcao>
                        <Link to="/InstrucoesGabCrh">
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
                                    <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Informacao" name="assunto_instrucao" value={assunto_instrucao} onChange={e => setAssunto(e.target.value)}></Input>
                                    <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor Informacao" name="executor_instrucao" value={executor_instrucao} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                    <Select name="setorElaboracao_comunicado" onChange={e => setCodAreaDespacho(e.target.value)}>
                                        <option value={setorElaboracao_instrucao}>{descricaoArea_instrucao}</option>
                                        {Object.values(nomenclaturaDepartamento).map(setor => (
                                            <option key={setor.id_deparatamento} value={setor.id_deparatamento}> {setor.nome_departamento}</option>
                                        ))}
                                    </Select>
                                    <Label>OBSERVAÇAO</Label>
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