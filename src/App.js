import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Admin";
import LoginForm from "./LoginForm";
import Password_Reset from "./Password__reset";

function App() {
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Admin">
            <Admin />
          </Route>
          <Route path="/Password__Reset">
            <Password_Reset />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
