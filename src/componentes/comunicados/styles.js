import styled from "styled-components";


export const Container = styled.section`
    
    position: fixed;
    left: 1em;
    width: 95%;
    height: 90%;
    list-style-type: none;
    margin: 50;
    padding: 0;
    background: #f7f7f7;
    z-index:10;  
    overflow:hidden;
    box-shadow: 2px 0 18px rgba(0, 0, 0, 0.26);
    overflow:auto;
`;

export const Table = styled.table `

    width: 99%;
    th{
        background-color: rgb(8, 63, 165);
        color: #fff;
        padding: 10px;
    }
    td{
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 8px;
    }
`;

export const Titulo = styled.h2`

    color: rgb(8, 63, 165);
    font-size: 30px;
    text-align: center;
    padding: 0 0 0 100px;

`;

export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;    
`;

export const BotaoAcao = styled.section`
    margin: 25px 0px;
    padding 0px 100px 0px 0px; 
        
`;

export const ButtonSuccess = styled.button`
    background-color: #fff;
    color: rgb(8, 63, 165);
    padding: 8px 12px ;
    border: 1px solid rgb(8, 63, 165);
    border-radius: 4px;
    cursor:pointer;
    font-size: 18px;
    :hover{
        background-color: rgb(8, 63, 165);
        color: #fff;
    }
`;

export const LineTD = styled.td`
    border 2px solid rgb(8, 63, 165);
    text-align: center;
    width: 9%;
`;

export const ButtonPrimary = styled.button`
    background-color: #fff;
    color: rgb(8, 63, 165);
    padding: 5px 4px;
    border: 1px solid rgb(8, 63, 165);
    cursor:pointer;
    font-size: 16px;
    :hover{
        background-color: rgb(8, 63, 165);
        color: #fff;
    }
`;

export const TableForm = styled.table`

    width: 99%;
    height: 70%;
    th{
        height: 100%;
        background-color: #fff;
        color: rgb(8, 63, 165);
        padding: 20px;
        text-align: left;
        margin: 3px;
        
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: boder-box;
    margin-top: 6px;
    margin-bottom: 10px;
    font-size: 18px;
    resize:vertical;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: boder-box;
    margin-top: 6px;
    margin-bottom: 8px;
    font-size: 16px;
    resize:vertical;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 16px;
    font-size: 18px;
`;

export const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: boder-box;
    margin-top: 5px;
    margin-bottom: 8px;
    font-size: 18px;
    resize:vertical;
`;

export const ButtonCadastrar = styled.button`
    background-color: #fff;
    color: rgb(8, 63, 165);
    padding: 10px 20px;
    border: 1px solid rgb(8, 63, 165);;
    border-radius: 4px;
    cursor:pointer;
    font-size: 20px;
    :hover{
        background-color: rgb(8, 63, 165);;
        color: #fff;
    }
`;
export const DivButton = styled.div`
    
    text-align: center;
    left: 16em;
    width: 85%;    

`;
export const AlertSuccess = styled.p`
   background-color: #d1e7dd;
   color: #0f5132;
   margin: 20px 0;
   border: 1px solid #badbcc;
   border-radius: 4px;
   padding: 7px;
`;

export const AlertDanger = styled.p`
   background-color: #f8d7da;
   color: #842029;
   margin: 20px 0;
   border: 1px solid #f5c2c7;
   border-radius: 4px;
   padding: 7px;
`;