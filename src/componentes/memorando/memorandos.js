import React, {useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';

export const Memorandos = () => {

    const [data, setData] = useState([])

    const getMemorando = async() => {
        fetch("http://localhost/dashboard/sistemaNumeracao/memorandos/listar_memorandos.php")
        .then(response => response.json())
        .then((responseJSON) =>(
            setData(responseJSON.registro_memorando)
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