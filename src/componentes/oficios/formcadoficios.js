import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select } from './styles';
import { Link } from 'react-router-dom';

export const FormCadOficios = () => {

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
                <TableForm>
                    <th>
                        <Label>INTERESSADO</Label>
                            <Input type="text" placeholder="Interessado" name="interessado_oficios"></Input>
                        <Label>ASSUNTO</Label>
                            <Input type="text" placeholder="Assunto" name="assunto_oficio"></Input>  
                        <Label>DATA EMISSÃO</Label>
                            <Input type="date"></Input>
                        <Label>EXECUTOR</Label>
                         <Input type="text" placeholder="Executor" name="executor_oficio"></Input>
                        <Label>ÁREA</Label>
                            <Select>
                                <option value="#">SELECIONE</option>
                            </Select>
                        <Label>OBSERVAÇÃO</Label>
                            <TextArea name = "observacao_oficio" cols = "50 rows" rows = "5" id=""></TextArea>
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