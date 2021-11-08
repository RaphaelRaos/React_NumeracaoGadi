import React, {useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from '../../styles/oficioCircular/styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const OficioCircularGabCrh = () => {

    const [data, setData] = useState([])

    const pesquisaOficiosCirculares = (input) => {
        
        fetch(process.env.REACT_APP_GABCRH_LISTAR_OFICIOCIRCULAR,{
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
        const getOficiosCircularesGabCrh = async() => {
            fetch(process.env.REACT_APP_GABCRH_LISTAR_OFICIOCIRCULAR)
            .then(response => response.json())
            .then((responJSON) => (
                setData(responJSON)
            ))
        }
        getOficiosCircularesGabCrh();
    },[])

    return (
        <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/MenuGabCrh">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> OFICIOS CIRCULARES</Titulo>
                    <BotaoAcao>                            
                        <Link to = "/formCadOficioCircularGabCrh">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaOficiosCirculares(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>  
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO OFICIO CIRCULAR</th>
                            <th>SETOR ELABORAÇÃO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(oficioCircular =>(
                         <tr key={oficioCircular.id_oficioCircular}>
                         <LineTD>{oficioCircular.numero_oficioCircular}</LineTD>
                         <LineTD>{oficioCircular.setoroficioCircular}</LineTD>
                         <LineTD>{oficioCircular.assuntooficioCircular}</LineTD>
                         <LineTD>
                             <Link to = {"/formViewOficioCircularGabCrh/" + oficioCircular.id_oficioCircular}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                             </Link>{" "}
                             <Link to = {"/formEditOficioCircularGabCrh/" + oficioCircular.id_oficioCircular}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                             </Link>{" "}                                                         
                             <Link to = {"/formExcluirOficioCircularGabCrh/"+ oficioCircular.id_oficioCircular}>                        
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