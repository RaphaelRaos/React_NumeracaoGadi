import React, {useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, InputPesquisa, SectionPesquisar} from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../../header/header';

export const Memorandos = () => {

    const [data, setData] = useState([])

    const pesquisaMemorando = (input) => {
        
        fetch(process.env.REACT_APP_LISTAR_MEMORANDOS,{
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

    const getMemorando = async() => {
        fetch(process.env.REACT_APP_LISTAR_MEMORANDOS)
        .then(response => response.json())
        .then((responseJSON) =>(
            setData(responseJSON)
        ))
    }
    useEffect(() =>{
        getMemorando();
    },[])

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> MEMORANDOS </Titulo>
                    <BotaoAcao>                            
                        <Link to="/formMemorando">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>            
                    <SectionPesquisar>
                        <InputPesquisa type="text" name="pesquisa" placeholder="PESQUISAR" onChange={ e=> pesquisaMemorando(e.target.value)}></InputPesquisa> 
                    </SectionPesquisar>             
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DO MEMORANDO</th>
                            <th>INTERESSADO</th>
                            <th>ASSUNTO</th>                            
                            <th>AÇÕES</th>                                            
                        </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(memorandos => (
                            <tr key={memorandos.id_memorando}>
                        <LineTD>{memorandos.numero_memorando}</LineTD>
                        <LineTD>{memorandos.interessado_memorando}</LineTD>
                        <LineTD>{memorandos.assunto_memorando}</LineTD>
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