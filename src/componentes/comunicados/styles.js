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
    width: 9%
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