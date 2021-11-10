import React from 'react'
import { Header } from '../../header/header'
import { Body, Container, DivBotao, ButtonMenu } from './styles'
import { Link } from 'react-router-dom';


export const MenuGabCrh = () => {

    return (
        <div>
            <Header></Header>
            <Body>
                <Container>
                    <DivBotao>
                        <Link to="/ComunicadosGabCrh">
                            <ButtonMenu>COMUNICADOS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/DespachosGabCrh">
                            <ButtonMenu>DESPACHOS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/InformacoesGabCrh">
                            <ButtonMenu>INFORMAÇÕES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/InstrucoesGabCrh">
                            <ButtonMenu>INSTRUÇÕES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/MemorandoGabCrh">
                            <ButtonMenu>MEMORANDOS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/MemorandoCircularGabCrh">
                            <ButtonMenu>MEMORANDOS CIRCULARES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/OficiosGabCrh">
                            <ButtonMenu>OFICIOS </ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/OficiosCircularesGabCrh">
                            <ButtonMenu>OFICIOS CIRCULARES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/PortariaGabCrh">
                            <ButtonMenu>PORTARIAS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/RemessaGabCrh">
                            <ButtonMenu>REMESSAS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    
                </Container>
            </Body>
        </div>
    )
}