import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select } from './styles';
import { Link } from 'react-router-dom';

export const FormCadRelatorios = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE RELATÓRIOS</Titulo>
                    <BotaoAcao>
                        <Link to = "/Relatorios">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <TableForm>
                    <th>
                        <Label>SOLICITANTE </Label>
                            <Input type="text" placeholder="Solicitante Relatório" name="solicitante_relatorio"></Input>
                        <Label>ASSUNTO </Label>
                            <Input type="text" placeholder="Assunto Relatorio" name="assunto_relatorios"></Input>
                        <Label>DATA EMISSÃO</Label>
                            <Input type="date"></Input>
                        <Label>EXECUTOR</Label>
                            <Input type="text" placeholder="Executor" name="executor_relatorio"></Input>
                        <Label>AREA</Label>
                        <Select>
                            <option value="#">Selecione</option>
                        </Select>
                        <Label>OBSERVAÇÃO</Label>
                        <TextArea name = "observacao_relatorios" cols = "50 rows" rows = "5" id=""></TextArea>
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