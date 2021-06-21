import React from 'react'
import {Link} from 'react-router-dom'
import { Header } from '../header/header';


export const Login = () => {
    var body = document.querySelector("body");    

   const clickLogar=()=>{
      return body.className = "sign-in-js"
   }
   const clickCadastrar=()=>{
       return body.className = "sign-up-js"
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
                    <form className="form">
                        <label className="label-input" for="">
                            <input type="text" placeholder="Usuário de Rede" id="usuario_login" name="username"></input>
                        </label>
                        <label className="label-input" for="">
                            <input type="password" placeholder="Senha" id="senha_login" name="password"></input>
                        </label>
                        
                        <Link className="password" id="recuperarsenha">Esqueci a Senha</Link>
                        <Link to="/Menu"><button className="btn btn-second" id="btn-second">Acessar</button></Link>
                    </form>
                </div>
            </div>
         

        </div>
    </div>

     
    )
    
}