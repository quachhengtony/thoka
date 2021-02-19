import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "../styles/Chat.css";
import db from "../adapters/firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat(props) {
  const { roomId, workspaceId } = useParams();
  const [roomDetails, setRoomDetails] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (workspaceId && roomId) {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  return (
    <div className="chat" id="chat" style={{ width: props.chatPanelWidth }}>
      <div className="card card-sm card-chat">
        <ul class="nav nav-tabs nav-tabs-alt" data-bs-toggle="tabs">
          <li class="nav-item">
            <a
              onClick={() =>
                history.push(`/workspace/${workspaceId}/room/${roomId}/chat`)
              }
              class="nav-link"
              data-bs-toggle="tab"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon me-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
              </svg>
              {roomDetails ? roomDetails.roomName : "..."}
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Lorem ipsuum dolor sit amet
              </a>
              <a className="dropdown-item" href="#">
                Lorem ipsuum dolor sit amet
              </a>
              <a className="dropdown-item" href="#">
                Lorem ipsuum dolor sit amet
              </a>
              <a className="dropdown-item" href="#">
                Lorem ipsuum dolor sit amet
              </a>
              <a className="dropdown-item" href="#">
                Lorem ipsuum dolor sit amet
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="message__container">
        {roomMessages.map(({ message, timestamp, user, userImage, date }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
            date={date}
          />
        ))}
      </div>
      <div className="chatinput__container">
        <ChatInput
          className="chat_input"
          roomName={roomDetails?.name}
          roomId={roomId}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
}

export default Chat;
