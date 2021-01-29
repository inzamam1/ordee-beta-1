import React,{useState} from 'react'
import Navbar from './Navbar'
import { db } from "./firebase";
import firebase from 'firebase';
import { Button } from "@material-ui/core";
import './Settings.css';
import {FaPlusCircle} from 'react-icons/fa';

function Settings({username}) {
  const [id,setId] = useState(1);
  const Add_Card=(event)=>{
    setId(id + 1)
    event.preventDefault();
    return db.collection('Restaurant').doc(username.uid).collection("tables").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      table:'Hey',
      id:id
    })
  }
    return (
        <div>
        <Navbar username={username} />
        <div className="add">
           <Button id="add_card" onClick={Add_Card}>
           <br></br> 
             <div className="add_icon"><FaPlusCircle /></div>
           </Button>
           </div>
        </div> 
        
    )
}

export default Settings