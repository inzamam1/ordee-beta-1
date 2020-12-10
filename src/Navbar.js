import React,{useState} from 'react'
import { Link } from "react-router-dom";
import './Navbar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Sidebardata } from './Sidebardata';
import {IconContext} from 'react-icons';


function Navbar() {
  const[sidebar,setSidebar] = useState(false);

  const showSidebar = () =>setSidebar(!sidebar);

    return (
      <IconContext.Provider value={{color: '#fff'}}>
        <nav className="navbar" >
          <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
            <ul className = 'nav-menu-items'>
              <li className='navbar-toggle'>
                <Link to ='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </Link>
              </li>
              {Sidebardata.map((item,index) =>{
                return(
                  <li key={index} className={item.cName}>
                      <Link to={item.path}>
                      {item.icom}
                      <span>{item.title}</span>
                      </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
           <Link to="/Login">
           <img 
             className="navicon" 
             src={"./ordee2.png"} 
             alt="" />
           </Link>
          
            <Link>
            <img
              className="user_icon"
              src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png"
              alt=""
              /*onClick={() => auth.signOut() */
            />
            </Link>
        </nav>
        </IconContext.Provider>
    );
}

export default Navbar
