import React, { useEffect, useState } from 'react';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess } from './styles';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';


export const FormEditComunicados = (props) => {

    const [id_comunicado] = useState(props.match.params.id);
    const [assunto_comunicado, setAssunto] = useState('');
    const [datEmissao_comunicado, setData] = useState('');
    const [executor_comunicado, setExecutor] = useState('');
    const [area_comunicado, setSetor] = useState('');
    const [observacao_comunicado, setObservacao] = useState('');
    
    
    const [status, setStatus] = useState ({
        type: '',
        mensagem:''
      })   
    
    const editComunicado = async e => {
        e.preventDefault();

        await fetch("http://localhost/dashboard/sistemaNumeracao/comunicados/editar_comunicados.php", {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({id_comunicado, assunto_comunicado,datEmissao_comunicado , executor_comunicado , area_comunicado, observacao_comunicado})
        }).then((response) => response.json())
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
                mensagem: 'Comunicado não Editado. Contate o Administrador do Sistema!!'
              });
            });
             
    }


    useEffect(() => {
        const getComunicados = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/comunicados/visualizar_comunicados.php?id="+ id_comunicado)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                
                setAssunto(responseJson.comunicado.assunto_comunicado);
                setData(responseJson.comunicado.datEmissao_comunicado);
                setExecutor(responseJson.comunicado.executor_comunicado);
                setSetor(responseJson.comunicado.area_comunicado);
                setObservacao(responseJson.comunicado.observacao_comunicado);
            })
        }
        getComunicados();
    },[id_comunicado]);
    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>

                    <Titulo>EDITAR COMUNICADOS</Titulo>
                    <BotaoAcao>
                        <Link to="/comunicados">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                <form onSubmit={editComunicado}>
                    <TableForm >
                        <tr>
                            <th>
                                <Label>ASSUNTO: </Label>
                                <Input type="text" name="assunto_comunicado" placeholder="Assunto" value={assunto_comunicado} onChange={e => setAssunto(e.target.value)}></Input>
                                <Label>DATA ELABORAÇÃO: </Label>
                                <Input type="date" name="data_elaboracao" value={datEmissao_comunicado} onChange={e => setData(e.target.value)}></Input>
                                <Label>EXECUTOR: </Label>
                                <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" value={executor_comunicado} onChange={e => setExecutor(e.target.value)}></Input>
                                <Label>AREA: </Label>
                                <Select name="setor_comunicado" onChange={e => setSetor(e.target.value)}>
                                    <option >{area_comunicado}</option>
                                    <option>Opção 1</option>
                                </Select>
                                <Label>OBSERVAÇÃO</Label>
                                <TextArea name="observacao_comunicado" cols="50 rows" rows="5" value={observacao_comunicado} onChange={e => setObservacao(e.target.value)}></TextArea>
                            </th>
                        </tr>
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Editar</ButtonCadastrar>
                    </DivButton>
                </form>
            </Container>
        </div>
    )
}