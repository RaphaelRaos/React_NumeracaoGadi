import React, { useEffect, useState } from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, SectionPesquisar, InputPesquisa } from './styles';
import { Link } from 'react-router-dom';
import { Header } from '../../header/header';


export const Instrucoes = () => {

    const [data, setData] = useState([])

    const pesquisaInstrucao = (input) => {

        fetch(process.env.REACT_APP_LISTAR_INSTRUCOES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        }).then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson)
            })
    }

    const getInstrucao = async () => {
        fetch(process.env.REACT_APP_LISTAR_INSTRUCOES)
            .then(response => response.json())
            .then((responseJSON) => (
                setData(responseJSON)
            ))
    }

    useEffect(() => {
        getInstrucao();
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                        <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> INSTRUÇÕES </Titulo>
                    <BotaoAcao>
                        <Link to="/formInstrucao">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={e => pesquisaInstrucao(e.target.value)}></InputPesquisa>
                    </SectionPesquisar>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DA INSTRUÇÃO</th>
                            <th>INTERESSADO</th>
                            <th>ASSUNTO</th>
                            <th>BANQUINHO</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(instrucoes => (
                            <tr key={instrucoes.id_instrucao}>
                                <LineTD>{instrucoes.numero_instrucao}</LineTD>
                                <LineTD>{instrucoes.interessado_instrucao}</LineTD>
                                <LineTD>{instrucoes.assunto_instrucao}</LineTD>
                                <LineTD>{instrucoes.referencia_banquinho}</LineTD>
                                <LineTD>
                                    <Link to={"/formViewInstrucao/" + instrucoes.id_instrucao}>
                                        <ButtonPrimary>Visualizar</ButtonPrimary>
                                    </Link> {" "}
                                    <Link to={"/formEditarInstrucao/" + instrucoes.id_instrucao}>
                                        <ButtonPrimary>Editar</ButtonPrimary>
                                    </Link> {" "}
                                    <Link to={"/formExcluirInstrucao/" + instrucoes.id_instrucao}>
                                        <ButtonPrimary>Excluir</ButtonPrimary>
                                    </Link>

                                </LineTD>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    );
}