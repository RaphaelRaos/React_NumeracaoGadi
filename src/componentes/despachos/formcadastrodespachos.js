import React,{ useEffect, useState} from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';
import { Link } from 'react-router-dom';

export const FormCadDespacho = () => {

    const [despacho, setDespacho] = useState({
        numero_sisrad_processo: "",
        des_ua: "",
        des_ugo: "",
        interessado_despacho: "",
        datEntrada_despacho: "",
        assunto_despacho: "",
        executor_despacho: "",
        setor: "",
        observacao_despacho: ""
    });

    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);
        
    const [status,setStatus] = useState({
        type: '', 
        mensagem: ''
    })

    const valorInput = e => setDespacho({...despacho,[e.target.name]: e.target.value});

    const cadDespacho = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_CADASTRAR_DESPACHOS, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({despacho})   
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.erro){
                setStatus({
                  type: 'erro',
                  mensagem: responseJson.mensagem
                });
              } else {
                setStatus({
                  type: 'success',
                  mensagem: responseJson.mensagem
                });
              }
            }).catch(() => {
              setStatus({
                type: 'erro',
                mensagem: 'Despacho não cadastrado. Contate o Administrador do Sistema!!'
              });
            });
    }
    const unidadeAdministrativa = async() =>{
            await fetch(process.env.REACT_APP_VISUALIZAR_UA)
            .then((response) => response.json())
            .then((responseJson) => {
                setDestinacao(responseJson.registro_UA);
            })
        }
    const unidadeOrcamentaria = async() =>{
        await fetch(process.env.REACT_APP_VISUALIZAR_UO)
        .then((response) => response.json())
        .then((responseJson) => {
            setOrcamentaria(responseJson.registro_UO);
        })
    }
    const setores = async() =>{
        await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
        .then((response) => response.json())
        .then((responseJson) => {
            setSetor(responseJson.registro_setor);
        })
    }
    useEffect (() => {
        unidadeAdministrativa();
        unidadeOrcamentaria();
        setores(); 
    },[])     
    
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to = "/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadDespacho}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>NUMERO SISRAD/PROCESSOR</Label>
                                        <Input type="text" placeholder="Numero Sisrad / Processo" name="numero_sisrad_processo" onChange={valorInput} ></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>                                
                                        <Select name="des_ua" onChange={valorInput}>
                                            <option value="">Selecione</option>
                                            {Object.values(nomenclaturaUA).map(unidadeAdministrativa =>(
                                                <option key = {unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                            ))}                                           
                                        </Select>
                                    <Label>UNIDADE ORÇAMENTÁRIA</Label>                                
                                        <Select name="des_ugo" onChange={valorInput}>
                                            <option value="">Selecione</option>
                                            {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria =>(
                                                <option key = {unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                            ))}                       
                                        </Select>  
                                    <Label>INTERESSADO</Label>
                                        <Input type="text" placeholder="Interessado" name="interessado_despacho" onChange={valorInput} ></Input>
                                    <Label>ASSUNTO</Label>
                                        <Input type="text" placeholder="Assunto Despacho" name="assunto_despacho" onChange={valorInput} ></Input>                       
                                
                                    <Label>DATA ENTRADA</Label>
                                        <Input type="date" placeholder="" name="datEntrada_despacho" onChange={valorInput} ></Input>
                                
                                    <Label>EXECUTOR</Label>
                                        <Input type="text" placeholder="Interessado" name ="executor_despacho" onChange={valorInput} ></Input>
                                    <Label>SETOR</Label>
                                        <Select onChange={valorInput} name="setor">
                                            <option>Selecione</option>
                                            {Object.values(nomenclaturaSetor).map(setor => (
                                                <option key={setor.id_setor}>{setor.nome_setor}</option>
                                            ))}                                            
                                        </Select>
                                    <Label>OBSERVAÇAO</Label>
                                        <TextArea name = "observacao_despacho" cols = "50 rows" rows = "5" id="" onChange={valorInput} ></TextArea>                                
                                </th>
                            </tr>                               
                        </tbody>   
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    )
}