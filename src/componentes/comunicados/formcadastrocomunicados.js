import React, { useState, useEffect } from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, AlertDanger, AlertSuccess, Tr, LineCadastro } from './styles';
import { Link } from 'react-router-dom';

export const FormCadComunicado = () => {

  const [comunicado, setComunicado] = useState({
    assunto_comunicado: "",
    data_elaboracao: "",
    executor_comunicado: "",
    setor_comunicado: "",
    observacao_comunicado: ""
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })
  const [nomenclaturaSetor, setSetor] = useState([]);

  const valorInput = e => setComunicado({ ...comunicado, [e.target.name]: e.target.value });

  const cadComunicados = async e => { // conexão com a api     

    e.preventDefault();

    await fetch(process.env.REACT_APP_CADASTRAR_COMUNICADO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comunicado })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
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
  
  const setores = async () => {
    await fetch(process.env.REACT_APP_VISUALIZAR_SETOR)
      .then((response) => response.json())
      .then((responseJson) => {
        setSetor(responseJson.registro_setor);
      })
  }

  useEffect(() => {
    setores();
  }, [])

  return (
    <div>
      <Header />
      <Container>
        <ConteudoTitulo>
          <Titulo>CADASTRO DE COMUNICADOS</Titulo>
          <BotaoAcao>
            <Link to="/comunicados">
              <ButtonSuccess>Index</ButtonSuccess>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
        {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
        <form onSubmit={cadComunicados}>
          <TableForm >
            <tbody>
              <Tr>
                <LineCadastro>
                  <Label>ASSUNTO: </Label>
                  <Input type="text" name="assunto_comunicado" placeholder="Assunto" onChange={valorInput} required></Input>
                  <Label>DATA ELABORAÇÃO: </Label>
                  <Input type="date" name="data_elaboracao" onChange={valorInput} required></Input>
                  <Label>EXECUTOR: </Label>
                  <Input type="text" name="executor_comunicado" placeholder="Executor Comunicado" onChange={valorInput} required></Input>
                  <Label>AREA: </Label>
                  <Select onChange={valorInput} name="posse_referencia" required>
                    <option value="">Selecione</option>
                    {Object.values(nomenclaturaSetor).map(setor => (
                      <option key={setor.id_area}>{setor.area}</option>
                    ))}
                  </Select>
                  <Label>OBSERVAÇÃO</Label>
                  <TextArea name="observacao_comunicado" cols="50 rows" rows="5" onChange={valorInput}></TextArea>
                </LineCadastro>
              </Tr>
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