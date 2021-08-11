import React, { useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, FormPesquisa, InputPesquisa } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';



export const NumReferencia = () => {

    const [data, setData] = useState([])

    const getReferencia = async() => {
        fetch("http://localhost/dashboard/sistemaNumeracao/num_referencia/newListar_referencia.php")
        .then(response => response.json())
        .then((responJSON) => (
            setData(responJSON.registro_referencia)
        ))
    }
    useEffect(() => {
        getReferencia();
    },[])
    
    
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
            <FormPesquisa>           
                    <InputPesquisa type="text" name="pesquisar" ></InputPesquisa>            
            </FormPesquisa>
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
                        {Object.values(data).map(referencias => (
                            <tr key={referencias.id_referencia}>                      
                                <LineTD>{referencias.numero_referencia}</LineTD>
                                <LineTD>{referencias.num_processo_referencia}</LineTD>
                                <LineTD>{referencias.des_ua}</LineTD>
                                <LineTD>{referencias.assunto}</LineTD>           
                              
                                <LineTD>
                                    <Link to= {"/formViewNumReferencias/" + referencias.id_referencia}>                                    
                                        <ButtonPrimary>Visualizar</ButtonPrimary>
                                    </Link> {" "}                                  
                                    <Link to= {"/formEditarNumReferencias/" + referencias.id_referencia}>
                                        <ButtonPrimary>Editar</ButtonPrimary>
                                    </Link> {" "}
                                    <Link to= {"/formSaidaNumReferencias/" + referencias.id_referencia}>
                                        <ButtonPrimary>Saída</ButtonPrimary>
                                    </Link>
                                    {" "}
                                    <Link to= {"/formExcluirNumReferencias/" + referencias.id_referencia}>
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