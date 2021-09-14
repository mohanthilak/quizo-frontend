import { useEffect, useState, useRef } from "react";
import axios from "axios";
import backLogo from "./back.png";

export default function RightSide({
  user,
  socket,
  clientId,
  setClientId,
  changeView,
  setDisplay,
}) {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(false);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const sendText = () => {
    if (text === "") return;
    socket.emit("message", {
      message: text,
      from: user._id,
      to: clientId,
    });
    setText("");
  };

  socket.on("received", (data) => {
    setMessages(data.chat.messages);
  });

  useEffect(() => {
    socket.connect();
    socket.emit("userConnect", user._id);
  }, []);

  useEffect(() => {
    axios({
      method: "POST",
      withCredentials: true,
      data: {
        userId: user._id,
        clientId: clientId,
      },
      url: "https://quizzooo.herokuapp.com/checkchat",
    }).then((res) => {
      setClient(res.data.client);
      if (res.data.textedBefore) {
        setMessages(res.data.chat.messages);
      } else {
        setMessages([]);
      }
    });
  }, [clientId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={
        !client
          ? changeView
            ? "chat_side no_display"
            : "chat_side"
          : changeView
          ? "chat_side full_display"
          : "chat_side"
      }
    >
      {client ? (
        <>
          <div className="chat_info">
            <div className="user_info">
              <img
                src={backLogo}
                alt=""
                onClick={() => {
                  setClient(false);
                  setClientId("");
                  setDisplay(true);
                }}
                style={{ height: "30px", width: "30px", marginRight: "20px" }}
              />
              <div className="image">
                <img
                  src={
                    client.image
                      ? client.image
                      : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                  }
                  alt=""
                />
              </div>
              <div className="name_text">
                <h6>{client.username}</h6>
              </div>
            </div>
          </div>
          <div className="chat_section">
            <div className="text_section">
              {messages &&
                messages.map((item, i) => (
                  <div
                    className={
                      item.from === clientId
                        ? "text_message received"
                        : "text_message sent"
                    }
                  >
                    <p>{item.message}</p>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="typing_section">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Message"
              />
              <button onClick={sendText}>Send</button>
            </div>
          </div>
        </>
      ) : (
        <div className="dazai-div">
          <img
            className="dazai"
            src="https://i.pinimg.com/564x/72/43/e1/7243e130f71b679af6d75ae5226a16ee.jpg"
            alt=""
          />
        </div>
      )}
    </div>
  );
}
