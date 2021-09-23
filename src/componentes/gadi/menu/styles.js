import styled from 'styled-components';


export const Body = styled.div`
background-image: radial-gradient(circle, rgba(255,0,0,0), rgb(48, 118, 250));
align-items: center;


`; 

export const Container = styled.div`   
    
    height: 100vh;
    display: flex;
    justify-content:center;
    

`;

export const BotaoMenu = styled.button`
    
    background-color: #014d87;
    width: 360px;
    height: 120px;
    border-radius: 5px;
    font-family: 'Russo One', sans-serif;
    font-size: 25px;
    cursor: pointer;
    color: #fff;
    
    @media(max-width: 1200px) {
        width: 240px;
        height: 80px;
        font-size: 15px;        
    }
    
`;

export const Main = styled.main`
    
    
`;

export const Table = styled.table`

`;

export const TBODY = styled.tbody`

`;

export const TR = styled.tr`

`;

export const TD = styled.td`

`;
