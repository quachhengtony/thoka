import { useState, useEffect, useCallback } from "react";
import "../styles/Sidebar.css";
import db from "../adapters/firebase";
import { useHistory, useParams } from "react-router-dom";
import SelectRoom from "./SelectRoom";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import CreateRoomModal from "./CreateRoomModal";

function Sidebar(props) {
  const { workspaceId } = useParams();
  const { currentUser } = useStateValue();
  const history = useHistory();

  const [workspaceName, setWorkspaceName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const {
    currentUserName,
    currentUserEmail,
    currentUserUUId,
  } = useCurrentUserDetails();

  const memoizedSetRooms = useCallback(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            roomId: doc.id,
            roomName: doc.data().roomName,
            roomType: doc.data().roomType,
          }))
        )
      );
  }, [rooms]);

  const memoizedSetWorkspaceUsers = useCallback(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("user")
      .collection("workspaceUsers")
      .onSnapshot((snapshot) =>
        setWorkspaceUsers(snapshot.docs.map((doc) => doc.data()))
      );
  }, [workspaceUsers]);

  useEffect(() => {
    let myBtns = document.querySelectorAll(".dropdown-item");
    myBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        myBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
    db.collection("workspaces")
      .doc(workspaceId)
      .get()
      .then((doc) => {
        setWorkspaceName(doc.data().workspaceName);
      });
    memoizedSetRooms();
    // db.collection('workspaces').doc(workspaceId).collection('rooms').orderBy("timestamp", "asc").onSnapshot(snapshot => (
    //   setRooms(snapshot.docs.map(doc => ({
    //     roomId: doc.id,
    //     roomName: doc.data().roomName
    //   })))
    // ))
    memoizedSetWorkspaceUsers();
    // db.collection("workspaces").doc(workspaceId).collection("settings").doc("user").collection("workspaceUsers").onSnapshot(snapshot => (
    //   setWorkspaceUsers(snapshot.docs.map(doc => doc.data()))
    // ))
  }, []);

  return (
    <>
      <aside className="navbar navbar-vertical navbar-expand-lg sidebar">
        <div className="left" id="leftBar">
          <button
            onClick={() => history.push("/spaces")}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Không gian"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-skype"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="10" y="5" width="10" height="14" rx="2" />
              <line x1="7" y1="7" x2="7" y2="17" />
              <line x1="4" y1="8" x2="4" y2="16" />
            </svg>
          </button>
          <button
            onClick={() => history.push(`/workspace/${workspaceId}/reports`)}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Báo cáo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-report"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="7" cy="7" r="4" />
              <path d="M7 3v4h4" />
              <line x1="9" y1="17" x2="9" y2="21" />
              <line x1="17" y1="14" x2="17" y2="21" />
              <line x1="13" y1="13" x2="13" y2="21" />
              <line x1="21" y1="12" x2="21" y2="21" />
            </svg>
          </button>
          <button
            onClick={() => history.push(`/workspace/${workspaceId}/search`)}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Tìm kiếm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
          <button
            onClick={() => history.push(`/workspace/${workspaceId}/storage`)}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Kho tài liệu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-files"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
              <line x1="12" y1="12" x2="20" y2="7.5" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <line x1="12" y1="12" x2="4" y2="7.5" />
              <line x1="16" y1="5.25" x2="8" y2="9.75" />
            </svg>
          </button>
          <button
            onClick={() => history.push(`/workspace/${workspaceId}/settings`)}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Cài đặt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-settings"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            onClick={() => history.push(`/workspace/${workspaceId}/links`)}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Không gian được kết nối"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-link"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
              <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
            </svg>
          </button>
          <button
            onClick={() => history.push(`/profile-account`)}
            className="btn btn-bitbucket btn-icon wpbtn"
            aria-label="Button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
            title="Tài khoản"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </button>

          <button
            onClick={props.handleHideRightbar}
            className="btn btn-bitbucket btn-icon wpbtn --handleRightbarButton"
            aria-label="Button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="12" x2="8" y2="16" />
              <line x1="4" y1="12" x2="8" y2="8" />
              <line x1="20" y1="4" x2="20" y2="20" />
            </svg>
          </button>
        </div>
        <div className="dropdown-menu dropdown-menu-demo right" id="rightBar">
          <h6 className="dropdown-header">Đội nhóm</h6>
          <a
            href="javascript:void(0)"
            className="dropdown-item"
            onClick={() => history.push(`/workspace/${workspaceId}/overview`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon dropdown-item-icon"
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
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 16v.01" />
              <path d="M8 12v.01" />
              <path d="M8 8v.01" />
              <path d="M16 16v.01" />
              <path d="M16 12v.01" />
              <path d="M16 8v.01" />
              <path d="M12 8v.01" />
              <path d="M12 16v.01" />
            </svg>
            {workspaceName ? workspaceName : "..."}
          </a>
          <a
            href="javascript:void(0)"
            className="dropdown-item"
            onClick={() => history.push(`/workspace/${workspaceId}/tasks`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon dropdown-item-icon"
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
              <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
              <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
              <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
              <line x1="11" y1="6" x2="20" y2="6" />
              <line x1="11" y1="12" x2="20" y2="12" />
              <line x1="11" y1="18" x2="20" y2="18" />
            </svg>
            Nhiệm vụ
          </a>
          <a
            href="javascript:void(0)"
            className="dropdown-item"
            onClick={() => history.push(`/workspace/${workspaceId}/inbox`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon dropdown-item-icon"
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
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M4 13h3l3 3h4l3 -3h3" />
            </svg>
            Hộp thư
          </a>
          <div className="dropdown-divider" />
          <h6 className="dropdown-header">Phòng</h6>

          {/* <div className="accordion-item">
            <h2 className="accordion-header" id="heading-1">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse-1"
                aria-expanded="false"
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="collapse-1"
              className="accordion-collapse collapse"
              data-bs-parent="#accordion-example"
              style={{}}
            >
              <div className="accordion-body pt-0"></div>
            </div>
          </div> */}

          {rooms.map((room, index) => (
            <SelectRoom
              text={room.roomName}
              id={room.roomId}
              key={index}
              roomType={room.roomType}
            />
          ))}
          <h6 className="dropdown-header">Thành viên</h6>
          <a href="javascript:void(0)" className="dropdown-item">
            <span className="avatar avatar-xs rounded me-2">T</span>
            {currentUserName}
            <span className="badge bg-red-lt ms-auto">bạn</span>
          </a>
          <div className="dropdown-divider" />
          <h6 className="dropdown-header">Hành động</h6>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#create-room-modal"
            className="dropdown-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon dropdown-item-icon"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tạo phòng mới
          </a>
          <a href="javascript:void(0)" className="dropdown-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon dropdown-item-icon"
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
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
            Đăng xuất
          </a>
        </div>
      </aside>
      <CreateRoomModal />
    </>
  );
}
export default Sidebar;
