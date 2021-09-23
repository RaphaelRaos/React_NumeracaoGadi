import React, { useEffect, useState } from 'react';
import { Header } from '../../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';


export const FormEditarDespachos = (props) => {

    const [id_despacho] = useState(props.match.params.id);
    const [numero_sisrad_processo,setProcesso] = useState('');
    const [des_ua,setUA] = useState('');
    const [des_ugo,setUO] = useState('');
    const [interessado_despacho,setInteressado] = useState('');
    const [assunto_despacho,setAssunto] = useState('');
    const [executor_despacho,setExecutor] = useState('');
    const [setor,setSetor] = useState('');
    const [observacao_despacho,setObservacao] = useState('');
    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);
     


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editDespacho = async e =>{
        e.preventDefault();

        await fetch(process.env.REACT_APP_EDITAR_DESPACHOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_despacho,numero_sisrad_processo, des_ua, des_ugo, interessado_despacho, assunto_despacho, executor_despacho, setor, observacao_despacho})
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.erro){
                    setStatus({
                        type:'error',
                        mensagem:responseJson.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.mensagem
                    });
                }
            }).catch(() => {
                setStatus({ 
                    type: 'error',
                    mensagem: "Produto não editado com sucesso, tente mais tarde!"
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
        setSetorAlteracao(responseJson.registro_setor);
    })
}

    useEffect(() => {
        const getDespachos = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_DESPACHOS+ id_despacho)
            .then((response) => response.json())
            .then((responseJson) => {
                setProcesso(responseJson.despacho.numero_sisrad_processo)
                setUA(responseJson.despacho.des_ua)
                setUO(responseJson.despacho.des_ugo)
                setInteressado(responseJson.despacho.interessado_despacho)
                setAssunto(responseJson.despacho.assunto_despacho)
                setExecutor(responseJson.despacho.executor_despacho)
                setSetor(responseJson.despacho.setor)
                setObservacao(responseJson.despacho.observacao_despacho)
            })
        }
        getDespachos();
        setores();
        unidadeOrcamentaria();
        unidadeAdministrativa();

    },[id_despacho]);
    
     return (
        <div>
            <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>EDITAR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                
                <form onSubmit={editDespacho}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th>
                                    <Label>NUMERO SISRAD/PROCESSOR</Label>
                                        <Input type="text" placeholder="Numero Sisrad / Processo" name="numero_sisrad_processo" value={numero_sisrad_processo} onChange={e => setProcesso(e.target.value)}></Input>
                                    <Label>UNIDADE ADMINISTRATIVA</Label>                                
                                        <Select name="des_ua" onChange={e => setUA(e.target.value)}>
                                            <option value={des_ua}>{des_ua}</option>
                                            {Object.values(nomenclaturaUA).map(unidadeAdministrativa =>(
                                                <option key = {unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                            ))}                                                                                     
                                        </Select>
                                    <Label>UNIDADE ORÇAMENTÁRIA</Label>                                
                                        <Select name="des_ugo" onChange={e => setUO(e.target.value)}>
                                            <option value={des_ugo}>{des_ugo}</option>
                                        {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria =>(
                                                <option key = {unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                        ))}
                                        </Select>  
                                    <Label>INTERESSADO</Label>
                                        <Input type="text" placeholder="Interessado" name="interessado_despacho" value={interessado_despacho} onChange={e => setInteressado(e.target.value)}></Input>
                                    <Label>ASSUNTO</Label>
                                        <Input type="text" placeholder="Assunto Despacho" name="assunto_despacho" value ={assunto_despacho} onChange={e => setAssunto(e.target.value)}></Input>                       
                                    <Label>EXECUTOR</Label>
                                        <Input type="text" placeholder="Interessado" name ="executor_despacho" value={executor_despacho} onChange={e => setExecutor(e.target.value)}></Input>
                                    <Label>SETOR</Label>
                                        <Select name="setor" onChange={e => setSetor(e.target.value)}>
                                            <option value={setor}>{setor}</option>
                                        {Object.values(nomenclaturaSetor).map(setor => (
                                                <option key={setor.id_area}>{setor.area}</option>
                                        ))}
                                        </Select>
                                    <Label>OBSERVAÇAO</Label>
                                        <TextArea name = "observacao_despacho" cols = "50 rows" rows = "5" id="" value={observacao_despacho} onChange={e => setObservacao(e.target.value)}></TextArea>                                
                                </th>
                            </tr>                               
                        </tbody>   
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Editar</ButtonCadastrar>
                    </DivButton>
                </form>

            </Container>
        </div>
     );
    
}