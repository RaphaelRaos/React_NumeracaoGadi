import React, {useEffect, useState} from "react";
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoMemoCircular, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/memocirculares/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirMemoCircularGabCrh =(props) => {

    const [id_memorandoCircular] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirMemorando = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_MEMOCIRCULARES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_memorandoCircular })
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
                    mensagem: "Memorando Circular não Excluído, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getMemorandoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_MEMOCIRCULARES + id_memorandoCircular)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.memorandoCircular)
                })
            }

        getMemorandoGabCrh();
    }, [id_memorandoCircular]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR MEMORANDO </Titulo>
                    <BotaoAcao>
                        <Link to="/MemorandoCircularGabCrh">
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
                                    <ConteudoMemoCircular>NÚMERO MEMORANDO: {data.numero_memorandoCircular}</ConteudoMemoCircular>
                                    <ConteudoMemoCircular>ASSUNTO MEMORANDO: {data.assunto_memorandoCircular}</ConteudoMemoCircular>
                                    <ConteudoMemoCircular>DATA EMISSÃO MEMORANDO: {data.datElaboracao_memorandoCircular}</ConteudoMemoCircular>
                                    <ConteudoMemoCircular>EXECUTOR: {data.executor_memorandoCircular}</ConteudoMemoCircular>
                                    <ConteudoMemoCircular>SETOR CADASTRANTE: {data.setormemorandoCircular}</ConteudoMemoCircular>
                                    <ConteudoMemoCircular>OBSERVAÇÃO: {data.observacao_memorandoCircular}</ConteudoMemoCircular>
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