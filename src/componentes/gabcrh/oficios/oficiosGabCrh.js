import React, {useState, useEffect} from 'react'
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/oficios/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';


export const OficiosGabCrh = () => {

    const [data, setData] = useState([])

    const pesquisaOficios = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_OFICIOS,{
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
        const getOficiosGabCrh = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_OFICIOS)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getOficiosGabCrh();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> OFICIOS </Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadOficiosGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaOficios(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO OFICIO</th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(oficio =>(
                         <tr key={oficio.id_oficio}>
                         <LineTD>{oficio.numero_oficio}</LineTD>
                         <LineTD>{oficio.setorOficio}</LineTD>
                         <LineTD>{oficio.assuntooficio}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewOficiosGabCrh/" + oficio.id_oficio}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditOficiosGabCrh/" + oficio.id_oficio}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirOficiosGabCrh/"+ oficio.id_oficio}>                        
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