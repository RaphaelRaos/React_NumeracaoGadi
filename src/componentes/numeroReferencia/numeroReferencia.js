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
                    {Object.values(data).map(referencia => (
                            <tr key={referencia.id_referencia}>
                        <LineTD>{referencia.numero_referencia}</LineTD>
                        <LineTD>{referencia.num_processo_referencia}</LineTD>
                        <LineTD>{referencia.des_ua}</LineTD>
                        <LineTD>{referencia.assunto}</LineTD>
                        <LineTD>
                            <Link to={"/formViewMemorando/" + referencia.id_memorando}>
                            <ButtonPrimary>Visualizar</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formEditarMemorando/"+ referencia.id_memorando}>
                            <ButtonPrimary>Editar</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formExcluirMemorando/"+ referencia.id_memorando}>
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