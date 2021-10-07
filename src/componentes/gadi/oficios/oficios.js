import React, { useEffect, useState } from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from './styles';
import { Link } from 'react-router-dom';
import { Header } from '../../header/header';


export const Oficios = () => {

    const [data, setData] = useState([])

    const pesquisaOficio = (input) => {

        fetch(process.env.REACT_APP_LISTAR_OFICIOS, {
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

    const getOficios = async () => {
        fetch(process.env.REACT_APP_LISTAR_OFICIOS)
            .then(response => response.json())
            .then((responseJSON) => (
                setData(responseJSON)
            ))
    }
    useEffect(() => {
        getOficios();
    }, [])
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                        <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> OFÍCIOS </Titulo>
                    <BotaoAcao>
                        <Link to="/formCadOficios">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={e => pesquisaOficio(e.target.value)}></InputPesquisa>
                    </SectionPesquisar>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO OFICIO</th>
                            <th>INTERESSADO</th>
                            <th>ASSUNTO </th>
                            <th>SETOR</th>
                            <th>Nº BANQUINHO</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(oficios => (
                            <tr key={oficios.id_oficio}>
                                <LineTD>{oficios.numero_oficio}</LineTD>
                                <LineTD>{oficios.interessado_oficio}</LineTD>
                                <LineTD>{oficios.assunto_oficio}</LineTD>
                                <LineTD>{oficios.area_oficio}</LineTD>
                                <LineTD>{oficios.referencia_banquinho}</LineTD>
                                <LineTD>
                                    <Link to={"formViewOficios/" + oficios.id_oficio}>
                                        <ButtonPrimary>Visualizar</ButtonPrimary>
                                    </Link>{" "}
                                    <Link to={"formEditarOficios/" + oficios.id_oficio}>
                                        <ButtonPrimary>Editar</ButtonPrimary>
                                    </Link>{" "}
                                    <Link to={"formExcluirOficios/" + oficios.id_oficio}>
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