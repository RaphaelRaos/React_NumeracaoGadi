import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select } from './styles';
import { Link } from 'react-router-dom';

export const FormCadMemorando = () => {

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
                <TableForm>
                    <th>
                        <Label>INTERESSADO</Label>
                            <Input type="text" placeholder="Interessado" name="interessado_memorando"></Input>
                        <Label>ASSUNTO</Label>
                            <Input type="text" placeholder="Assunto Memorando" name="assunto_memorando"></Input>
                        <Label>DATA EMISSÃO</Label>
                            <Input type="date"></Input>
                        <Label>EXECUTOR</Label>
                            <Input type="text" placeholder="Executor" name="executor_memorando"></Input>
                        <Label>ÁREA</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>                     
                        <Label>OBSERVAÇÃO</Label>
                            <TextArea name = "observacao_memorando" cols = "50 rows" rows = "5" id=""></TextArea>
                    </th>
                </TableForm>
                <DivButton>
                    <br></br>
                    <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                </DivButton>
                </Container>
        </div>
    )
}