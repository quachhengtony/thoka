import { useRef, useState } from "react";
import db from "../adapters/firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import { useStateValue } from "../contexts/StateProvider";
import { useParams } from "react-router-dom";
import firebase from "firebase";

export default function CreateRoomModal() {
  const roomName = useRef("");
  const [roomType, setRoomType] = useState("Project");
  const { workspaceId } = useParams();
  const { currentDate } = useStateValue();
  const {
    currentUserName,
    currentUserEmail,
    currentUserUUId,
  } = useCurrentUserDetails();

  const handleCreateRoom = () => {
    if (roomName.current.value !== "") {
      db.collection("workspaces").doc(workspaceId).collection("rooms").add({
        roomName: roomName.current.value,
        authorName: currentUserName,
        authorEmail: currentUserEmail,
        authorId: currentUserUUId,
        roomType: roomType,
        createdDate: currentDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      return;
    }
  };

  return (
    <div
      className="modal modal-blur fade"
      id="create-room-modal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      //   style={{ paddingTop: "100px" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New room</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="Name"
                ref={roomName}
              />
            </div>
            <label className="form-label">Room type</label>
            <div className="form-selectgroup-boxes row mb-3">
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    value="Project"
                    className="form-selectgroup-input"
                    onChange={(e) => setRoomType(e.target.value)}
                    defaultChecked
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Project
                      </span>
                      <span className="d-block text-muted">
                        Everything you need for a project in one place
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    value="Discussion"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Page
                      </span>
                      <span className="d-block text-muted">
                        General knowledge and overviews in rich text form
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="form-selectgroup-boxes row mb-3">
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    value="Chat"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Chat
                      </span>
                      <span className="d-block text-muted">
                        Fast pace, uninterrupted communication
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    value="Board"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Board
                      </span>
                      <span className="d-block text-muted">
                        Task management and progress tracking
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="form-selectgroup-boxes row mb-3">
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    value="Discussion"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Discussion
                      </span>
                      <span className="d-block text-muted">
                        Organized, well articulated communication
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    value="Event"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Event
                      </span>
                      <span className="d-block text-muted">
                        Planning ahead, scheduling, roadmap, timeline
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="form-selectgroup-boxes row mb-3"></div>
          </div>

          <div className="modal-footer">
            <a
              href="#"
              className="btn btn-link link-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </a>
            <a
              className="btn btn-primary ms-auto"
              data-bs-dismiss="modal"
              onClick={handleCreateRoom}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
              Create new room
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
