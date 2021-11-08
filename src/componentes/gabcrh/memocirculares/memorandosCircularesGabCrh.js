import React, {useState, useEffect} from "react";
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/memocirculares/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const MemoCircularGabCrh = () => {

    const [data, setData] = useState([])

    const pesquisaMemoCircular = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_MEMOCIRCULARES,{
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
        const getMemoCirculare = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_MEMOCIRCULARES)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getMemoCirculare();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> MEMORANDOS CIRCULARES </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadMemorandoCircularGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaMemoCircular(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO MEMO CIRCULAR</th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(memoCircular =>(
                         <tr key={memoCircular.id_memorandoCircular}>
                         <LineTD>{memoCircular.numero_memorandoCircular}</LineTD>
                         <LineTD>{memoCircular.setormemorandoCircular}</LineTD>
                         <LineTD>{memoCircular.assunto_memorandoCircular}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewMemorandoCircularGabCrh/" + memoCircular.id_memorandoCircular}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditMemorandoCircularGabCrh/" + memoCircular.id_memorandoCircular}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirMemorandoCircularGabCrh/"+ memoCircular.id_memorandoCircular}>                        
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