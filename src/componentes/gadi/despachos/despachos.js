import React, { useEffect, useState } from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';


export const Despachos = () => {

    const [data, setData] = useState([])

    const pesquisaDespachos = (input) => {
        
        fetch(process.env.REACT_APP_LISTAR_DESPACHOS,{
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
            fetch(process.env.REACT_APP_LISTAR_DESPACHOS)
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
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> DESPACHOS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formDespachos">
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
                            <th>A????ES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(despachos =>(
                         <tr key={despachos.id_despacho}>
                         <LineTD>{despachos.numero_despacho}</LineTD>
                         <LineTD>{despachos.numero_sisrad_processo}</LineTD>
                         <LineTD>{despachos.assunto_despacho}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewDespachos/" + despachos.id_despacho}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditarDespachos/" + despachos.id_despacho}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/FormSaidaDespachos/"+ despachos.id_despacho}>                                                  
                             <ButtonPrimary>Sa??da</ButtonPrimary>
                             </Link>    {" "}                            
                             <Link to = {"/formExcluirDespachos/"+ despachos.id_despacho}>                        
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