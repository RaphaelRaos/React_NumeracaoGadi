import React, {useEffect, useState} from 'react'
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/portarias/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const PortariaGabCrh = () => {

    const [data, setData] = useState([])

    const pesquisaPortaria = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_PORTARIAS,{
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
        const getPortariaGabCrh = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_PORTARIAS)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getPortariaGabCrh();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> PORTARIAS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadPortariaGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaPortaria(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO PORTARIA </th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(portaria =>(
                         <tr key={portaria.id_portaria}>
                         <LineTD>{portaria.numero_portaria}</LineTD>
                         <LineTD>{portaria.setorportaria}</LineTD>
                         <LineTD>{portaria.assuntoportaria}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewPortariaGabCrh/" + portaria.id_portaria}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditPortariaGabCrh/" + portaria.id_portaria}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirPortariaGabCrh/"+ portaria.id_portaria}>                        
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