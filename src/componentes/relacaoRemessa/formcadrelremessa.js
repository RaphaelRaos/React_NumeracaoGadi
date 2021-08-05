import React from 'react'
import { Header } from '../header/header';
import { Container, DivButton, ButtonCadastrar, TextArea, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, Label, Input, Select, Coluna1, Coluna } from './styles';
import { Link } from 'react-router-dom';

export const FormCadRelRemessa = () => {

    return (
        <div>
            <Header />
            <Container>
                <ConteudoTitulo>
                    <Titulo>CADASTRO DE RELAÇÃO DE REMESSAS</Titulo>
                    <BotaoAcao>
                        <Link to = "/RelRemessa">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                <TableForm>                   
                        <tr>
                            <Coluna>
                                <Label>NUMERO SISRAD / PROCESSO </Label>
                                <Input type="" placeholder="Numero Processo / Sisrad" name="processo_remessa"></Input>
                                <Label>UNIDADE </Label>
                                <Select>
                                    <option value="#">Selecione</option>
                                </Select>
                                <Label>COORDENADORIA</Label>
                                    <Select>
                                        <option value="#">Selecione</option>
                                    </Select>
                                    <Label>INTERESSADO </Label>
                                <Input type="text" placeholder="Interessado" name="interessado_remessa"></Input>
                                <Label>ASSUNTO</Label>
                                    <Input type="text" placeholder="Assunto Remessa" name="assunto_remessa"></Input>                                           
                            </Coluna>                     
                            <Coluna1>                            
                                <Label>DATA DE EMISSÃO</Label>
                                    <Input type="date"></Input>
                                <Label>EXECUTOR</Label>
                                    <Input type="text" placeholder="Executor" name="executor_remessa"></Input>
                                    <Label>AREA</Label> 
                                <Select>
                                    <option value="#">Selecione</option>
                                </Select>
                                <Label>OBSERVAÇÃO</Label>
                                <TextArea name = "observacao_remessa" cols = "50 rows" rows = "5" id=""></TextArea>
                            </Coluna1>
                        </tr>                   
                 </TableForm>
                <DivButton>
                    <br></br>
                    <ButtonCadastrar type="submit">Cadastrar</ButtonCadastrar>
                </DivButton>
                </Container>
        </div>
    )
}