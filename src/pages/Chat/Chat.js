import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import "./chat.css";
import axios from "axios";

function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return width;
}

export default function Chat({ socket }) {
  const { isLoggedIn } = useContext(LoginContext);
  const [user, setUser] = useState();
  const [clientId, setClientId] = useState("");
  const [changeView, setChangeView] = useState();
  const [display, setDisplay] = useState(true);
  const width = useWindowSize();

  useEffect(() => {
    console.log(width);
    if (width <= 700) {
      setChangeView(true);
    } else {
      setChangeView(false);
    }
  }, [width]);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://quizzooo.herokuapp.com/user/getdata",
    }).then((res) => {
      console.log(res);
      if (res.data.isLoggedIn) {
        setUser(res.data.user[0]);
      }
    });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: { message: "Must be logged in!", next: `/chat` },
        }}
      />
    );
  }

  return (
    <div className="background-div">
      <div className="chat_page">
        {user ? (
          <>
            <LeftSide
              user={user}
              setClientId={setClientId}
              setChangeView={setChangeView}
              changeView={changeView}
              setDisplay={setDisplay}
              display={display}
            />
            <RightSide
              user={user}
              socket={socket}
              clientId={clientId}
              setClientId={setClientId}
              setChangeView={setChangeView}
              changeView={changeView}
              setDisplay={setDisplay}
            />
          </>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
