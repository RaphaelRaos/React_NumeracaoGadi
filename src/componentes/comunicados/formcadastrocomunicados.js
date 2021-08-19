import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess} from './styles';
import { Link } from 'react-router-dom';

export const FormCadComunicado = () => {   
    
    const {register, handleSubmit} = useForm(

  );

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
        //handleSubmit();
        
        await fetch(process.env.REACT_APP_CADASTRAR_COMUNICADO, {
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
            mensagem: 'Comunicado não cadastrado. Contate o Administrador do Sistema!!'
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
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={handleSubmit(cadComunicados)}>
                    <TableForm >
                      <tr>
                        <th>
                            <Label>ASSUNTO: </Label>
                                <Input type="text" name="assunto_comunicado" placeholder="Assunto" onChange={valorInput} ref={register()}></Input>
                            <Label>DATA ELABORAÇÃO: </Label>
                                <Input type="date" name="data_elaboracao" onChange={valorInput} ref={register()}></Input>
                            <Label>EXECUTOR: </Label>
                                <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" onChange={valorInput} ref={register()}></Input>
                            <Label>AREA: </Label>
                                <Select name = "setor_comunicado" onChange={valorInput} ref={register()}>
                                    <option value="#">Selecione</option>
                                    <option>Opção 1</option>                                    
                                </Select>
                            <Label>OBSERVAÇÃO</Label>
                            <TextArea name = "observacao_comunicado" cols = "50 rows" rows = "5" onChange={valorInput}></TextArea>
                        </th>
                      </tr>
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