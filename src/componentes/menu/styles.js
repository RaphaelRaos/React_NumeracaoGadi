import styled from 'styled-components';


export const Body = styled.div`
background-image: radial-gradient(circle, rgba(255,0,0,0), rgb(48, 118, 250));
`; 
export const Container = styled.div`    
    
    
    height: 100vh;
    align-items: center;
    justify-content: center; 
    position: relative;    

`;

export const DivMenu = styled.div`
        
    text-align: center;    
    height: 130px;       
    
    @media(max-width: 1200px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center; 
        position: relative; 
    }
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