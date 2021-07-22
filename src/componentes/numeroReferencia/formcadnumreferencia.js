import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select } from './styles';
import { Link } from 'react-router-dom';

export const FormCadNumRef = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE NÚMERO DE REFERÊNCIAS</Titulo>
                    <BotaoAcao>
                        <Link to = "/NumReferencia">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <TableForm>
                    <th>
                        <Label>NÚMERO PROCESSO / SPDOC / SEM PAPEL</Label>
                            <Input type="text" placeholder="Número Processo" name="numero_processo"></Input>
                        <Label>UNIDADE ADMINISTRATIVA</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>COORDENADORIA</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>INTERESSADO</Label>
                            <Input type="text" placeholder="Interessado" name="interessado_processo"></Input>
                        <Label>ASSUNTO</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>DATA ENTRADA</Label>
                            <Input type="date"></Input>
                        <Label>DATA SAIDA</Label>
                            <Input type="date"></Input>
                        <Label>EXECUTOR</Label>
                            <Input type="text" placeholder="Executor" name="executor_processo"></Input>
                    </th>
                    <th>
                        <Label>UNIDADE DE POSSE</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>SITUAÇÃO</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>ANDAMENTO DO PROCESSO</Label>
                            <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>OCORRÊNCIAS</Label>
                            <Input type="text" placeholder="Ocorrências " name="ocorrencias_processo"></Input>
                        <Label>DATA DA VIGÊNCIA</Label>
                            <Input type="date"></Input>
                        <Label>STATUS</Label>
                        <Select>
                                <option value="#">Selecione</option>
                            </Select>
                        <Label>OBSERVAÇÃO</Label>
                            <TextArea name = "observacao_comunicado" cols = "50 rows" rows = "5" id=""></TextArea>
                    </th>
                </TableForm>
                <DivButton>
                    <br></br>
                        <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                    <br></br>
                    <br></br>
                </DivButton>
                </Container>
        </div>
    )
}