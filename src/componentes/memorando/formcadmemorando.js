import React, { useEffect, useState}  from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess} from './styles';
import { Link } from 'react-router-dom';

export const FormCadMemorando = () => {

    const [memorando, setMemorando] = useState({
        interessado_memorando: "",
        assunto_memorando: "",
        datEmissao_memorando: "",
        executor_memorando: "",
        setor_memorando: "",
        observacao_memorando: ""
    })

    const [status,setStatus] = useState({
        type: '', 
        mensagem: ''
    })

    const valorInput = e => setMemorando({...memorando,[e.target.name]: e.target.value});
    
    const [nomenclaturaSetor, setSetor] = useState([]);


    const setores = async() =>{
        await fetch("http://localhost/dashboard/sistemaNumeracao/setores/visualizar_setor.php")
        .then((response) => response.json())
        .then((responseJson) => {
            setSetor(responseJson.registro_setor);
        })
    }

    useEffect(() => {
        setores();
    },[])

    const cadMemorando = async e => {
        e.preventDefault();

        await fetch("http://localhost/dashboard/sistemaNumeracao/memorandos/cadastrar_memorando.php", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({memorando})   
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
                mensagem: 'Memorando não cadastrado. Contate o Administrador do Sistema!!'
              });
            });
    }

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE MEMORANDOS</Titulo>
                    <BotaoAcao>
                        <Link to = "/memorandos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadMemorando}>
                    <TableForm>
                        <th>
                            <Label>INTERESSADO</Label>
                                <Input type="text" placeholder="Interessado" name="interessado_memorando" onChange={valorInput}></Input>
                            <Label>ASSUNTO</Label>
                                <Input type="text" placeholder="Assunto Memorando" name="assunto_memorando" onChange={valorInput}></Input>
                            <Label>DATA EMISSÃO</Label>
                                <Input type="date" onChange={valorInput} name="datEmissao_memorando"></Input>
                            <Label>EXECUTOR</Label>
                                <Input type="text" placeholder="Executor" name="executor_memorando" onChange={valorInput}></Input>
                            <Label>SETOR</Label>
                                <Select onChange={valorInput} name="setor_memorando">
                                    <option>Selecione</option>
                                    {Object.values(nomenclaturaSetor).map(setor => (
                                    <option key={setor.id_setor}>{setor.nome_setor}</option>
                                            ))}                                            
                                 </Select>                   
                            <Label>OBSERVAÇÃO</Label>
                                <TextArea name = "observacao_memorando" cols = "50 rows" rows = "5" id="" onChange={valorInput}></TextArea>
                        </th>
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