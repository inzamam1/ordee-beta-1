import React,{useState} from "react";
import Cardsflip from "./Cardsflip";
import {db} from "./firebase";


function Cards(){
    const[posts1,setPosts1] = useState([]);
    const[posts2,setPosts2] = useState([]);
    const[posts3,setPosts3] = useState([]);
    const[posts4,setPosts4] = useState([]);
    const[posts5,setPosts5] = useState([]);
    const[posts6,setPosts6] = useState([]);
    const[posts7,setPosts7] = useState([]);
    const[posts8,setPosts8] = useState([]);
    {
      db.collection('posts1').doc('1').onSnapshot((doc) =>{
        setPosts1(doc.data().table)
      });
  
        db.collection('posts2').doc('2').onSnapshot((doc) =>{
          setPosts2(doc.data().table)
        });
        db.collection('posts3').doc('3').onSnapshot((doc) =>{
          setPosts3(doc.data().table)
        });
  
        db.collection('posts4').doc('4').onSnapshot((doc) =>{
          setPosts4(doc.data().table)
        });
        db.collection('posts5').doc('5').onSnapshot((doc) =>{
          setPosts5(doc.data().table)
        });
        db.collection('posts6').doc('6').onSnapshot((doc) =>{
          setPosts6(doc.data().table)
        });
        db.collection('posts7').doc('7').onSnapshot((doc) =>{
          setPosts7(doc.data().table)
        });
        db.collection('posts8').doc('8').onSnapshot((doc) =>{
          setPosts8(doc.data().table)
        });
    }
 
  const cardInfo = [
    {
      title: 'Table 1',
      text: posts1,
    },
    {
      title: "Table 2",
      text: posts2,
    },
    {
      title: "Table 3",
      text: posts3,
    },
    {
        title: "Table 4",
        text: posts4,
      },
      {
        title: "Table 5",
        text: posts5,
      },
      {
        title: "Table 6",
        text: posts6,
      },
      {
        title: "Table 7",
        text: posts7,
      },
      {
        title: "Table 8",
        text: posts8,
      },
    ];
  
    return <div className="grid">
        {cardInfo.map((card,index) => {
               return<Cardsflip key={index} card={card} />
        })
    }
    </div>
  };
  
  export default Cards;