// import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";

// function SelectRoom({ text, id, roomType }) {
//   const { workspaceId } = useParams();
//   const [checkRoom, setCheckRoom] = useState();
//   const history = useHistory();

//   const selectRoom = () => {
//     if (id) {
//       if (roomType === "Project") {
//         history.push(`/workspace/${workspaceId}/room/${id}/project`);
//       } else if (roomType === "Chat") {
//         history.push(`/workspace/${workspaceId}/room/${id}/chat`);
//       } else {
//         history.push(`/workspace/${workspaceId}/room/${id}/board`);
//       }
//     } else {
//       history.push(text);
//     }
//     setCheckRoom(true);
//     history.listen(() => {
//       setCheckRoom(false);
//     });
//   };

//   useEffect(() => {
//     let myBtns = document.querySelectorAll(".dropdown-item");
//     myBtns.forEach((btn) => {
//       btn.addEventListener("click", () => {
//         myBtns.forEach((b) => b.classList.remove("active"));
//         btn.classList.add("active");
//       });
//     });
//   }, []);

//   return (
//     <>
//       {roomType === "Project" ? (
//         <a
//           href="javascript:void(0)"
//           className="dropdown-item"
//           id={id}
//           onClick={selectRoom}
//           isSelected={checkRoom}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon dropdown-item-icon"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
//           </svg>
//           {text || "..."}
//           {/* <span class="badge bg-primary ms-auto"></span> */}
//         </a>
//       ) : roomType === "Chat" ? (
//         <a
//           href="javascript:void(0)"
//           className="dropdown-item"
//           id={id}
//           onClick={selectRoom}
//           isSelected={checkRoom}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon dropdown-item-icon"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
//             <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
//           </svg>
//           {text || "..."}
//           {/* <span class="badge bg-primary ms-auto"></span> */}
//         </a>
//       ) : rommType === "Page" ? (
//         <a
//           href="javascript:void(0)"
//           className="dropdown-item"
//           id={id}
//           onClick={selectRoom}
//           isSelected={checkRoom}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon dropdown-item-icon"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M12.077 20h-5.077v-16h11v14h-5.077" />
//           </svg>
//           {text || "..."}
//           {/* <span class="badge bg-primary ms-auto"></span> */}
//         </a>
//       ) : roomType === "Events" ? (
//         <a
//           href="javascript:void(0)"
//           className="dropdown-item"
//           id={id}
//           onClick={selectRoom}
//           isSelected={checkRoom}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon dropdown-item-icon"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <rect x="4" y="5" width="16" height="16" rx="2" />
//             <line x1="16" y1="3" x2="16" y2="7" />
//             <line x1="8" y1="3" x2="8" y2="7" />
//             <line x1="4" y1="11" x2="20" y2="11" />
//             <rect x="8" y="15" width="2" height="2" />
//           </svg>
//           {text || "..."}
//           {/* <span class="badge bg-primary ms-auto"></span> */}
//         </a>
//       ) : roomType === "Board" ? (
//         <a
//           href="javascript:void(0)"
//           className="dropdown-item"
//           id={id}
//           onClick={selectRoom}
//           isSelected={checkRoom}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon dropdown-item-icon"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <line x1="4" y1="4" x2="10" y2="4" />
//             <line x1="14" y1="4" x2="20" y2="4" />
//             <rect x="4" y="8" width="6" height="12" rx="2" />
//             <rect x="14" y="8" width="6" height="6" rx="2" />
//           </svg>
//           {text || "..."}
//           {/* <span class="badge bg-primary ms-auto"></span> */}
//         </a>
//       ) : (
//         <a
//           href="javascript:void(0)"
//           className="dropdown-item"
//           id={id}
//           onClick={selectRoom}
//           isSelected={checkRoom}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon dropdown-item-icon"
//             width={24}
//             height={24}
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <line x1="4" y1="4" x2="10" y2="4" />
//             <line x1="14" y1="4" x2="20" y2="4" />
//             <rect x="4" y="8" width="6" height="12" rx="2" />
//             <rect x="14" y="8" width="6" height="6" rx="2" />
//           </svg>
//           {text || "..."}
//           {/* <span class="badge bg-primary ms-auto"></span> */}
//         </a>
//       )}
//     </>
//   );
// }

