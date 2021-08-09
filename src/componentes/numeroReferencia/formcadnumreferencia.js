import React, {useState, useEffect} from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess,Section1, Section2, TBODY } from './styles';
import { Link } from 'react-router-dom';

export const FormCadNumRef = () => {

    
    const [referencia, setReferencia] = useState({
        num_processo_referencia: null,
        des_ua: null,
        des_uo: null,
        interessado_referencia: null,          
        assunto: null,
        datEntrada_referencia: null,
        executor_referencia: null,
        posse_referencia: null,
        vigencia_referencia: null,
        observacao_referencia: null,
    });
    
    
    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
    const [nomenclaturaSetor, setSetor] = useState([]);
    const [assuntoReferencia, setAssunto] = useState([]);
        
    const [status,setStatus] = useState({
        type: '', 
        mensagem: ''
    })

    const valorInput = e => setReferencia({...referencia,[e.target.name]: e.target.value});

    const assunto = async() => {
        await fetch("http://localhost/dashboard/sistemaNumeracao/assuntos/visualizar_assunto.php")
        .then((response) => response.json())
        .then((responseJson) => {
            setAssunto(responseJson.registro_assunto);
        })
    }
    
    const unidadeAdministrativa = async() =>{
        await fetch("http://localhost/dashboard/sistemaNumeracao/unidades/visualizar_ua.php")
        .then((response) => response.json())
        .then((responseJson) => {
            setDestinacao(responseJson.registro_UA);
        })
    }
    const unidadeOrcamentaria = async() =>{
    await fetch("http://localhost/dashboard/sistemaNumeracao/unidades/visualizar_uo.php")
    .then((response) => response.json())
    .then((responseJson) => {
        setOrcamentaria(responseJson.registro_UO);
    })
}
    const setores = async() =>{
    await fetch("http://localhost/dashboard/sistemaNumeracao/setores/visualizar_setor.php")
    .then((response) => response.json())
    .then((responseJson) => {
        setSetor(responseJson.registro_setor);
    })
}
    useEffect (() => {
    unidadeAdministrativa();
    unidadeOrcamentaria();
    setores();
    assunto();
    },[]) 

    const cadReferencia = async e => {

        e.preventDefault();

       await fetch("http://localhost/dashboard/sistemaNumeracao/num_referencia/cadastrar_referencia.php",{
           method: "POST",
           headers:{'Content-Type': 'application/json'},
           body: JSON.stringify({referencia})
       })
       .then((response) => response.json())
       .then((responseJson) =>{
           if(responseJson.erro){
               setStatus({
                   type: 'erro',
                   mensagem:responseJson.mensagem
               });
           } else {
               setStatus({
                   type: 'success',
                   mensagem:responseJson.mensagem
               });
           }
        }).catch(() => {
            setStatus({
                type: 'erro',
                mensagem:"DESPACHO NÃO CADASTRADO - CONTATE O ADMINISTRADOR - (ERRO 1-F)"
            });
           });
       }

       /*console.log(referencia);*/
    
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE NÚMERO DE REFERÊNCIAS</Titulo>
                    <BotaoAcao>
                        <Link to = "/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadReferencia}>
                    <TableForm>                        
                        <TBODY>
                            <Section1>
                            <Label>NÚMERO PROCESSO / SPDOC / SEM PAPEL</Label>
                                <Input type="text" placeholder="Número Processo" name="num_processo_referencia" onChange={valorInput} required minLength='5'></Input>
                            <Label>UNIDADE ADMINISTRATIVA</Label>
                                <Select name="des_ua" onChange={valorInput} required>
                                                <option value="">Selecione</option>
                                                {Object.values(nomenclaturaUA).map(unidadeAdministrativa =>(
                                                    <option key = {unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                                ))}                                           
                                            </Select>
                            <Label>COORDENADORIA</Label>
                                <Select name="des_uo" onChange={valorInput} required>
                                                <option value="">Selecione</option>
                                                {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria =>(
                                                    <option key = {unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                                ))}                       
                                 </Select>
                            <Label>INTERESSADO</Label>
                                <Input type="text" placeholder="Interessado" name="interessado_referencia" onChange={valorInput} required></Input>
                            <Label>ASSUNTO</Label>
                                <Select onChange={valorInput} name="assunto" required>
                                    <option value="">Selecione</option>
                                    {Object.values(assuntoReferencia).map(assunto => (
                                        <option key={assunto.id_assunto}> {assunto.assunto}</option>
                                    ))}
                                </Select>
                            <Label>DATA ENTRADA</Label>
                                <Input type="date" name="datEntrada_referencia" onChange={valorInput} required></Input>                        
                            </Section1>
                            <Section2>
                            
                            <Label>EXECUTOR</Label>
                                <Input type="text" placeholder="Executor" name="executor_referencia" onChange={valorInput} required></Input>  
                            <Label>UNIDADE DE POSSE</Label>
                                <Select onChange={valorInput} name="posse_referencia" required>
                                    <option value="">Selecione</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                            <option key={setor.id_setor}>{setor.nome_setor}</option>
                                        ))}                                            
                                </Select>                    
                            <Label>DATA DA VIGÊNCIA </Label>
                                <Input type="date" name="vigencia_referencia" onChange={valorInput}></Input>
                            <Label>OBSERVAÇÃO</Label>
                                <TextArea name = "observacao_referencia" cols = "50 rows" rows = "8" id="" onChange={valorInput}></TextArea>
                            </Section2>
                        </TBODY>                        
                    </TableForm>
                    <DivButton>
                        <br></br>
                            <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                        <br></br>
                        
                    </DivButton>
                </form>
                </Container>
        </div>
    )
}