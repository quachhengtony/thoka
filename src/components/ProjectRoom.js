import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../styles/ProjectRoom.css";
import db from "../adapters/firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";
import BoardComponent from "./BoardComponent";

export default function ProjectRoom(props) {
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
    <div
      className="projectRoom"
      id="projectRoom"
      style={{ width: props.projectRoomPanelWidth }}
    >
      <div className="card card-sm card-chat">
        <ul class="nav nav-tabs nav-tabs-alt" data-bs-toggle="tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#tabs-page" data-bs-toggle="tab">
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
                <path d="M12.077 20h-5.077v-16h11v14h-5.077" />
              </svg>
              Page
            </a>
          </li>
          <li class="nav-item">
            <a href="#tabs-chat" class="nav-link" data-bs-toggle="tab">
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
              Chat
            </a>
          </li>
          <li class="nav-item">
            <a href="#tabs-board" class="nav-link" data-bs-toggle="tab">
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
                <line x1="4" y1="4" x2="10" y2="4" />
                <line x1="14" y1="4" x2="20" y2="4" />
                <rect x="4" y="8" width="6" height="12" rx="2" />
                <rect x="14" y="8" width="6" height="6" rx="2" />
              </svg>
              Board
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#tabs-discussions" data-bs-toggle="tab">
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
                <line x1="9" y1="6" x2="20" y2="6" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="18" x2="20" y2="18" />
                <line x1="5" y1="6" x2="5" y2="6.01" />
                <line x1="5" y1="12" x2="5" y2="12.01" />
                <line x1="5" y1="18" x2="5" y2="18.01" />
              </svg>
              Discussions
            </a>
          </li>
          <li class="nav-item">
            <a href="#tabs-events" class="nav-link" data-bs-toggle="tab">
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
                <rect x="4" y="5" width="16" height="16" rx="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="4" y1="11" x2="20" y2="11" />
                <rect x="8" y="15" width="2" height="2" />
              </svg>
              Events
            </a>
          </li>
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
        <div className="tab-content --project-room-card-body">
          <div className="tab-pane active show" id="tabs-page">
            Page component
          </div>
          <div className="tab-pane" id="tabs-chat">
            <div className="message__container --project-room-message-container">
              {roomMessages.map(
                ({ message, timestamp, user, userImage, date }) => (
                  <Message
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                    date={date}
                  />
                )
              )}
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
          <div className="tab-pane" id="tabs-board">
            <BoardComponent roomId={roomId} projectRoomPanelWidth={props.projectRoomPanelWidth} />
          </div>
          <div className="tab-pane" id="tabs-discussions">
            Discussions component
          </div>
          <div className="tab-pane" id="tabs-events">
            Events component
          </div>
        </div>
      </div>
    </div>
  );
}
