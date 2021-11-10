import React, {useEffect, useState} from 'react';
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, AlertDanger, AlertSuccess, ConteudoRemessa } from '../../styles/remessas/styles';
import { Link } from 'react-router-dom';


export const FormExcluirRemessaGabCrh = (props) => {

    const [id_remessa] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_REMESSA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_remessa })
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
                    mensagem: "Remessa não Excluída, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getPortariaGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_REMESSA + id_remessa)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.remessa)
                })
            }

        getPortariaGabCrh();
    }, [id_remessa]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR OFICIOS </Titulo>
                    <BotaoAcao>
                        <Link to="/RemessaGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirOficio}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ConteudoRemessa>NÚMERO OFICIOS: {data.numero_remessa}</ConteudoRemessa>
                                    <ConteudoRemessa>ASSUNTO OFICIOS: {data.assuntoremessa}</ConteudoRemessa>
                                    <ConteudoRemessa>DATA EMISSÃO OFICIOS: {data.datElaboracao_remessa}</ConteudoRemessa>
                                    <ConteudoRemessa>EXECUTOR: {data.executor_remessa}</ConteudoRemessa>
                                    <ConteudoRemessa>SETOR CADASTRANTE: {data.setorremessa}</ConteudoRemessa>
                                    <ConteudoRemessa>OBSERVAÇÃO: {data.observacao_remessa}</ConteudoRemessa>
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