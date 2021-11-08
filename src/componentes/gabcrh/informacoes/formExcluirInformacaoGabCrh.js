import React,{useState, useEffect} from "react"
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContInformacao, DivButton, ButtonCadastrar, AlertDanger, AlertSuccess } from '../../styles/informacoes/styles';
import { Link } from "react-router-dom";
import { Header } from '../../header/header';

export const FormExcluirInformacaoGabCrh = (props) =>{

    const [id_informacao] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirInformacao = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_GABCRH_EXCLUIR_INFORMACAO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_informacao })
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
        const getInformacaoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_INFORMACAO + id_informacao)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.informacao)
                })
            }

        getInformacaoGabCrh();
    }, [id_informacao]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR INFORMAÇÃO </Titulo>
                    <BotaoAcao>
                        <Link to="/InformacoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirInformacao}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ContInformacao>NÚMERO INFORMACAO: {data.numero_informacao}</ContInformacao>
                                    <ContInformacao>ASSUNTO INFORMACAO: {data.assuntoInformacao}</ContInformacao>
                                    <ContInformacao>DATA EMISSÃO INFORMACAO: {data.datElaboracao_informacao}</ContInformacao>
                                    <ContInformacao>EXECUTOR: {data.executor_informacao}</ContInformacao>
                                    <ContInformacao>SETOR CADASTRANTE: {data.setorInformacao}</ContInformacao>
                                    <ContInformacao>OBSERVAÇÃO: {data.observacao_informacao}</ContInformacao>
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