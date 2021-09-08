import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../contexts/LoginContext";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const { isLoggedIn } = useContext(LoginContext);
  const [user, setUser] = useState();
  //   const [requestType, setRequestType] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://quizzooo.herokuapp.com/user/getdata",
    }).then((res) => {
      console.log(res.data);
      if (res.data.isLoggedIn) {
        setUser(res.data.user);
      }
    });
  }, []);

  if (!isLoggedIn) {
    <Redirect
      to={{
        pathname: "/signin",
        state: { message: "Must be logged in!", next: `/chat` },
      }}
    />;
  }

  return (
    <div className="profile_page">
      <div className="image_div">
        <img
          src={
            user && user.image
              ? user.image
              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
          }
          alt=""
        />
        {user ? (
          user.image ? (
            <Form>
              <Form.Group controlId="formFileSm" className="my-3">
                <Form.Label>Change</Form.Label>
                <Form.Control type="file" size="sm" />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="formFileSm" className="my-3">
                <Form.Label>Add</Form.Label>
                <Form.Control type="file" size="sm" />
              </Form.Group>
            </Form>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
