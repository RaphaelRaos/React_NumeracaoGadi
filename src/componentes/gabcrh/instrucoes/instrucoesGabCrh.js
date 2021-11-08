import React, {useEffect, useState} from 'react'
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/instrucoes/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';


export const InstrucoesGabCrh = () =>{

    const [data, setData] = useState([])

    const pesquisaInstrucao = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_INSTRUCOES,{
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
        const getInstrucao = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_INSTRUCOES)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getInstrucao();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> INSTRUÇÕES </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadInstrucaoGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaInstrucao(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO INFORMAÇÃO</th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(instrucoes =>(
                         <tr key={instrucoes.id_instrucao}>
                         <LineTD>{instrucoes.numero_instrucao}</LineTD>
                         <LineTD>{instrucoes.setorinstrucao}</LineTD>
                         <LineTD>{instrucoes.assunto_instrucao}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewInstrucaoGabCrh/" + instrucoes.id_instrucao}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditInstrucaoGabCrh/" + instrucoes.id_instrucao}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirInstrucaoGabCrh/"+ instrucoes.id_instrucao}>                        
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