import React,{useEffect, useState} from "react";
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/despachos/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const DespachosGabCrh = () =>{
    const [data, setData] = useState([])

    const pesquisaDespachos = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_DESPACHOS,{
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
        const getDespachos = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_DESPACHOS)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getDespachos();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> DESPACHOS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadDespachosGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaDespachos(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DESPACHO</th>
                            <th>PROCESSO / SISRAD</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(despachos =>(
                         <tr key={despachos.id_despacho}>
                         <LineTD>{despachos.numero_despacho}</LineTD>
                         <LineTD>{despachos.setordespacho}</LineTD>
                         <LineTD>{despachos.assuntodespacho}</LineTD>
                         <LineTD>
                             <Link to = {"/formEditDespachosGabCrh/" + despachos.id_despacho}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditDespachosGabCrh/" + despachos.id_despacho}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirDespachosGabCrh/"+ despachos.id_despacho}>                        
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