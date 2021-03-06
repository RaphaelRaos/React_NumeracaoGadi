import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Header} from '../../header/header';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, SectionPesquisar, InputPesquisa} from './styles';


export const ComunicadosGabCrh = () =>{

    const [data, setData ] = useState([]);

    const pesquisaComunicado = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_COMUNICADO,{
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
            fetch(process.env.REACT_APP_GABCRH_LISTAR_COMUNICADO)
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
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>COMUNICADOS</Titulo>
                    <BotaoAcao>                            
                        <Link to="/formCadComunicadosGabCrh">
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
                            <th>??REA</th>
                            <th>A????ES</th>                            
                        </tr>
                    </thead>
                    <tbody> 
                        {Object.values(data).map(comunicado =>(
                            <tr key={comunicado.id_comunicado}>
                                <LineTD>{comunicado.numero_comunicado}</LineTD>
                                <LineTD>{comunicado.assuntoComunicado}</LineTD>                                
                                <LineTD>{comunicado.setorComunicado}</LineTD>                                                     
                                <LineTD>
                                        <Link to = {"/formViewComunicadosGabCrh/" + comunicado.id_comunicado}>
                                            <ButtonPrimary>Visualizar</ButtonPrimary>
                                        </Link> {" "}
                                        <Link to = {"/formEditComunicadosGabCrh/" + comunicado.id_comunicado}>
                                            <ButtonPrimary>Editar</ButtonPrimary>
                                        </Link> {" "}
                                        <Link to = {"/formExcluirComunicadosGabCrh/" + comunicado.id_comunicado}>
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