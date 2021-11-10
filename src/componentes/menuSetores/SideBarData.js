import React from "react";
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as FcSupport from 'react-icons/fc'
import'./Navbar.css'


export const SideBarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    
    {
        title: 'G.Coordenador',
        path: '/MenuGabCrh',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title: 'Gadi',
        path: '/menu',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    }, 
    {
        title: 'Suporte',
        path: '/menu',
        icon: <FcSupport.FcSupport/>,
        cName: 'nav-text'
    },     
]