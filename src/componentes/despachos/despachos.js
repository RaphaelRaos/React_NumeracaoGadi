import React, { useEffect, useState } from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const Despachos = () => {

    const [data, setData] = useState([])
    
    const getDespachos = async() => {
        fetch(process.env.REACT_APP_LISTAR_DESPACHOS)
        .then(response => response.json())
        .then((responJSON) => (
            setData(responJSON.registros_despachos)
        ))
    }
    useEffect(() => {
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
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DESPACHO</th>
                            <th>PROCESSO / SISRAD</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                        
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
                             <ButtonPrimary>Saída</ButtonPrimary>
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