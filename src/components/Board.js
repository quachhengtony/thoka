import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import firebase from "firebase";

import db from "../adapters/firebase";
import "../styles/Board.css";
import ListCard from "./ListCard";
import { useHistory, useParams } from "react-router-dom";
import CreateCardModal from "./CreateCardModal";
import ViewCardModal from "./ViewCardModal";

function Board(props) {
  const [columns, setColumns] = useState([]);
  const { workspaceId, roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState([]);
  // const [cardBody, setCardBody] = useState("");
  const history = useHistory();
  const [columnId, setColumnId] = useState("");

  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardPriority, setCardPriority] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [cardDeadline, setCardDeadline] = useState("");
  const [cardAssignee, setCardAssignee] = useState("");
  const [cardReporter, setCardReporter] = useState("");
  const [cardDocumentGroup, setCardDocumentGroup] = useState("");
  const [cardCreatedDate, setCardCreatedDate] = useState("");

  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedCardsColumnId, setSelectedCardsColumnId] = useState("");

  const handleChangeCardStatus = (destinationColumn) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .doc(selectedCardsColumnId)
      .collection("cards")
      .doc(selectedCard.id)
      .delete()
      .then((doc) => {
        console.log("Card deleted");

        db.collection("workspaces")
          .doc(workspaceId)
          .collection("rooms")
          .doc(roomId)
          .collection("columns")
          .doc(destinationColumn)
          .collection("cards")
          .add({
            cardTitle: selectedCard.title,
            cardBody: selectedCard.body,
            cardPriority: selectedCard.priority,
            cardAssignee: selectedCard.assignee,
            cardDeadline: selectedCard.deadline,
            cardColor: selectedCard.color,
            cardReporter: selectedCard.reporter,
            cardDocumentGroup: selectedCard.documentGroup,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => console.log("Card added"))
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addColumn = () => {
    const columnName = prompt("List name");
    if (!columnName) {
      return;
    } else {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("columns")
        .add({
          name: columnName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log("column added"))
        .catch((error) => console.error(error));
    }
  };

  // const onDragStart = (result) => {
  //   db.collection("workspaces")
  //     .doc(workspaceId)
  //     .collection("rooms")
  //     .doc(roomId)
  //     .collection("columns")
  //     .doc(result.source.droppableId)
  //     .collection("cards")
  //     .doc(result.draggableId)
  //     .get()
  //     .then((doc) => {
  //       setCardBody(doc.data().body);
  //       console.log("Card copied");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const onDragEnd = (result) => {
  //   var cardPromise = new Promise((resolve, reject) => {
  //     if (result.destination.droppableId != result.source.droppableId) {
  //       resolve();
  //     } else if (result.destination.droppableId == result.source.droppableId) {
  //       return;
  //     } else {
  //       return;
  //     }
  //   });

  //   cardPromise
  //     .then(() => {
  //       db.collection("workspaces")
  //         .doc(workspaceId)
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("columns")
  //         .doc(result.source.droppableId)
  //         .collection("cards")
  //         .doc(result.draggableId)
  //         .delete()
  //         .then(() => {
  //           console.log("Card deleted");
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .then(() => {
  //       db.collection("workspaces")
  //         .doc(workspaceId)
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("columns")
  //         .doc(result.destination.droppableId)
  //         .collection("cards")
  //         .add({
  //           body: cardBody,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         })
  //         .then(() => console.log("Card added"))
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setColumns(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      );

    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .get()
      .then((doc) =>
        setRoomDetails({
          roomId: doc.id,
          roomName: doc.data().roomName,
        })
      );
  }, [roomId]);

  return (
    <div className="board" id="board" style={{ width: props.boardPanelWidth }}>
      <div className="card card-sm --board-chat">
        <ul class="nav nav-tabs nav-tabs-alt" data-bs-toggle="tabs">
          <li class="nav-item">
            <a
              onClick={() =>
                history.push(`/workspace/${workspaceId}/room/${roomId}/board`)
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
                <line x1="4" y1="4" x2="10" y2="4" />
                <line x1="14" y1="4" x2="20" y2="4" />
                <rect x="4" y="8" width="6" height="12" rx="2" />
                <rect x="14" y="8" width="6" height="6" rx="2" />
              </svg>
              {roomDetails ? roomDetails.roomName : "..."}
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
                Chỉ thể hiện nhiệm vụ của tôi
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
      <DragDropContext
      // onDragStart={(result) => onDragStart(result)}
      // onDragEnd={(result) => onDragEnd(result)}
      >
        <div className="board__columnsContainer">
          {columns.map((column, index) => (
            <div className="column__container" key={index}>
              <div className="column__header">
                <div className="columnHeader__name">
                  <p>{column.name ? column.name : "..."}</p>
                </div>
                <div className="columnHeader__button">
                  <button
                    className="btn btn-sm --create-card-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-card"
                    onClick={() => setColumnId(column.id)}
                  >
                    Thẻ mới
                  </button>
                </div>
              </div>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ListCard
                      columnId={column.id}
                      setCardTitle={setCardTitle}
                      setCardBody={setCardBody}
                      setCardPriority={setCardPriority}
                      setCardColor={setCardColor}
                      setCardDeadline={setCardDeadline}
                      setCardAssignee={setCardAssignee}
                      setCardReporter={setCardReporter}
                      setCardDocumentGroup={setCardDocumentGroup}
                      setCardCreatedDate={setCardCreatedDate}
                      setSelectedCard={setSelectedCard}
                      setSelectedCardsColumnId={setSelectedCardsColumnId}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          <div>
            <button
              className="btn btn-primary btn-sm --new-column-btn"
              onClick={addColumn}
            >
              Danh sách mới
            </button>
          </div>
        </div>
      </DragDropContext>

      <ViewCardModal
        cardTitle={cardTitle}
        cardBody={cardBody}
        cardPriority={cardPriority}
        cardColor={cardColor}
        cardDeadline={cardDeadline}
        cardAssignee={cardAssignee}
        cardReporter={cardReporter}
        cardDocumentGroup={cardDocumentGroup}
        cardCreatedDate={cardCreatedDate}
        columns={columns}
        handleChangeCardStatus={handleChangeCardStatus}
      />
      <CreateCardModal
        taskRoomId={roomDetails.roomId}
        roomName={roomDetails.roomName}
        columnId={columnId}
      />
    </div>
  );
}

export default Board;
