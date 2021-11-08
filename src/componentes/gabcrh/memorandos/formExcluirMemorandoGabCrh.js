import React, {useEffect, useState} from "react";
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoMemorando, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/memorandos/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirMemorandoGabCrh = (props) => {

    const [id_memorando] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirMemorando = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_MEMORANDO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_memorando })
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
                    mensagem: "Memorando não Excluído, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getMemorandoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_MEMORANDO + id_memorando)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.memorando)
                })
            }

        getMemorandoGabCrh();
    }, [id_memorando]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR MEMORANDO </Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirMemorando}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ConteudoMemorando>NÚMERO MEMORANDO: {data.numero_memorando}</ConteudoMemorando>
                                    <ConteudoMemorando>ASSUNTO MEMORANDO: {data.assuntomemorando}</ConteudoMemorando>
                                    <ConteudoMemorando>DATA EMISSÃO MEMORANDO: {data.datElaboracao_memorando}</ConteudoMemorando>
                                    <ConteudoMemorando>EXECUTOR: {data.executor_memorando}</ConteudoMemorando>
                                    <ConteudoMemorando>SETOR CADASTRANTE: {data.setormemorando}</ConteudoMemorando>
                                    <ConteudoMemorando>OBSERVAÇÃO: {data.observacao_memorando}</ConteudoMemorando>
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