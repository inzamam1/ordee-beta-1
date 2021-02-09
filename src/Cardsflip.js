import React, { useState, useEffect } from "react";
import "./Cards.css";
import { db } from "./firebase";
import Timer from "./Timer";
import { useStateValue } from "./StateProvider";

function Cardflip({ id, table, index, user }) {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const [interv, setInterv] = useState();
  const [resty] = useStateValue();
  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m;

  const run = () => {
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ m: updatedM, s: updatedS });
  };
  const reset = () => {
    clearInterval(interv);
    setTime({ m: 0, s: 0 });
  };

  const deletes = () => {
    db.collection("Restaurant")
      .doc(user.uid)
      .collection(resty.rest)
      .doc(index)
      .update("table", "");
  };

  if (table === "bill" || table === "hey can i get the bill") {
    return (
      <img
        className="card"
        src={"./bill1.jpg"}
        alt=""
        onClick={() => {
          if (window.confirm("Are you sure you want to remove?")) {
            reset();
            deletes();
          }
        }}
      />
    );
  } else if (table === "waiter") {
    return (
      <img
        className="card"
        src={"./waiter1.jpg"}
        alt=""
        onClick={() => {
          if (window.confirm("Are you sure you want to remove?")) {
            reset();
            deletes();
          }
        }}
      />
    );
  }

  return (
    <div>
      <div
        className={`card ${table.length > 0 ? "flip" : ""}`}
        onClick={() => {
          if (window.confirm("Are you sure you want to remove?")) {
            reset();
            deletes();
          }
        }}
      >
        <div className="front">
          <h3>Table{id} </h3>
        </div>
        <div className="back">
          <h3>{id}</h3>
          {table}
        </div>
      </div>
    </div>
  );
}

export default Cardflip;
