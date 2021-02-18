import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Tasks.css";
import db from "../adapters/firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import TaskDescriptionModal from "./TaskDescriptionModal";
import { ColorPaletteMenuWithoutAnalytics } from "@atlaskit/color-picker";
import TaskUpdateModal from "./TaskUpdateModal";

export default function Tasks(props) {
  const { workspaceId, roomId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filterRooms, setFilterRooms] = useState([]);
  const { currentUserEmail } = useCurrentUserDetails();

  const [taskColumns, setTaskColumns] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskRoom, setTaskRoom] = useState("");

  const handleOpenTaskDescriptionModal = (taskDescription) => {
    setTaskDescription(taskDescription);
  };

  const handleGetTaskColumns = (cardRoomId) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(cardRoomId)
      .collection("columns")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setTaskColumns(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      );
  };

  useEffect(() => {
    if (currentUserEmail) {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("users")
        .doc(currentUserEmail)
        .collection("tasks")
        .onSnapshot((snapshot) =>
          setTasks(snapshot.docs.map((doc) => doc.data()))
        );
    }

    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .onSnapshot((snapshot) =>
        setFilterRooms(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div className="tasks" id="tasksPanel" style={{ width: props.tasksPanelWidth }}>
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Tasks</h2>
                <div className="text-muted mt-1">
                  Assigned tasks, details and related documents
                </div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <div className="me-3 d-none d-md-block">
                    <a
                      href="#"
                      className="nav-link px-0"
                      data-bs-toggle="dropdown"
                      tabIndex={-1}
                      aria-label="Show notifications"
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
                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                      {/* <span className="badge bg-red" /> */}
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                      <div className="card">
                        <div className="card-body">notifications</div>
                      </div>
                    </div>
                    {/* <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search tasks.."
                      />
                      <span className="input-icon-addon">
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
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xl --tasks-container-xl">
          {/* <div className="row row-deck row-cards">
            <div className="col-sm-6 col-lg-3 --tasks-col-sm-6">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-sm btn-square btn-primary"
                  data-bs-toggle="dropdown"
                >
                  ROOM FILTER
                </button>
                <div className="dropdown-menu">
                  {filterRooms.map((filterRoom, index) => (
                    <a className="dropdown-item" href="javascript:void(0)">
                      {filterRoom.roomName}
                    </a>
                  ))}
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-sm btn-square btn-primary"
                  data-bs-toggle="dropdown"
                >
                  PRIORITY FILTER
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Low to High
                  </a>
                  <a className="dropdown-item" href="#">
                    High to Low
                  </a>
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-sm btn-square btn-primary"
                  data-bs-toggle="dropdown"
                >
                  DEADLINE FILTER
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Most to Least
                  </a>
                  <a className="dropdown-item" href="#">
                    Least to Most
                  </a>
                </div>
              </div>
            </div>
          </div> */}
          <div className="tasks-box">
            <div>
              {/* <div className="card-header">
                <h3 className="card-title">Invoices</h3>
              </div> */}
              {/* <div className="card-body border-bottom py-3">
                <div className="d-flex">
                  <div className="text-muted">
                    Found
                    <div className="mx-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={0}
                        size={3}
                        aria-label="Tasks count"
                        disabled
                      />
                    </div>
                    tasks
                  </div>
                  <div className="ms-auto text-muted">
                    Search:
                    <div className="ms-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Search invoice"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
              <div className="table-responsive --tasks-today-table">
                <table className="table card-table table-vcenter">
                  <tbody>
                    <tr>
                      <td className="w-1 pe-0">
                        <input
                          type="checkbox"
                          className="form-check-input m-0 align-middle"
                          aria-label="Select task"
                          defaultChecked
                        />
                      </td>
                      <td className="w-100">
                        <a href="#" className="text-reset">
                          Lorem ipsum dolor sit amet
                        </a>
                      </td>
                      <td className="text-nowrap text-muted">
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
                          <rect x={4} y={5} width={16} height={16} rx={2} />
                          <line x1={16} y1={3} x2={16} y2={7} />
                          <line x1={8} y1={3} x2={8} y2={7} />
                          <line x1={4} y1={11} x2={20} y2={11} />
                          <line x1={11} y1={15} x2={12} y2={15} />
                          <line x1={12} y1={15} x2={12} y2={18} />
                        </svg>
                        February 25, 2021
                      </td>
                      {/* <td className="text-nowrap">
                        <a href="#" className="text-muted">
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
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                          2/7
                        </a>
                      </td> */}
                      <td className="text-nowrap">
                        <a href="#" className="text-muted">
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
                            <line x1="5" y1="9" x2="19" y2="9" />
                            <line x1="5" y1="15" x2="19" y2="15" />
                            <line x1="11" y1="4" x2="7" y2="20" />
                            <line x1="17" y1="4" x2="13" y2="20" />
                          </svg>
                          Lorem
                        </a>
                      </td>
                      <td>
                        <span
                          className="avatar avatar-sm"
                          style={{
                            backgroundImage:
                              "url('https://www.pngrepo.com/download/26474/avatar.png')",
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1 pe-0">
                        <input
                          type="checkbox"
                          className="form-check-input m-0 align-middle"
                          aria-label="Select task"
                          defaultChecked
                        />
                      </td>
                      <td className="w-100">
                        <a href="#" className="text-reset">
                          Lorem ipsum dolor sit amet
                        </a>
                      </td>
                      <td className="text-nowrap text-muted">
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
                          <rect x={4} y={5} width={16} height={16} rx={2} />
                          <line x1={16} y1={3} x2={16} y2={7} />
                          <line x1={8} y1={3} x2={8} y2={7} />
                          <line x1={4} y1={11} x2={20} y2={11} />
                          <line x1={11} y1={15} x2={12} y2={15} />
                          <line x1={12} y1={15} x2={12} y2={18} />
                        </svg>
                        February 25, 2021
                      </td>
                      {/* <td className="text-nowrap">
                        <a href="#" className="text-muted">
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
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                          2/7
                        </a>
                      </td> */}
                      <td className="text-nowrap">
                        <a href="#" className="text-muted">
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
                            <line x1="5" y1="9" x2="19" y2="9" />
                            <line x1="5" y1="15" x2="19" y2="15" />
                            <line x1="11" y1="4" x2="7" y2="20" />
                            <line x1="17" y1="4" x2="13" y2="20" />
                          </svg>
                          Lorem
                        </a>
                      </td>
                      <td>
                        <span
                          className="avatar avatar-sm"
                          style={{
                            backgroundImage:
                              "url('https://www.pngrepo.com/download/26474/avatar.png')",
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row row-deck row-cards">
                <div className="col-sm-6 col-lg-3 --tasks-col-sm-6">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-sm btn-square btn-primary"
                      data-bs-toggle="dropdown"
                    >
                      ROOM FILTER
                    </button>
                    <div className="dropdown-menu">
                      {filterRooms.map((filterRoom, index) => (
                        <a className="dropdown-item" href="javascript:void(0)">
                          {filterRoom.roomName}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-sm btn-square btn-primary"
                      data-bs-toggle="dropdown"
                    >
                      PRIORITY FILTER
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Low to High
                      </a>
                      <a className="dropdown-item" href="#">
                        High to Low
                      </a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-sm btn-square btn-primary"
                      data-bs-toggle="dropdown"
                    >
                      DEADLINE FILTER
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Most to Least
                      </a>
                      <a className="dropdown-item" href="#">
                        Least to Most
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body border-bottom py-3">
                <div className="d-flex">
                  <div className="text-muted">
                    Found
                    <div className="mx-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={0}
                        size={3}
                        aria-label="Tasks count"
                        disabled
                      />
                    </div>
                    tasks
                  </div>
                  <div className="ms-auto text-muted">
                    Search:
                    <div className="ms-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Search invoice"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive --tasks-table">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th className="w-1"></th>
                    <th>Subject</th>
                    <th>Assigned</th>
                    <th>Deadline</th>
                    <th>Reporter</th>
                    <th>Priority</th>
                    <th>Room</th>
                    <th>Document group</th>
                    <th className="w-1" />
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="form-check-input m-0 align-middle"
                          type="checkbox"
                          aria-label="Select tasks"
                        />
                      </td>
                      <td>
                        <a
                          className="text-reset"
                          href="javascript:void"
                          data-bs-toggle="modal"
                          data-bs-target="#modal-task-description"
                          onClick={() =>
                            handleOpenTaskDescriptionModal(task.cardBody)
                          }
                        >
                          {task.cardTitle}
                        </a>
                      </td>
                      <td>{task.cardCreatedDate}</td>
                      <td>{task.cardDeadline}</td>
                      <td>{task.cardReporter}</td>
                      <td>{task.cardPriority}</td>
                      <td>{task.cardRoomName}</td>
                      <td>{task.cardDocumentGroup}</td>
                      <td className="text-end">
                        <span className="dropdown">
                          <button
                            className="btn dropdown-toggle align-text-top btn-sm"
                            data-bs-boundary="viewport"
                            data-bs-toggle="dropdown"
                          >
                            Actions
                          </button>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0)"
                              onClick={() =>
                                handleGetTaskColumns(task.cardRoomId)
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#modal-task-update"
                            >
                              Update Task
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0)"
                            >
                              Remove Task
                            </a>
                          </div>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <TaskDescriptionModal
        taskRoom={taskRoom}
        taskDescription={taskDescription}
      />
      <TaskUpdateModal taskColumns={taskColumns} />
    </div>
  );
}
