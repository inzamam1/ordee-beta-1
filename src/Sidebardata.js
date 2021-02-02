import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as ImIcons from 'react-icons/im';
import * as BiIcons from 'react-icons/bi';

export const Sidebardata=[
    {
        title: 'Home',
        path:'/',
        icon:<AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path:'/Settings',
        icon:<RiIcons.RiSettings2Fill />,
        cName: 'nav-text'
    },
    {
        title: 'Account',
        path:'/Profile',
        icon:<ImIcons.ImUser />,
        cName: 'nav-text'
    },
    {
        title: 'Support',
        path:'/Support',
        icon:<BiIcons.BiSupport />,
        cName: 'nav-text'
    },
]