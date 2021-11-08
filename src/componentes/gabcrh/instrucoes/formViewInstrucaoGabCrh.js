
import React, {useState, useEffect} from 'react'
import { Header } from '../../header/header';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, ConteudoInstrucao } from '../../styles/instrucoes/styles';
import { Link } from 'react-router-dom';


export const FormViewInstrucaoGabCrh = (props) => {

    const [id] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);

    
    useEffect(() => {

        const getInformacaoGabCrh = async () => {
            await fetch(process.env.REACT_APP_GABCRH_VISUALIZAR_INSTRUCOES + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setData(responseJson.instrucao)
                })
        }
        
        getInformacaoGabCrh();        
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>VISUALIZAR INSTRUÇÃO </Titulo>
                    <BotaoAcao>
                        <Link to="/InstrucoesGabCrh">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <div>
                    <ConteudoInstrucao>NÚMERO INSTRUÇÃO: {data.numero_instrucao}</ConteudoInstrucao>
                    <ConteudoInstrucao>ASSUNTO INSTRUÇÃO: {data.assunto_instrucao}</ConteudoInstrucao>                    
                    <ConteudoInstrucao>DATA EMISSÃO INSTRUÇÃO: {data.datElaboracao_instrucao}</ConteudoInstrucao>
                    <ConteudoInstrucao>EXECUTOR: {data.executor_instrucao}</ConteudoInstrucao>
                    <ConteudoInstrucao>SETOR CADASTRANTE: {data.setor_instrucao}</ConteudoInstrucao>
                    <ConteudoInstrucao>OBSERVAÇÃO: {data.observacao_instrucao}</ConteudoInstrucao>                    
                   
                </div>
                
            </Container>
        </div>
    );


}