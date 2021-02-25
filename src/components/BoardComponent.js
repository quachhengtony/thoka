import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import firebase from "firebase";

import db from "../adapters/firebase";
import "../styles/Board.css";
import ListCard from "./ListCard";
import { useHistory, useParams } from "react-router-dom";
import CreateCardModal from "./CreateCardModal";
import ViewCardModal from "./ViewCardModal";

function BoardComponent(props) {
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
  }, [props.roomId]);

  return (
    <div className="board" id="board" style={{ width: props.projectRoomPanelWidth }}>
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

export default BoardComponent;
