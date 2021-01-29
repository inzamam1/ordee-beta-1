import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { Link } from "react-router-dom";
import './Navbar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Sidebardata } from './Sidebardata';
import {IconContext} from 'react-icons';


function Navbar({username}) {
  const[sidebar,setSidebar] = useState(false);
  const[name,setName]=useState('');
  
  const showSidebar = () =>setSidebar(!sidebar);

  useEffect(()=>{
    db.collection('Restaurant').doc(username.uid).onSnapshot(snapshot =>{
      setName(snapshot.data().Name)  
    })
  },[name]);

    const Delete_Card=(event)=>{
      db.collection("posts").doc()
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete(doc => doc.data().table);
        });
      });  
    }
  
    return (
      <div>
              <IconContext.Provider value={{color: '#fff'}}>
        <nav className="navbar" >
          <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
            <ul className = 'nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to ='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </Link>
              </li>
              {Sidebardata.map((item,index) =>{
                return(
                  <li key={index} className={item.cName}>
                      <Link to={item.path}>
                      {item.icon}
                      <span className="Sidebar_Name">{item.title}</span>
                      </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
           
           <img 
             className="navicon" 
             src={"./ordee2.png"} 
             alt="" 
             onClick={() => auth.signOut()}
             />
            
            <Link>
            <img
              className="user_icon"
              src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png"
              alt=""
              onClick={() => auth.signOut()}
            />
            <h6 className="username">{name}</h6>
            </Link> 
        </nav>
        </IconContext.Provider>
        </div>

    );
}

export default Navbar
