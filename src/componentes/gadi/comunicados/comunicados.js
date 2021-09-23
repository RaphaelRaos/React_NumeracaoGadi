import React, { useState, useEffect } from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, SectionPesquisar, InputPesquisa} from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';


export const Comunicados = () => {

    const [data, setData ] = useState([]);

    const pesquisaComunicado = (input) => {
        
        fetch(process.env.REACT_APP_LISTAR_COMUNICADO,{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({input})
         }).then((response) => response.json())
         .then((responseJson) => {            
             setData(responseJson)                
         })         
     }   
    
    useEffect(() => {

        const getComunicados = async() => {
            fetch(process.env.REACT_APP_LISTAR_COMUNICADO)
            .then((response) =>response.json())
            .then((responseJSON) => (
                setData(responseJSON)
            ));
        }
        getComunicados();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>COMUNICADOS</Titulo>
                    <BotaoAcao>                            
                        <Link to="/formComunicados">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaComunicado(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div> 
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO COMUNICADO</th>
                            <th>ASSUNTO</th>
                            <th>DATA ELABORAÇÃO</th>
                            <th>EXECUTOR</th>
                            <th>ÁREA</th>
                            <th>OBSERVAÇÃO</th>
                            <th>AÇÕES</th>                            
                        </tr>
                    </thead>
                    <tbody> 
                        {Object.values(data).map(comunicados =>(
                            <tr key={comunicados.id_comunicado}>
                                <LineTD>{comunicados.numero_comunicado}</LineTD>
                                <LineTD>{comunicados.assunto_comunicado}</LineTD>
                                <LineTD>{comunicados.datEmissao_comunicado}</LineTD>
                                <LineTD>{comunicados.executor_comunicado}</LineTD>
                                <LineTD>{comunicados.area_comunicado}</LineTD>
                                <LineTD>{comunicados.observacao_comunicado}</LineTD>                           
                                <LineTD>
                                        <Link to = {"/formViewComunicados/" + comunicados.id_comunicado}>
                                            <ButtonPrimary>Visualizar</ButtonPrimary>
                                        </Link> {" "}
                                        <Link to = {"/FormEditarComunicados/" + comunicados.id_comunicado}>
                                            <ButtonPrimary>Editar</ButtonPrimary>
                                        </Link> {" "}
                                        <Link to = {"/FormExcluirComunicados/" + comunicados.id_comunicado}>
                                            <ButtonPrimary>Apagar</ButtonPrimary>
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