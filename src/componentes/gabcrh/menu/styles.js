import styled from "styled-components";

export const Body = styled.div`
    background-image: radial-gradient(circle, rgba(255,0,0,0), rgb(48, 118, 250));
    display: flex;
    justify-content:center;
    
    
`;

export const Container = styled.div`
    margin-top:20px;
    display: flex;
    height: 100vh;
    width: 120vh;
    flex-wrap: wrap;
    justify-content: center;
    align-content:flex-start;
    align-items:center;

`;
export const DivBotao = styled.div`    
    
    display:flex;
    justify-content:center;
    align-items:center; 
    margin: 2px;  
`;

export const ButtonMenu = styled.button`
    width: 360px;
    height: 120px;
    background-color: #014d87;
    color: #fff;
    font-family: 'Russo One', sans-serif;
    font-size: 25px;
    border-radius: 5px;
    cursor: pointer; 
    
    @media(max-width: 1200px) {
        width: 240px;
        height: 80px;
        font-size: 15px;        
    }
   
`;



