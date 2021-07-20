import React, { useEffect, useState } from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const Instrucoes = () => {

    const [data, setData] = useState([])

    const getInstrucao = async() => {
        fetch("http://localhost/dashboard/sistemaNumeracao/instrucoes/listar_instrucoes.php")
        .then(response => response.json())
        .then((responseJSON) => (
            setData(responseJSON.registro_instrucao)
        ))
    }
    useEffect(() => {
        getInstrucao();
    },[])



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
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DA INSTRUÇÃO</th>
                            <th>INTERESSADO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(instrucoes => (
                            <tr key={instrucoes.id_instrucao}>
                        <LineTD>{instrucoes.numero_instrucao}</LineTD>
                        <LineTD>{instrucoes.interessado_instrucao}</LineTD>
                        <LineTD>{instrucoes.assunto_instrucao}</LineTD>                        
                        <LineTD>
                            <Link to = {"/formViewInstrucao/" + instrucoes.id_instrucao}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                            </Link> {" "}
                            <Link to ={"/formEditarInstrucao/" + instrucoes.id_instrucao}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                            </Link> {" "}
                            <Link to = {"/FormExcluirInstrucao"}> 
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