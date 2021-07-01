import React, {useState} from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess} from './styles';
import { Link } from 'react-router-dom';

export const FormCadComunicado = () => {

    const[comunicado, setComunicado] = useState({
        assunto_comunicado: "",
        data_elaboracao: "",
        executor_comunicado: "",
        setor_comunicado: "",
        observacao_comunicado: ""
    });

    const [status, setStatus] = useState ({
        type: '',
        mensagem:''
      })

    const valorInput = e => setComunicado({...comunicado,[e.target.name]: e.target.value});

    const cadComunicados = async e => { // conexão com a api
        e.preventDefault();
        
        await fetch("http://localhost/dashboard/sistemaNumeracao/comunicados/cadastrar_comunicados.php", {
        method:'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify({comunicado})
        })
        .then((response) => response.json())
        .then((responseJson ) => {
            if(responseJson.erro){
            setStatus({
              type: 'erro',
              mensagem: responseJson.message
            });
          } else {
            setStatus({
              type: 'erro',
              mensagem: responseJson.message
            });
          }
        }).catch(() => {
          setStatus({
            type: 'success',
            mensagem: 'Autorização Governamental Cadastrada com Sucesso !!'
          });
        });
      }

     return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                
                    <Titulo>CADASTRO DE COMUNICADOS</Titulo>
                    <BotaoAcao>
                        <Link to = "/comunicados">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                
                <form onSubmit={cadComunicados} >
                    <TableForm >
                        <th>
                            <Label>ASSUNTO: </Label>
                                <Input type="text" name="assunto_comunicado" placeholder="Assunto" onChange={valorInput}></Input>
                            <Label>DATA ELABORAÇÃO: </Label>
                                <Input type="date" name="data_elaboracao" onChange={valorInput}></Input>
                            <Label>EXECUTOR: </Label>
                                <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" onChange={valorInput}></Input>
                            <Label>AREA: </Label>
                                <Select name = "setor_comunicado" onChange={valorInput}>
                                    <option value="#">Selecione</option>
                                    <option>Opção 1</option>                                    
                                </Select>
                            <Label>OBSERVAÇÃO</Label>
                            <TextArea name = "observacao_comunicado" cols = "50 rows" rows = "5" onChange={valorInput}></TextArea>
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