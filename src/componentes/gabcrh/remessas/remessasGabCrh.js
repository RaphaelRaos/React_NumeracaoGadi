import React, {useEffect, useState} from 'react'
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/remessas/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const RemessaGabCrh = () => {

    const [data, setData] = useState([])

    const pesquisaRemessa = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_REMESSAS,{
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
        const getRemessaGabCrh = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_REMESSAS)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getRemessaGabCrh();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> REMESSAS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadRemessaGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaRemessa(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO REMESSA </th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(remessa =>(
                         <tr key={remessa.id_remessa}>
                         <LineTD>{remessa.numero_remessa}</LineTD>
                         <LineTD>{remessa.setorremessa}</LineTD>
                         <LineTD>{remessa.assuntoremessa}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewRemessaGabCrh/" + remessa.id_remessa}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditRemessaGabCrh/" + remessa.id_remessa}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirRemessaGabCrh/"+ remessa.id_remessa}>                        
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