
import React, {useState, useEffect} from "react";
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoInstrucao, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/instrucoes/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirInstrucaoGabCrh = (props) =>{

    const [id_instrucao] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirInstrucao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_INSTRUCOES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_instrucao })
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
                    mensagem: "INSTRUÇÃO não Excluída, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getInstrucaoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_INSTRUCOES + id_instrucao)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.instrucao)
                })
            }

        getInstrucaoGabCrh();
    }, [id_instrucao]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR INSTRUCAO </Titulo>
                    <BotaoAcao>
                        <Link to="/InstrucoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirInstrucao}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ConteudoInstrucao>NÚMERO INSTRUCAO: {data.numero_instrucao}</ConteudoInstrucao>
                                    <ConteudoInstrucao>ASSUNTO INSTRUCAO: {data.assunto_instrucao}</ConteudoInstrucao>
                                    <ConteudoInstrucao>DATA EMISSÃO INSTRUCAO: {data.datElaboracao_instrucao}</ConteudoInstrucao>
                                    <ConteudoInstrucao>EXECUTOR: {data.executor_instrucao}</ConteudoInstrucao>
                                    <ConteudoInstrucao>SETOR CADASTRANTE: {data.setor_instrucao}</ConteudoInstrucao>
                                    <ConteudoInstrucao>OBSERVAÇÃO: {data.observacao_instrucao}</ConteudoInstrucao>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Excluir</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    );
}