// import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";

// function SelectRoom({ text, id }) {
//   const { workspaceId } = useParams();
//   const [checkRoom, setCheckRoom] = useState();
//   const history = useHistory();

//   const selectRoom = () => {
//     if (id) {
//       history.push(`/workspace/${workspaceId}/room/${id}/chat`);
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
//     myBtns.forEach(function (btn) {
//       btn.addEventListener("click", () => {
//         myBtns.forEach((b) => b.classList.remove("active"));
//         btn.classList.add("active");
//       });
//     });
//   }, []);

//   return (
//     <a
//       href="javascript:void(0)"
//       className="dropdown-item"
//       id={id}
//       onClick={selectRoom}
//       isSelected={checkRoom}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="icon dropdown-item-icon"
//         width={24}
//         height={24}
//         viewBox="0 0 24 24"
//         strokeWidth={2}
//         stroke="currentColor"
//         fill="none"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//         <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
//       </svg>
//       {text || "..."}
//       <span class="badge bg-primary ms-auto"></span>
//     </a>
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
      } else {
        history.push(`/workspace/${workspaceId}/room/${id}/board`);
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
      {roomType === "Project" ? (
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
          <span class="badge bg-primary ms-auto"></span>
        </a>
      ) : roomType === "Chat" ? (
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
          <span class="badge bg-primary ms-auto"></span>
        </a>
      ) : (
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
          <span class="badge bg-primary ms-auto"></span>
        </a>
      )}
    </>
  );
}

export default SelectRoom;
