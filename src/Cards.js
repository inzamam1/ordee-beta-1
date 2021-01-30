import React, { useState, useEffect } from "react";
import Cardsflip from "./Cardsflip";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function Cards({ user }) {
  const [posts, setPosts] = useState([]);
  const [resty] = useStateValue();

  useEffect(() => {
    db.collection("Restaurant")
      .doc(user.uid)
      .collection(resty.rest)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="grid">
      {posts.map(({ card, id }) => {
        return (
          <Cardsflip table={card.table} id={card.id} index={id} user={user} />
        );
      })}
    </div>
  );
}

export default Cards;
