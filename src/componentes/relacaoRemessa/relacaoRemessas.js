import React, { useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const RelRemessa = () => {

    const [data, setData] = useState([])

    const getRemessa = async() => {
        fetch("http://localhost/dashboard/sistemaNumeracao/relacao_remessa/listar_remessa.php")
        .then(response => response.json())
        .then((responJSON) => (
            setData(responJSON.registro_remessa)
        ))
    }
    useEffect(() => {
        getRemessa();
    },[])

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo> RELAÇÃO DE REMESSAS </Titulo>
                    <BotaoAcao>                            
                        <Link to="/FormCadRelRemessa">
                            <ButtonSuccess>Cadastrar</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo> 
                <Table>
                    <thead>
                        <tr>
                            <th>NUMERO DESPACHO</th>
                            <th>PROCESSO / SISRAD</th>
                            <th>UA</th>
                            <th>INTERESSADO</th>
                            <th>ASSUNTO</th>
                            <th>AÇÕES</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map(remessas => (
                            <tr key={remessas.id_remessa}>
                            <LineTD>{remessas.numero_remessa}</LineTD>
                            <LineTD>{remessas.numProcesso_remessa}</LineTD>                            
                            <LineTD>{remessas.des_ua}</LineTD>
                            <LineTD>{remessas.interessado_remessa}</LineTD>
                            <LineTD>{remessas.assunto_remessa}</LineTD>                            
                            <LineTD>
                                <Link to={"FormViewRelRemessa/" + remessas.id_remessa}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                                </Link> {" "}
                                <Link to={"formEditarRelRemessa/" + remessas.id_remessa}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                                </Link> {" "}
                                <Link to={"formExclurRelRemessa/" + remessas.id_remessa} >                                
                                <ButtonPrimary>Apagar</ButtonPrimary>
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