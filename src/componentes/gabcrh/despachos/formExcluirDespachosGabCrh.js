import React, { useEffect, useState } from "react";
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContDespachos, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/despachos/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';


export const FormExcluirDespachosGabCrh = (props) => {

    const [id_despacho] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_DESPACHOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_despacho })
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
                    mensagem: "Comunicado não Excluído, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getDespachoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_DESPACHOS + id_despacho)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.despacho)
                })
            }

        getDespachoGabCrh();
    }, [id_despacho]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR DESPACHO </Titulo>
                    <BotaoAcao>
                        <Link to="/DespachosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirDespacho}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ContDespachos>NÚMERO DESPACHO: {data.numero_despacho}</ContDespachos>
                                    <ContDespachos>ASSUNTO DESPACHO: {data.assuntodespacho}</ContDespachos>
                                    <ContDespachos>DATA EMISSÃO DESPACHO: {data.datElaboracao_despacho}</ContDespachos>
                                    <ContDespachos>EXECUTOR: {data.executor_despacho}</ContDespachos>
                                    <ContDespachos>SETOR CADASTRANTE: {data.setordespacho}</ContDespachos>
                                    <ContDespachos>OBSERVAÇÃO: {data.observacao_despacho}</ContDespachos>
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