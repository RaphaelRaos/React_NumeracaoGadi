import React, {useState, useEffect} from 'react'
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoOficio, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/oficios/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirOficiosGabCrh = (props) => {

    const [id_oficio] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_OFICIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_oficio })
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
        const getOficioGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_OFICIOS + id_oficio)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.oficio)
                })
            }

        getOficioGabCrh();
    }, [id_oficio]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR OFICIOS </Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosGabCrh">
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
                                    <ConteudoOficio>NÚMERO OFICIOS: {data.numero_oficio}</ConteudoOficio>
                                    <ConteudoOficio>ASSUNTO OFICIOS: {data.assuntooficio}</ConteudoOficio>
                                    <ConteudoOficio>DATA EMISSÃO OFICIOS: {data.datElaboracao_oficio}</ConteudoOficio>
                                    <ConteudoOficio>EXECUTOR: {data.executor_oficio}</ConteudoOficio>
                                    <ConteudoOficio>SETOR CADASTRANTE: {data.setorOficio}</ConteudoOficio>
                                    <ConteudoOficio>OBSERVAÇÃO: {data.observacao_oficio}</ConteudoOficio>
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
