import React, {useState, useEffect} from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoOficioCircular, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/oficioCircular/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirOficioCircularGabCrh = (props) => {


    const [id_oficioCircular] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_OFICIOCIRCULAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_oficioCircular })
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
                    mensagem: "Oficio Circular não Excluído, tente mais tarde!"
                });
            });
    }

    useEffect(() => {
        const getOficioGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_OFICIOCIRCULAR + id_oficioCircular)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.oficioCircular)
                })
            }

        getOficioGabCrh();
    }, [id_oficioCircular]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR OFICIOS </Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosCircularesGabCrh">
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
                                    <ConteudoOficioCircular>NÚMERO OFICIOS: {data.numero_oficioCircular}</ConteudoOficioCircular>
                                    <ConteudoOficioCircular>ASSUNTO OFICIOS: {data.assuntooficioCircular}</ConteudoOficioCircular>
                                    <ConteudoOficioCircular>DATA EMISSÃO OFICIOS: {data.datElaboracao_oficioCircular}</ConteudoOficioCircular>
                                    <ConteudoOficioCircular>EXECUTOR: {data.executor_oficioCircular}</ConteudoOficioCircular>
                                    <ConteudoOficioCircular>SETOR CADASTRANTE: {data.setoroficioCircular}</ConteudoOficioCircular>
                                    <ConteudoOficioCircular>OBSERVAÇÃO: {data.observacao_oficioCircular}</ConteudoOficioCircular>
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