// export default SelectRoom;

import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function SelectRoom({ text, id, roomType }) {
  const { workspaceId } = useParams();
  const [checkRoom, setCheckRoom] = useState();
  const history = useHistory();

  const selectRoom = () => {
    if (id) {
      if (roomType === "Project") {
        history.push(`/workspace/${workspaceId}/room/${id}/project`);
      } else if (roomType === "Chat") {
        history.push(`/workspace/${workspaceId}/room/${id}/chat`);
      } else if (roomType === "Board") {
        history.push(`/workspace/${workspaceId}/room/${id}/board`);
      } else if (roomType === "Discussions") {
        history.push(`/workspace/${workspaceId}/room/${id}/discussions`);
      } else if (roomType === "Events") {
        history.push(`/workspace/${workspaceId}/room/${id}/events`);
      } else {
        history.push(`/workspace/${workspaceId}/room/${id}/page`);
      }
    } else {
      history.push(text);
    }
    setCheckRoom(true);
    history.listen(() => {
      setCheckRoom(false);
    });
  };

  useEffect(() => {
    let myBtns = document.querySelectorAll(".dropdown-item");
    myBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        myBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }, []);

  return (
    <>
      {roomType == "Project" && (
        <a
          href="javascript:void(0)"
          className="dropdown-item"
          id={id}
          onClick={selectRoom}
          isSelected={checkRoom}
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
            <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
          </svg>
          {text || "..."}
          {/* <span class="badge bg-primary ms-auto"></span> */}
        </a>
      )}

      {roomType === "Chat" && (
        <a
          href="javascript:void(0)"
          className="dropdown-item"
          id={id}
          onClick={selectRoom}
          isSelected={checkRoom}
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
            <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
          </svg>
          {text || "..."}
          {/* <span class="badge bg-primary ms-auto"></span> */}
        </a>
      )}

      {roomType === "Board" && (
        <a
          href="javascript:void(0)"
          className="dropdown-item"
          id={id}
          onClick={selectRoom}
          isSelected={checkRoom}
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
            <line x1="4" y1="4" x2="10" y2="4" />
            <line x1="14" y1="4" x2="20" y2="4" />
            <rect x="4" y="8" width="6" height="12" rx="2" />
            <rect x="14" y="8" width="6" height="6" rx="2" />
          </svg>
          {text || "..."}
          {/* <span class="badge bg-primary ms-auto"></span> */}
        </a>
      )}

      {roomType === "Page" && (
        <a
          href="javascript:void(0)"
          className="dropdown-item"
          id={id}
          onClick={selectRoom}
          isSelected={checkRoom}
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
            <path d="M12.077 20h-5.077v-16h11v14h-5.077" />
          </svg>
          {text || "..."}
          {/* <span class="badge bg-primary ms-auto"></span> */}
        </a>
      )}

      {roomType === "Events" && (
        <a
          href="javascript:void(0)"
          className="dropdown-item"
          id={id}
          onClick={selectRoom}
          isSelected={checkRoom}
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
            <rect x="4" y="5" width="16" height="16" rx="2" />
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="4" y1="11" x2="20" y2="11" />
            <rect x="8" y="15" width="2" height="2" />
          </svg>
          {text || "..."}
          {/* <span class="badge bg-primary ms-auto"></span> */}
        </a>
      )}

      {roomType === "Discussions" && (
        <a
          href="javascript:void(0)"
          className="dropdown-item"
          id={id}
          onClick={selectRoom}
          isSelected={checkRoom}
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
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <line x1="5" y1="6" x2="5" y2="6.01" />
            <line x1="5" y1="12" x2="5" y2="12.01" />
            <line x1="5" y1="18" x2="5" y2="18.01" />
          </svg>
          {text || "..."}
          {/* <span class="badge bg-primary ms-auto"></span> */}
        </a>
      )}
    </>
  );
}

export default SelectRoom;
