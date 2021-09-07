import { useContext, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import axios from "axios";
import "./navbar.css";

export default function NavBar({ socket }) {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(LoginContext);
  const sendLogOut = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/logout",
      withCredentials: true,
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
      url: "http://localhost:4000/getuser",
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
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
            <NavDropdown
              title={
                <img
                  src="https://download.logo.wine/logo/Microsoft_account/Microsoft_account-Logo.wine.png"
                  alt=""
                  style={{ width: "55px", height: "30px" }}
                />
              }
              id="navbarScrollingDropdown"
            >
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item onClick={sendLogOut}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    <NavDropdown.Item as={Link} to="profile">
                      PROFILE
                    </NavDropdown.Item>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="signin">
                    SIGN IN
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="signup">
                    SIGN UP
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
