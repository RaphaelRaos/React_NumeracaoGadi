import React, {useState} from 'react';
import {FormPesquisa, InputPesquisa } from './styles';



export const Pesquisa = async () => { 


    const [referencia, setReferencia] = useState({
        pesquisa: null,
    });    
    
    const valorInput = e => setReferencia({...referencia,[e.target.name]: e.target.value});   
    
    const cadPesquisa = async e => {
    
        e.preventDefault();
   
        
        await fetch("http://localhost/dashboard/sistemaNumeracao/num_referencia/newListar_referencia.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({referencia})
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(referencia)
                });
    }              
    
    return (
        <FormPesquisa onSubmit={cadPesquisa}>           
            <InputPesquisa type="text" name="pesquisa" onChange={valorInput}></InputPesquisa> 
                <button type="submit">PESQUISAR</button>         
        </FormPesquisa>
    )
    

}