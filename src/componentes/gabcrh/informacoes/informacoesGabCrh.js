import React, {useState, useEffect} from 'react'
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/informacoes/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const InformacoesGabCrh = () =>{
    const [data, setData] = useState([])

    const pesquisaInformacao = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_INFORMACAO,{
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
        const getInformacao = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_INFORMACAO)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getInformacao();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> INFORMAÇÕES </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadInformacaoGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaInformacao(e.target.value)}></InputPesquisa> 
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
                        {Object.values(data).map(informacoes =>(
                         <tr key={informacoes.id_informacao}>
                         <LineTD>{informacoes.numero_informacao}</LineTD>
                         <LineTD>{informacoes.setorInformacao}</LineTD>
                         <LineTD>{informacoes.assuntoInformacao}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewInformacaoGabCrh/" + informacoes.id_informacao}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditInformacaoGabCrh/" + informacoes.id_informacao}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirInformacaoGabCrh/"+ informacoes.id_informacao}>                        
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
