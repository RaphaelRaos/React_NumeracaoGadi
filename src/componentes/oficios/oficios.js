import React, { useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const Oficios = () => {

    const [data, setData] = useState([])

    const getOficios = async() => {
        fetch("http://localhost/dashboard/sistemaNumeracao/oficios/listar_oficio.php")
        .then(response => response.json())
        .then((responseJSON) =>(
            setData(responseJSON.registro_oficio)
        ))
    }
    useEffect(() =>{
        getOficios();
    },[])
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> OFÍCIOS </Titulo>
                    <BotaoAcao>                            
                        <Link to ="/formOficios">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo> 
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO OFICIO</th>
                            <th>INTERESSADO</th>
                            <th>DATA </th>
                            <th>SETOR</th>
                            <th>AÇÕES</th>                                                     
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(oficios =>(
                            <tr key={oficios.id_oficio}>                        
                            <LineTD>{oficios.numero_oficio}</LineTD>
                            <LineTD>{oficios.interessado_oficio}</LineTD>
                            <LineTD>{oficios.datEmissao_oficio}</LineTD>
                            <LineTD>{oficios.setor_oficio}</LineTD>
                            <LineTD>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                                <ButtonPrimary>Editar</ButtonPrimary>
                                <ButtonPrimary>Apagar</ButtonPrimary>
                            </LineTD>
                        </tr>
                        ))}
                    </tbody>
                </Table>  
            </Container>
        </div>
    );
}