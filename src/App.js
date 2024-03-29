import "./app.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { LoginContext } from "./contexts/LoginContext";
import Home from "./pages/home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import Questions from "./pages/questions/Questions";
import Chat from "./pages/Chat/Chat";
import Profile from "./pages/Profile/Profile";
import io from "socket.io-client";
import useIsLoggedIn from "./useIsLoggedIn";
const socket = io.connect("https://quizo-api.onrender.com");

function App() {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn("isLoggedIn", false);
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <Router>
      <LoginContext.Provider
        value={{ setIsLoggedIn, isLoggedIn, setUser, user }}
      >
        <NavBar socket={socket} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/portal/:id" exact component={Questions} />
          <Route path="/profile" exact component={Profile} />
          <Route
            path="/chat"
            exact
            component={() => <Chat isLoggedIn={isLoggedIn} socket={socket} />}
          />
        </Switch>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
