import React, {useState,useEffect} from "react";
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ContInformacao } from '../../styles/informacoes/styles';
import { Link } from 'react-router-dom';


export const FormViewInformacaoGabCrh = (props) => {
    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getInformacaoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_INFORMACAO + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.informacao)
                })
        }
        
        getInformacaoGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR INFORMAÇÃO </Titulo>
                    <BotaoAcao>
                        <Link to="/InformacoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ContInformacao>NÚMERO INFORMAÇÃO: {data.numero_informacao}</ContInformacao>
                    <ContInformacao>ASSUNTO INFORMAÇÃO: {data.assuntoInformacao}</ContInformacao>                    
                    <ContInformacao>DATA EMISSÃO INFORMAÇÃO: {data.datElaboracao_informacao}</ContInformacao>
                    <ContInformacao>EXECUTOR: {data.executor_informacao}</ContInformacao>
                    <ContInformacao>SETOR CADASTRANTE: {data.setorInformacao}</ContInformacao>
                    <ContInformacao>OBSERVAÇÃO: {data.observacao_informacao}</ContInformacao>                    
                   
                </div>
                
            </Container>
        </div>
    );

    
}