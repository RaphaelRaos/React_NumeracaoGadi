import React from 'react'
import { MenuVert } from '../menuSetores/menuVert'

export const Header = () => {

    return (        
        <div>
            <div className="App">
                <div className="App-header"> 
                    <MenuVert />                                
                    <h3>SISTEMA DE NUMERAÇÃO</h3>                    
                    <div></div>
                </div>      
            </div>
        </div>
    )
}