import React, {useEffect, useState} from 'react'
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/memorandos/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';


export const MemorandosGabCrh = () => {

    const [data, setData] = useState([])

    const pesquisaMemorandos = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_MEMORANDOS,{
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
        const getMemorando = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_MEMORANDOS)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getMemorando();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> MEMORANDOS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadMemorandoGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaMemorandos(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO MEMORANDO</th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(memorandos =>(
                         <tr key={memorandos.id_memorando}>
                         <LineTD>{memorandos.numero_memorando}</LineTD>
                         <LineTD>{memorandos.setormemorando}</LineTD>
                         <LineTD>{memorandos.assuntomemorando}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewMemorandoGabCrh/" + memorandos.id_memorando}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditMemorandoGabCrh/" + memorandos.id_memorando}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirMemorandoGabCrh/"+ memorandos.id_memorando}>                        
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