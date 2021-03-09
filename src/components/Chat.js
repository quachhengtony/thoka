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
              className="nav-link"
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
          <li class="nav-item">
            <a className="nav-link" data-bs-toggle="tab">
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
                <line x1="15" y1="8" x2="15.01" y2="8" />
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
                <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
              </svg>
              Đa phương tiện
            </a>
          </li>
          <li class="nav-item">
            <a className="nav-link" data-bs-toggle="tab">
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
                <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
                <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
              </svg>
              Tài liệu
            </a>
          </li>
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Lựa chọn
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Tìm kiếm tin nhắn
              </a>
            </div>
          </li> */}
          <li className="nav-item ms-auto">
            <a
              href="#tabs-settings-ex2"
              className="nav-link"
              title="Settings"
              data-bs-toggle="tab"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
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
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </a>
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
