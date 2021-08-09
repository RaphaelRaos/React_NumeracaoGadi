import React, { useEffect, useState} from 'react';
import { Container, Table, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary } from './styles';
import {Link} from 'react-router-dom';
import { Header } from '../header/header';


export const RelRemessa = () => {

    const [data, setData] = useState([])

    const getRemessa = async () => {
        fetch("http://localhost/dashboard/sistemaNumeracao/relacao_remessa/listar_remessa.php")
        .then(response => response.json())
        .then((responseJson) => (
            setData(responseJson.registro_remessa)
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
                        {Object.values(data).map(remessa => (
                            <tr key={remessa.id_remessa}>
                            <LineTD>{remessa.numero_remessa}</LineTD>
                            <LineTD>{remessa.numProcesso_remessa}</LineTD>                            
                            <LineTD>{remessa.des_ua}</LineTD>
                            <LineTD>{remessa.interessado_remessa}</LineTD>
                            <LineTD>{remessa.assunto_remessa}</LineTD>                            
                            <LineTD>
                                <Link to={"FormViewRelRemessa/" + remessa.id_remessa}>
                                <ButtonPrimary>Visualizar</ButtonPrimary>
                                </Link> {" "}
                                <Link to={"formEditarRelRemessa/" + remessa.id_remessa}>
                                <ButtonPrimary>Editar</ButtonPrimary>
                                </Link> {" "}
                                <Link to={"formExclurRelRemessa/" + remessa.id_remessa} >                                
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