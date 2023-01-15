import { useState, useContext } from "react";
import "./signin.css";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../contexts/LoginContext";

export default function SignIn(props) {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [redirectPath, setRedirectPath] = useState(
    props.location.state ? props.location.state.next : false
  );
  const [redirectText, setRedirectText] = useState(
    props.location.state ? props.location.state.message : false
  );

  const sendData = () => {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "https://quizo-api.onrender.com/login",
    }).then((res) => {
      if (res.data.loggedIn) {
        setIsLoggedIn(true);
        console.log("user Connected");
        setRedirectText(false);
        history.push(redirectPath ? redirectPath : "/");
      } else {
        setRedirectText(res.data.message);
      }
    });
  };

  return (
    <Container>
      <div className="signIn_page">
        <h3>Sign In</h3>
        {redirectText ? (
          <p style={{ marginBottom: "0px", fontWeight: "500" }}>
            {redirectText}
          </p>
        ) : (
          ""
        )}
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
          Sign In
        </Button>
      </div>
    </Container>
  );
}
