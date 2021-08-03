import React, {useState, useEffect} from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess} from './styles';
import { Link } from 'react-router-dom';

export const FormCadOficios = () => {

    

    const [oficio, setOficio] = useState({

        interessado_oficio: null,
        assunto_oficio: null,
        datEmissao_oficio:null,
        executor_oficio: null,
        setor_oficio: null,
        observacao_oficio: (''),
    
    });

    const [setor_oficio, setSetor] = useState([]);

    const valorInput = e => setOficio({...oficio,[e.target.name]: e.target.value});

    const [status,setStatus] = useState({
        type: '', 
        mensagem: ''
    })

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

    const cadOficio = async e =>{

        e.preventDefault();
        await fetch("http://localhost/dashboard/sistemaNumeracao/oficios/cadastrar_oficio.php", {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({oficio})
        })
        
        .then((response) =>response.json())
        .then((responseJson) =>{           
            if(responseJson.erro){
                setStatus({
                    type: 'erro',
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
                type: 'erro',
                mensagem:"OFÍCIO NÃO CADASTRADO - CONTATE O ADMINISTRADOR DO SISTEMA - (ERRO 1-F)"
            });
        });         
    }

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE OFÍCIOS</Titulo>
                    <BotaoAcao>
                        <Link to = "/oficios">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={cadOficio}>
                    <TableForm>
                        <th>
                            <Label>INTERESSADO</Label>
                                <Input type="text" placeholder="Interessado" name="interessado_oficio" onChange={valorInput} required ></Input>
                            <Label>ASSUNTO</Label>
                                <Input type="text" placeholder="Assunto" name="assunto_oficio" onChange={valorInput} required></Input>  
                            <Label>DATA EMISSÃO</Label>
                                <Input type="date" name="datEmissao_oficio" onChange={valorInput} required></Input>
                            <Label>EXECUTOR</Label>
                            <Input type="text" placeholder="Executor" name="executor_oficio" onChange={valorInput} required ></Input>
                            <Label>ÁREA</Label>
                            <Select name="setor_oficio" onChange={valorInput} required>
                                        <option value="">Selecione</option>
                                            {Object.values(setor_oficio).map(setor => (
                                                <option key={setor.id_setor}>{setor.nome_setor}</option>
                                            ))}                                            
                                    </Select> 
                            <Label>OBSERVAÇÃO</Label>
                                <TextArea name = "observacao_oficio" cols = "50 rows" rows = "5" id="" onChange={valorInput} ></TextArea>
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