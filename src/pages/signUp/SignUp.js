import { useState, useContext } from "react";
import "./signup.css";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../contexts/LoginContext";

export default function SignUn() {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const sendData = () => {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "https://quizo-api.onrender.com/register",
    }).then((res) => {
      console.log(res);
      if (res.data.created) {
        setIsLoggedIn(true);
        history.push("/chat");
      }
    });
  };

  return (
    <Container>
      <div className="signIn_page">
        <h3>Sign Up</h3>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <Button variant="outline-success" onClick={sendData}>
          Sign Up
        </Button>
      </div>
    </Container>
  );
}
