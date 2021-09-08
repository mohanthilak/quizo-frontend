import { useContext, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import axios from "axios";
import "./navbar.css";

export default function NavBar({ socket }) {
  axios.defaults.withCredentials = true;
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(LoginContext);
  const sendLogOut = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://quizzooo.herokuapp.com/logout",
    }).then((res) => {
      if (res.data.isLoggedOut) {
        setIsLoggedIn(false);
        setUser(null);
        socket.close();
      }
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://quizzooo.herokuapp.com/getuser",
    })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((e) => {
        console.log(e, "error");
      });
  }, []);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{ backgroundColor: "white", padding: "0px" }}
    >
      <Container>
        <Navbar.Brand className="brand" as={Link} to="/">
          QUIZO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="nav-link" as={Link} to="/chat">
              CHAT
            </Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/">
              HOME
            </Nav.Link>

            {isLoggedIn ? (
              <Nav.Link className="nav-link" onClick={sendLogOut}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link className="nav-link" as={Link} to="/signin">
                  SIGNIN
                </Nav.Link>

                <Nav.Link className="nav-link" as={Link} to="/signup">
                  SIGNUP
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
