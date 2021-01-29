import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import firebase from "firebase";
import "./LoginForm.css";
import { Link, Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";
import Support from "./Support";
import Password__Strength from "./Password__Strength";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const Login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };
  const SignUp = (event) => {
    if (password === password1) {
      event.preventDefault();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          return db.collection("Restaurant").doc(cred.user.uid).set({
            Name: username,
            Phone: phone,
            Email: email,
            Address1: "",
            Address2: "",
            State: "",
            Country: "",
            PostalCode: "",
          });
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Password did not match!");
    }
  };

  const google = (event) => {
    event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        return db.collection("Restaurant").doc(result.user.uid).set({
          Name: user.displayName,
          Phone: "",
          Email: user.email,
          Address1: "",
          Address2: "",
          State: "",
          Country: "",
          PostalCode: "",
        });
      })
      .catch((error) => alert(error.message));
  };
  const signUpButton = () => {
    document.getElementById("container").classList.add("right-panel-active");
  };

  const signInButton = () => {
    document.getElementById("container").classList.remove("right-panel-active");
  };

  return (
    <div>
      {user ? (
        user.email === "a@g.com" ? (
          <Redirect to="/Admin" />
        ) : (
          <div>
            <Route path="/" exact component={Home}>
              <Home user={user} username={user} />
            </Route>
            <Route path="/Settings" component={Settings}>
              <Settings username={user} />
            </Route>
            <Route path="/Profile" component={Profile}>
              <Profile user1={user} />
            </Route>
            <Route path="/Support" component={Support}>
              <Support username={user} />
            </Route>
          </div>
        )
      ) : (
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>

              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Retype Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <Password__Strength password={password} />
              <button onClick={SignUp}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a>
                <Link to="/Password__Reset">Forgot your password?</Link>
              </a>
              <button onClick={Login}>Sign in</button>
              <br></br>
              <br></br>
              <div className="soical">
                <ul class="social">
                  <li class="social">
                    <button id="google" onClick={google}></button>
                    <a href="#">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span class="fa fa-google"></span>
                    </a>
                  </li>
                  <li class="social">
                    <a href="#">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span class="fa fa-facebook"></span>
                    </a>
                  </li>
                  <li class="social">
                    <a href="#">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span class="fa fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your details</p>
                <button className="ghost" id="signIn" onClick={signInButton}>
                  {/*check for id here as refreshing the page does not support animation and displays error */}
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello,</h1>
                <p>Enter your personal details and get on board with us</p>
                <button className="ghost" id="container" onClick={signUpButton}>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LoginForm;
