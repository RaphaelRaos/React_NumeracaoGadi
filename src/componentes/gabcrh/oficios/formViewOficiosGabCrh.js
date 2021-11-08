import React, {useState, useEffect} from "react";
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoOficio } from '../../styles/oficios/styles';
import { Link } from 'react-router-dom';

export const FormViewOficiosGabCrh = (props)=> {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getOficiosGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_OFICIOS + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.oficio)
                })
        }
        
        getOficiosGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR OFICIOS </Titulo>
                    <BotaoAcao>
                        <Link to="/OficiosGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoOficio>NÚMERO OFICIOS: {data.numero_oficio}</ConteudoOficio>
                    <ConteudoOficio>ASSUNTO OFICIOS: {data.assuntooficio}</ConteudoOficio>                    
                    <ConteudoOficio>DATA EMISSÃO OFICIOS: {data.datElaboracao_oficio}</ConteudoOficio>
                    <ConteudoOficio>EXECUTOR: {data.executor_oficio}</ConteudoOficio>
                    <ConteudoOficio>SETOR CADASTRANTE: {data.setorOficio}</ConteudoOficio>
                    <ConteudoOficio>OBSERVAÇÃO: {data.observacao_oficio}</ConteudoOficio>              
                </div>                
            </Container>
        </div>
    );


}
