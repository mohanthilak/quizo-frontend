import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../contexts/LoginContext";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const { isLoggedIn } = useContext(LoginContext);
  const [user, setUser] = useState();
  const [imageLink, setImageLink] = useState(false);
  const [file, setFile] = useState(false);

  const uploadImage = () => {
    const data = new FormData();
    data.append("propic", file);
    console.log(file, "file");
    axios({
      method: "POST",
      withCredentials: true,
      data,
      url: `https://quizzooo.herokuapp.com/image/${user._id}`,
    }).then((res) => {
      console.log(res);
      setImageLink(res.data.path);
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://quizzooo.herokuapp.com/user/getdata",
    }).then((res) => {
      console.log(res.data);
      if (res.data.isLoggedIn) {
        setUser(res.data.user[0]);
        if (res.data.user[0].image) setImageLink(res.data.user[0].image);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: { message: "Must be logged in!", next: `/profile` },
        }}
      />
    );
  }

  return (
    <Container>
      {console.log(user)}
      <div className="profile_page my-5">
        {/* image div */}
        <div className="d-flex flex-column align-items-center justify-content">
          <div className="image_div my-2">
            <img
              src={
                user && imageLink
                  ? imageLink
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
              }
              alt=""
            />
            <div className="upload-btn-wrapper">
              <label htmlFor="image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z" />
                </svg>
              </label>
              <input
                type="file"
                onChange={(e) => {
                  const filee = e.target.files[0];
                  setFile(filee);
                }}
                name="file"
                id="file"
              />
            </div>
          </div>
          {file ? (
            <Button
              variant="dark"
              size="sm"
              className="mt-3"
              style={{
                width: "70px",
                color: "white",
                borderRadius: "10px",
                fontWeight: "500",
              }}
              onClick={uploadImage}
            >
              Change?
            </Button>
          ) : (
            ""
          )}
          {/* username */}
          <div className="user_name text-center mt-3 mb-3">
            <h3>{user && user.username}</h3>
          </div>
        </div>
        <hr />

        {/* contacts */}
        <div className="contacts mt-4">
          <h2>Contacts</h2>
          <ul>
            {user &&
              user.rooms.map((item, i) => (
                <li>
                  <img
                    src={
                      item.with.image
                        ? item.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuCwSGCSFDd2fiwEJIivTZMtyi_C-rJviL6eaNYj_D6JSCsqGeNKxGSikjn8QcPqPvWQ&usqp=CAU"
                    }
                    alt=""
                  />
                  <h3>{item.with.username}</h3>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
