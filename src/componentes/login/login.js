import React, {useState} from 'react'
import { AlertDanger, AlertSuccess} from '../gadi/oficios/styles'
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { HeaderLogin } from '../header/headerLogin';

export const Login = () => {

    let history = useHistory();

    const [login, setLogin] = useState({
        nome_usuario: "",
        senha_usuario: "",    
    
    });

    
    const valorInput = e => setLogin({...login,[e.target.name]: e.target.value});

    const [status,setStatus] = useState({
        type: '', 
        mensagem: ''
    })

    var body = document.querySelector("body");    

   const clickLogar=()=>{
      return body.className = "sign-in-js"
   }
   const clickCadastrar=()=>{
       return body.className = "sign-up-js"
   }

       
    const loginUser = async e  => {

        e.preventDefault();
        await fetch(process.env.REACT_APP_LOGIN, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({login})
        })        
        .then((response) =>response.json())
        .then((responseJson) =>{           
            if(responseJson.erro){
                setStatus({
                    type: 'erro',
                    mensagem:responseJson.mensagem                    
                    
                });
            } else {
                alert ("BEM VINDO AO SISTEMA DE NUMERAÇÃO")
                history.push("/menu");
            }
        });                     
    }

    return (
    <div>    
       <HeaderLogin/>
        <div className="container">
            <div className="content first-content">
                <div className="first-column">
                    <h2 className="title title-primary">Já possuo Login!</h2>
                    <p className="description description-primary">Para utilizar o sistema, realize o login. </p>
                    <Link to="#"><button id="signin" className="btn btn-primary" onClick={()=>clickLogar()}>LOGAR</button></Link>
                </div>
                <div className="second-column">
                    <h2 className="title title-second">Criar uma conta!</h2>
                    <p className="description description-second">Utilize seu e-mail para registrar-se.</p>
                    <form className="form">
                        <label className="label-input">
                            <input type="text" placeholder="Usuário de Rede"></input>
                        </label>
                        <label className="label-input">
                            <input type="text" placeholder="E-mail"></input>
                        </label>
                        <label className="label-input">
                            <input type="password" placeholder="Senha"></input>
                        </label>
                        <button className="btn btn-second">Cadastrar</button>
                    </form>
                </div>
            </div>
            <div className="content second-content">
                <div className="first-column">
                    <h2 className="title title-primary">Bem Vindo</h2>
                    <p className="description description-primary">Sistema de Numeração de Referência</p>
                    <p className="description description-primary">Cadastro de Novos Usuários</p>
                    <button id="signup" className="btn btn-primary"onClick={()=>clickCadastrar()}>Cadastrar</button>
                </div>
                <div className="second-column">
                    <h2 className="title title-second">Já sou Cadastrado!</h2>
                    <p className="description"> Realize o login com o seu usuário de Rede Cadastrado </p>
                    {status.type === 'erro'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                    {status.type === 'success'? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
                    <form className="form" onSubmit={loginUser}>
                        <label className="label-input">
                            <input type="text" placeholder="Usuário de Rede" id="usuario_login" name="nome_usuario" onChange={valorInput} ></input>
                        </label>
                        <label className="label-input">
                            <input type="password" placeholder="Senha" id="senha_login" name="senha_usuario" onChange={valorInput}></input>
                        </label>
                        
                        <Link to="#" className="password" id="recuperarsenha">Esqueci a Senha</Link>
                        
                       <button className="btn btn-second" id="btn-second" type="submit" >Acessar</button>
                       
                    </form>
                </div>
            </div>
         

        </div>
    </div>

     
    )
    
}