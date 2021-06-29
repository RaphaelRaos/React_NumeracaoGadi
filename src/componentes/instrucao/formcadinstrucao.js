import React from 'react'
import { Header } from '../header/header';
import { Container, Table, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, LineTD, ButtonPrimary, TableForm, Label, Input, Select } from './styles';
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
                        <Label>ASSUNTO: </Label>
                            <Input type="text" name="assunto_comunicado" placeholder="Assunto"></Input>
                        <Label>DATA ELABORAÇÃO: </Label>
                            <Input type="date" name="data_elaboracao"></Input>
                        <Label>EXECUTOR: </Label>
                            <Input type="text" name="executor_comunicado"></Input>
                        <Label>AREA: </Label>
                            <Select name = "setor_comunicado">
                                <option value="#">Selecione</option>
                                
                            </Select>
                        <Label>OBSERVAÇÃO</Label>
                        <TextArea name = "observacao_comunicado" cols = "50 rows" rows = "5" id=""></TextArea>
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