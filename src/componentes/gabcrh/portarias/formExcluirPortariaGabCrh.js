import React, {useState, useEffect} from "react";
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoPortaria, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/portarias/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirPortariaGabCrh = (props) => {

    const [id_portaria] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_PORTARIAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_portaria })
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
        const getPortariaGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_PORTARIAS + id_portaria)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.portaria)
                })
            }

        getPortariaGabCrh();
    }, [id_portaria]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR OFICIOS </Titulo>
                    <BotaoAcao>
                        <Link to="/PortariaGabCrh">
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
                                    <ConteudoPortaria>NÚMERO OFICIOS: {data.numero_portaria}</ConteudoPortaria>
                                    <ConteudoPortaria>ASSUNTO OFICIOS: {data.assuntoportaria}</ConteudoPortaria>
                                    <ConteudoPortaria>DATA EMISSÃO OFICIOS: {data.datElaboracao_portaria}</ConteudoPortaria>
                                    <ConteudoPortaria>EXECUTOR: {data.executor_portaria}</ConteudoPortaria>
                                    <ConteudoPortaria>SETOR CADASTRANTE: {data.setorportaria}</ConteudoPortaria>
                                    <ConteudoPortaria>OBSERVAÇÃO: {data.observacao_portaria}</ConteudoPortaria>
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