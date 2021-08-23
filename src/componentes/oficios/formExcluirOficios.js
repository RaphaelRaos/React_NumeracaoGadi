import React, { useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
import { Container, DivButton, ButtonCadastrar, Titulo, ConteudoTitulo, BotaoAcao, ButtonSuccess, TableForm, AlertDanger, AlertSuccess, ConteudoOficio} from './styles';


export const FormExcluirOficio = (props) => {

    const [id_oficio] = useState(props.match.params.id);
    const [data, setData] = useState([]);
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const excluirOficio = async e => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_EXCLUIR_OFICIOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id_oficio})
        }).then((response) => response.json())
        .then((responseJson)=>{
            if(responseJson.erro){
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.mensagem
                });
            }else {
                setStatus({
                  type: 'success',
                  mensagem: responseJson.mensagem
                });
              }
            }).catch(() => {
              setStatus({
                type: 'erro',
                mensagem: "Ofício não excluído, tente mais tarde!(Erro 1-F)!!"
              });
            });
    }

    useEffect(() => {
        const getOficio = async() => {
            await fetch(process.env.REACT_APP_VISUALIZAR_OFICIOS + id_oficio)
            .then((response) => response.json())
            .then((responseJson) => {
               setData (responseJson.mensagem);
            })
        }
        getOficio();
    },[id_oficio]);


    return (
        <div>
           <Header/>
            <Container>
               <ConteudoTitulo>
                    <Titulo>EXCLUIR DESPACHOS</Titulo>
                    <BotaoAcao>
                        <Link to="/oficios">
                            <ButtonSuccess>Index</ButtonSuccess>
                        </Link>
                    </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={excluirOficio}>
                    <TableForm>
                        <tbody>
                            <tr>
                                <th> 
                                <ConteudoOficio> NÚMERO OFÍCIO: {data.numero_oficio} </ConteudoOficio>
                                <ConteudoOficio> INTERESSADO : {data.interessado_oficio} </ConteudoOficio>
                                <ConteudoOficio> ASSUNTO : {data.assunto_oficio} </ConteudoOficio>
                                <ConteudoOficio> DATA EMISSÃO : {data.datEmissao_oficio} </ConteudoOficio>
                                <ConteudoOficio> EXECUTOR : {data.executor_oficio} </ConteudoOficio>
                                <ConteudoOficio> SETOR : {data.setor_oficio} </ConteudoOficio>
                                <ConteudoOficio> OBSERVAÇÃO : {data.observacao_oficio} </ConteudoOficio>                              
                                </th>
                            </tr>                               
                        </tbody>   
                    </TableForm>
                    <DivButton>
                        <br></br>
                        <ButtonCadastrar type="submit">Excluir</ButtonCadastrar>
                    </DivButton>
                </form>

            </Container>
        </div>
    )
}