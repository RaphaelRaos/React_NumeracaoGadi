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
                        <Link to="/menu">
                            <ButtonMenu>DESPACHOS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>INFORMAÇÕES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>INSTRUÇÕES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>MEMORANDOS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>MEMORANDOS CIRCULARES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>OFICIOS </ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>OFICIOS CIRCULARES</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>PORTARIAS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    <DivBotao>
                        <Link to="/menu">
                            <ButtonMenu>REMESSAS</ButtonMenu>
                        </Link>
                    </DivBotao>
                    
                </Container>
            </Body>
        </div>
    )
}