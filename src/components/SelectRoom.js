import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function SelectRoom({ text, id }) {
  const { workspaceId } = useParams();
  const [checkRoom, setCheckRoom] = useState();
  const history = useHistory();

  const selectRoom = () => {
    if (id) {
      history.push(`/workspace/${workspaceId}/room/${id}/chat`);
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
    myBtns.forEach(function (btn) {
      btn.addEventListener("click", () => {
        myBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }, []);

  return (
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
  );
}

export default SelectRoom;
