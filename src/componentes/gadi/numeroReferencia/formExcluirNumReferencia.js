import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, AlertDanger, AlertSuccess, ConteudoReferencia } from './styles';
import { Link } from 'react-router-dom';

export const FormExcluirNumRef = (props) => {

    const [id_referencia] = useState(props.match.params.id);
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const excluirNumReferencia = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EXCLUIR_REFERENCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_referencia })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.erro) {
                    setStatus({
                        type: 'erro',
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
                    type: 'erro',
                    mensagem: "Número de Referencia não Excluído, tente mais tarde!(Erro 1-F)!!"
                });
            });
    }


    useEffect(() => {
        const getNumReferencia = async () => {
            await fetch(process.env.REACT_APP_VISUALIZAR_REFERENCIA + id_referencia)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.numeroReferencia)
                })
        }
        getNumReferencia();
    }, [id_referencia]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EXCLUIR NÚMERO DE REFERÊNCIA - INFORMAÇÃO</Titulo>
                    <BotaoAcao>
                        <Link to="/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={excluirNumReferencia}>
                    <TableForm>
                        <div>
                            <ConteudoReferencia>NÚMERO DE REFERÊNCIA: {data.numero_referencia}</ConteudoReferencia>
                            <ConteudoReferencia>NÚMERO DO PROCESSO: {data.num_processo_referencia}</ConteudoReferencia>
                            <ConteudoReferencia>UNIDADE ADMINISTRATIVA: {data.desua}</ConteudoReferencia>
                            <ConteudoReferencia>UNIDADE ORÇAMENTARIA: {data.desuo}</ConteudoReferencia>
                            <ConteudoReferencia>INTERESSADO: {data.interessado_referencia}</ConteudoReferencia>
                            <ConteudoReferencia>ASSUNTO: {data.assuntoReferencia}</ConteudoReferencia>
                            <ConteudoReferencia>DATA ENTRADA: {data.datEmissao_referencia}</ConteudoReferencia>
                        </div>
                        <div>
                            <ConteudoReferencia>EXECUTOR: {data.executor_referencia}</ConteudoReferencia>
                            <ConteudoReferencia>UNIDADE DE POSSE: {data.area_numReferencia}</ConteudoReferencia>
                            <ConteudoReferencia>ANDAMENTO DO PROCESSO: {data.statusProcesso} </ConteudoReferencia>
                            <ConteudoReferencia>VIGÊNCIA: {data.vigencia_referencia}</ConteudoReferencia>
                            <ConteudoReferencia>Nº BANQUINHO: {data.referencia_banquinho}</ConteudoReferencia>
                            <ConteudoReferencia>OBSERVAÇÃO: {data.observacao_referencia}</ConteudoReferencia>
                        </div>
                        <hr></hr>
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Excluir</ButtonCadastrar>
                        <br></br>
                        <br></br>
                    </DivButton>
                </form>
            </Container>

        </div>
    );
}