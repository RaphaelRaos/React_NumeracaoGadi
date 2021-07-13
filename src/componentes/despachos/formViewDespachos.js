import React, { useEffect, useState } from 'react';
import { Container, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess} from './styles';
import { Header } from '../header/header';
import {Link} from 'react-router-dom';

export const FormViewDespachos = (props) => {

    const [id] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getDespachos = async() => {
            await fetch("http://localhost/dashboard/sistemaNumeracao/despachos/visualizar_despachos.php?id="+ id)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.despachos);
            })
        }
        getDespachos();
    },[id]);
    return (
       <div>
            <Header/>
            <Container>
                <ConteudoTitulo>
                    <Link to="/menu">
                            <ButtonSuccess>Menu</ButtonSuccess>
                    </Link>
                    <Titulo>VISUALIZAR DESPACHOS</Titulo>
                    <BotaoAcao>                            
                        <Link to="/despachos">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>                        
                    </BotaoAcao>
                </ConteudoTitulo>              
            </Container>
        </div> 
    );
}