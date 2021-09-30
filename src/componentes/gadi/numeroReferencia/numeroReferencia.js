import React, { useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';



export const NumReferencia = () => {    

      

    const pesquisaNumeroReferencia = (input) => {
        
       fetch(process.env.REACT_APP_LISTAR_REFERENCIAS,{
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
            fetch(process.env.REACT_APP_LISTAR_REFERENCIAS)
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
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaNumeroReferencia(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>                                    
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DE REFERÊNCIA</th>
                            <th>PROCESSO / SISRAD</th>
                            <th>UA</th>
                            <th>ASSUNTO</th>
                            <th>Nº BANQUINHO</th>                       
                            <th>AÇÕES</th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(referencia => (
                            <tr key={referencia.id_referencia}>
                        <LineTD>{referencia.numero_referencia}</LineTD>
                        <LineTD>{referencia.num_processo_referencia}</LineTD>
                        <LineTD>{referencia.desua}</LineTD>
                        <LineTD>{referencia.assuntoReferencia}</LineTD>
                        <LineTD>{referencia.referencia_banquinho}</LineTD>
                        <LineTD>
                            <Link to={"/formViewNumReferencias/" + referencia.id_referencia}>
                            <ButtonPrimary>Visualizar</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formEditarNumReferencias/"+ referencia.id_referencia}>
                            <ButtonPrimary>Editar</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formSaidaNumReferencias/"+ referencia.id_referencia}>
                            <ButtonPrimary>Saída</ButtonPrimary> 
                            </Link>{" "}
                            <Link to ={"/formExcluirNumReferencias/"+ referencia.id_referencia}>
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