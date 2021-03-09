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
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Phòng mới</h5>
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
                placeholder=""
                ref={roomName}
              />
            </div>
            <label className="form-label">Loại phòng</label>
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
                        Mọi thứ cần để cộng tác trên một dự án
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
                    value="Page"
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
                        Cộng tác viết thông tin, dữ liệu về dự án
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
                        Trao đổi thông tin nhanh, không đứt mạch, gián đoạn
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
                        Phân công nhiệm vụ và theo dõi tiến trình
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
                    value="Discussions"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Discussions
                      </span>
                      <span className="d-block text-muted">
                        Thảo luận, câu hỏi thường gặp, thăm dò ý kiến, thông tin quan trọng
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
                    value="Events"
                    onChange={(e) => setRoomType(e.target.value)}
                    className="form-selectgroup-input"
                  />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check" />
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">
                        Events
                      </span>
                      <span className="d-block text-muted">
                        Lên kế hoạch, lịch sự kiện, dòng thời gian dự án
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="form-selectgroup-boxes row mb-3"></div>
          </div>
          <div className="modal-footer">
            <button
              className="btn link-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
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
              Tạo phòng mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
