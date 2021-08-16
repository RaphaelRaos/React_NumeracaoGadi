import React, { useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from './styles';
import {Link} from 'react-router-dom';

import { Header } from '../header/header';



export const NumReferencia = () => {    

      

    const pesquisaDinamica = (input) => {
        
       fetch("http://localhost/dashboard/sistemaNumeracao/num_referencia/newListar_referencia.php",{
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
        
    useEffect(() =>{
        
        const getMemorando = async() => {
            fetch("http://localhost/dashboard/sistemaNumeracao/num_referencia/newListar_referencia.php")
            .then(response => response.json())
            .then((responseJSON) =>(
                setData(responseJSON)
            ))
        }
        getMemorando();
    },[])

    const [data, setData] = useState([])      
    
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> NÚMEROS DE REFERÊNCIAS - INFORMAÇÃO </Titulo>
                    <BotaoAcao>                            
                        <Link to="/formNumReferencias">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaDinamica(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>         
            
        </div>                                    
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DE REFERÊNCIA</th>
                            <th>PROCESSO / SISRAD</th>
                            <th>UA</th>
                            <th>ASSUNTO</th>                       
                            <th>AÇÕES</th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(memorandos => (
                            <tr key={memorandos.id_referencia}>
                        <LineTD>{memorandos.numero_referencia}</LineTD>
                        <LineTD>{memorandos.num_processo_referencia}</LineTD>
                        <LineTD>{memorandos.des_ua}</LineTD>
                        <LineTD>{memorandos.assunto}</LineTD>
                        <LineTD>
                            <Link to={"/formViewMemorando/" + memorandos.id_memorando}>
                            <ButtonPrimary>Visualizar</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formEditarMemorando/"+ memorandos.id_memorando}>
                            <ButtonPrimary>Editar</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formExcluirMemorando/"+ memorandos.id_memorando}>
                            <ButtonPrimary>Apagar</ButtonPrimary> 
                            </Link>{" "}
                        </LineTD>
                            </tr>
                        ))} 
                    </tbody>
                </Table>  
            </Container>
        </div>
    );
}