import { useRef, useEffect } from "react";
import db from "../adapters/firebase";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import { useHistory } from "react-router";

function CreateWorkpsaceModal(props) {
  const workspaceName = useRef("");
  const spaceType = useRef("");

  const { currentUser, currentDate } = useStateValue();
  const {
    currentUserName,
    currentUserEmail,
    currentUserUUId,
    currentUserRole,
    currentUserBusinessName,
  } = useCurrentUserDetails();

  const history = useHistory();

  // const handleCreateWorkspace = async () => {
  //   if (workspaceName.current.value !== "") {
  //     await db
  //       .collection("workspaces")
  //       .doc(props.workspaceUUID)
  //       .set({
  //         workspaceName: workspaceName.current.value,
  //         authorName: currentUserName,
  //         authorEmail: currentUserEmail,
  //         authorId: currentUserUUId,
  //         authorRole: currentUserRole,
  //         authorBusinessName: currentUserBusinessName,
  //         date: currentDate,
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(props.workspaceUUID)
  //           .collection("rooms")
  //           .add({
  //             roomName: "General",
  //             authorName: currentUserName,
  //             authorEmail: currentUserEmail,
  //             authorId: currentUserUUId,
  //             roomType: "Chat",
  //             createdDate: currentDate,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(props.workspaceUUID)
  //           .collection("users")
  //           .doc(currentUserEmail)
  //           .set({
  //             userName: currentUserName,
  //             userEmail: currentUserEmail,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(props.workspaceUUID)
  //           .collection("storage")
  //           .doc("Main")
  //           .set({
  //             groupName: "Main",
  //             authorName: currentUserName,
  //             authorId: currentUserUUId,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(props.workspaceUUID)
  //           .collection("settings")
  //           .doc("link")
  //           .set({
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(props.workspaceUUID)
  //           .collection("settings")
  //           .doc("link")
  //           .collection("users")
  //           .add({
  //             userEmail: currentUserEmail,
  //             userName: currentUserName,
  //             userRole: currentUserRole,
  //             isAdmin: true,
  //             isAuthor: true,
  //             date: currentDate,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .catch((error) => console.error(error));
  //   } else return;

  //   workspaceName.current.value = "";
  // };


  const handleCreateWorkspace = async () => {
    if (workspaceName.current.value !== "") {
      await db
        .collection("workspaces")
        .doc(props.workspaceUUID)
        .set({
          workspaceName: workspaceName.current.value,
          authorName: currentUserName,
          authorEmail: currentUserEmail,
          authorId: currentUserUUId,
          authorRole: currentUserRole,
          authorBusinessName: currentUserBusinessName,
          date: currentDate,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("rooms")
            .add({
              roomName: "General",
              authorName: currentUserName,
              authorEmail: currentUserEmail,
              authorId: currentUserUUId,
              roomType: "Chat",
              createdDate: currentDate,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("users")
            .doc(currentUserEmail)
            .set({
              userName: currentUserName,
              userEmail: currentUserEmail,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("storage")
            .doc("Main")
            .set({
              groupName: "Main",
              authorName: currentUserName,
              authorId: currentUserUUId,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("settings")
            .doc("link")
            .set({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          db.collection("workspaces")
            .doc(props.workspaceUUID)
            .collection("settings")
            .doc("link")
            .collection("users")
            .add({
              userEmail: currentUserEmail,
              userName: currentUserName,
              userRole: currentUserRole,
              isAdmin: true,
              isAuthor: true,
              date: currentDate,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .catch((error) => console.error(error));
    } else if (workspaceName.current.value !== "" && spaceType == "meetingspace") {
      const meetingspaceId = uuidv4();
      history.push(`/meetingspace/${meetingspaceId}`);
    } else return;

    workspaceName.current.value = "";
  };


  const handleCreateMeetingspace = async () => {
    const meetingspaceId = uuidv4();
    history.push(`/meetingspace/${meetingspaceId}`);
  }

  return (
    <div
      className="modal modal-blur fade"
      id="modal-new-workspace"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Không gian mới</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                name="example-text-input"
                placeholder="Name"
                ref={workspaceName}
              />
            </div>
            <label className="form-label">Loại không gian</label>
            <div className="form-selectgroup-boxes row mb-3">
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input
                    type="radio"
                    name="report-type"
                    defaultValue="teamspace"
                    ref={spaceType}
                    className="form-selectgroup-input"
                    defaultChecked
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Đội nhóm
                      </span>
                      <span className="d-block text-muted">
                        Mọi thứ cần để cộng tác đội nhóm hiệu quả
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
                    defaultValue="meetingspace"
                    ref={spaceType}
                    className="form-selectgroup-input"
                    disabled
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Họp: video [WIP]
                      </span>
                      <span className="d-block text-muted">
                        Không gian họp video vẫn đang trong quá trình phát triển
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
                    defaultValue="audiospace"
                    ref={spaceType}
                    className="form-selectgroup-input"
                    disabled
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Họp: âm thanh [WIP]
                      </span>
                      <span className="d-block text-muted">
                      Không gian họp âm thanh vẫn đang trong quá trình phát triển
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="mb-3">
                  <label className="form-label">Không gian ID</label>
                  <div className="input-group input-group-flat">
                    <span className="input-group-text">space/</span>
                    <input
                      type="text"
                      className="form-control ps-0"
                      defaultValue={props.workspaceUUID}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Chế độ</label>
                  <select className="form-select">
                    <option value={1} selected>
                      Riêng tư
                    </option>
                    <option value={2}>Công khai</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn link-secondary" data-bs-dismiss="modal">
              Hủy
            </button>
            <button
              className="btn btn-primary ms-auto"
              data-bs-dismiss="modal"
              onClick={handleCreateWorkspace}
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
              Tạo không gian mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkpsaceModal;
