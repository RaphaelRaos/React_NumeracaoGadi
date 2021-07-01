import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select } from './styles';
import { Link } from 'react-router-dom';

export const FormCadDespacho = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to = "/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <TableForm>
                    <th>
                        <Label>NUMERO SISRAD/PROCESSOR</Label>
                            <Input type="text" placeholder="Numero Sisrad / Processo" name="numero_processo"></Input>
                        <Label>UNIDADE ADMINISTRATIVA</Label>
                            <Select>
                                <option value="#" name="unidade_despacho">Selecione</option>   
                            </Select>
                        <Label>COORDENADORIA</Label>
                            <Select>
                                <option value="#" name="coord_despacho">Selecione</option>   
                            </Select>
                        <Label>INTERESSADO</Label>
                            <Input type="text" placeholder="Interessado" name="interessado_despacho"></Input>
                        <Label>ASSUNTO</Label>
                            <Input type="text" placeholder="Assunto Despacho" name="assunto_despacho"></Input>
                    </th>
                    <th>
                        <Label>DATA ENTRADA</Label>
                            <Input type="date" placeholder="" name="data_entrada"></Input>
                        <Label>DATA SAÍDA</Label>
                            <Input type="date" placeholder="" name="data_saida"></Input>
                        <Label>EXECUTOR</Label>
                            <Input type="text" placeholder="Interessado" name ="executor_despacho"></Input>
                        <Label>SETOR</Label>
                            <Select>
                                <option value="#" name="unidade_despacho">Selecione</option>   
                            </Select>
                        <Label>OBSERVAÇAO</Label>
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