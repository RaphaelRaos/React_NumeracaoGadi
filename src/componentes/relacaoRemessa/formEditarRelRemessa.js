import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess} from './styles';


export const FormEditarRelRemessa = (props) => {

    const [id_remessa] = useState(props.match.params.id);
    const [nomenclaturaUA, setDestinacao] = useState([]);
    const [nomenclaturaUGO, setOrcamentaria] = useState([]);
    const [nomenclaturaSetor, setSetorAlteracao] = useState([]);

    const [numProcesso_remessa, setProcesso] = useState('');
    const [des_ua,setUA] = useState('');
    const [des_ugo,setUO] = useState('');
    const [interessado_remessa, setInteressado] = useState('');
    const [assunto_remessa, setAssunto] = useState('');
    const [executor_remessa, setExecutor] = useState('');
    const [area_remessa, setArea] = useState('');
    const [observacao_remessa, setObservacao] = useState('');
  
     
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    
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
            setSetorAlteracao(responseJson.registro_setor);
        })
        
    }
    

    useEffect(() => {

            const getRemessa = async() => {
                await fetch("http://localhost/dashboard/sistemaNumeracao/relacao_remessa/visualizar_remessas.php?id="+ id_remessa)
                .then((response) => response.json())
                .then((responseJson) => {
                    setProcesso(responseJson.mensagem.numProcesso_remessa)
                    setUA(responseJson.mensagem.des_ua)
                    setUO(responseJson.mensagem.des_ugo)
                    setInteressado(responseJson.mensagem.interessado_remessa)
                    setAssunto(responseJson.mensagem.assunto_remessa)
                    setExecutor(responseJson.mensagem.executor_remessa)
                    setArea(responseJson.mensagem.area_remessa)
                    setObservacao(responseJson.mensagem.observacao_remessa)
                })
            }           
        getRemessa();
        setores();
        unidadeOrcamentaria();
        unidadeAdministrativa();

    },[id_remessa]);

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>EDITAR RELAÇÃO DE REMESSAS</Titulo>
                    <BotaoAcao>
                        <Link to = "/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form >
                    <TableForm>
                        <tbody>
                            <tr> 
                                <td>
                                    <Label>NUMERO SISRAD / PROCESSO </Label>
                                        <Input type="" placeholder="Numero Processo / Sisrad" name="numProcesso_remessa" value={"setProcesso"}></Input>
                                        <Label>UNIDADE ADMINISTRATIVA</Label>                                
                                                <Select name="des_ua" >
                                                    <option value="">Selecione</option>
                                                    {Object.values(nomenclaturaUA).map(unidadeAdministrativa =>(
                                                        <option key = {unidadeAdministrativa.CodTabUa}>{unidadeAdministrativa.UNIDADE_ADMINISTRATIVA}</option>
                                                    ))}                                           
                                                </Select>
                                        <Label>UNIDADE ORÇAMENTÁRIA</Label>                                
                                                <Select name="des_uo" >
                                                    <option value="">Selecione</option>
                                                    {Object.values(nomenclaturaUGO).map(unidadeOrcamentaria =>(
                                                        <option key = {unidadeOrcamentaria.CodTabUGO}>{unidadeOrcamentaria.UNIDADE_ORCAMENTARIA}</option>
                                                    ))}                       
                                                </Select>
                                            <Label>INTERESSADO </Label>
                                        <Input type="text" placeholder="Interessado" name="interessado_remessa" ></Input>
                                        <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Remessa" name="assunto_remessa" ></Input>  
                                    </td> 
                                    <td>
                                        <Label>DATA DE EMISSÃO</Label>
                                            <Input type="date" name="datEmissao_remessa" ></Input>
                                        <Label>EXECUTOR</Label>
                                            <Input type="text" placeholder="Executor" name="executor_remessa" ></Input>
                                        <Label>SETOR</Label>
                                            <Select  name="area_remessa">
                                                    <option>Selecione</option>
                                                    {Object.values(nomenclaturaSetor).map(setor => (
                                                        <option key={setor.id_setor}>{setor.nome_setor}</option>
                                                    ))}                                            
                                                </Select>
                                        <TextArea name = "observacao_remessa" cols = "50 rows" rows = "5" id="" ></TextArea>
                                    </td>
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