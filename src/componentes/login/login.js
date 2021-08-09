import React, {useState} from 'react'
import { AlertDanger, AlertSuccess} from '../oficios/styles'
import {Link} from 'react-router-dom';
import { Header } from '../header/header';

export const Login = () => {


    const [login, setLogin] = useState({
        nome_usuario: null,
        senha_usuario: null,    
    
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
        await fetch("http://localhost/dashboard/sistemaNumeracao/login/logar_sistema.php", {
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
                
                alert("BEN VENIDO A NUEVO SISTEMA DE NUMERACION")
            }
        }).catch(() => {
            setStatus({
                type: 'erro',
                mensagem:"OFÍCIO NÃO CADASTRADO - CONTATE O ADMINISTRADOR DO SISTEMA - (ERRO 1-F)"
            });
        });                     
    }

    return (
    <div>    
       <Header/>
        <div className="container">
            <div className="content first-content">
                <div className="first-column">
                    <h2 className="title title-primary">Já possuo Login!</h2>
                    <p className="description description-primary">Para utilizar o sistema, realize o login. </p>
                    <Link><button id="signin" className="btn btn-primary" onClick={()=>clickLogar()}>LOGAR</button></Link>
                </div>
                <div className="second-column">
                    <h2 className="title title-second">Criar uma conta!</h2>
                    <p className="description description-second">Utilize seu e-mail para registrar-se.</p>
                    <form className="form">
                        <label className="label-input" for="">
                            <input type="text" placeholder="Usuário de Rede"></input>
                        </label>
                        <label className="label-input" for="">
                            <input type="text" placeholder="E-mail"></input>
                        </label>
                        <label className="label-input" for="">
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
                        <label className="label-input" for="">
                            <input type="text" placeholder="Usuário de Rede" id="usuario_login" name="nome_usuario" onChange={valorInput} ></input>
                        </label>
                        <label className="label-input" for="">
                            <input type="password" placeholder="Senha" id="senha_login" name="senha_usuario" onChange={valorInput}></input>
                        </label>
                        
                        <Link className="password" id="recuperarsenha">Esqueci a Senha</Link>
                        <Link to={"/menu"}>
                       <button className="btn btn-second" id="btn-second" type="submit">Acessar</button>
                       </Link>
                    </form>
                </div>
            </div>
         

        </div>
    </div>

     
    )
    
}