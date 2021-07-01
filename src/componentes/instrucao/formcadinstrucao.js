import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select } from './styles';
import { Link } from 'react-router-dom';

export const FormCadInstrucao = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE INSTRUÇÕES</Titulo>
                    <BotaoAcao>
                        <Link to="/instrucoes">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <TableForm>
                    <th>
                        <Label>INTERESSADO</Label>
                            <Input type="text" placeholder="Interessado Instrução" name="interessado_instrucao"></Input>
                        <Label>ASSUNTO</Label>
                            <Input type="text" placeholder="Assunto da Instrução" name="assunto_instrucao"></Input>
                        <Label>DATA EMISSÃO</Label>
                            <Input type="date" name="data_instrucao"></Input>
                        <Label>EXECUTOR</Label>
                            <Input type="text" placeholder="Executor Instrução" name="executor_instrucao"></Input>
                        <Label>SETOR</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>OBSERVAÇÃO</Label>
                            <TextArea name = "observacao_despacho" cols = "50 rows" rows = "5" id=""></TextArea>
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