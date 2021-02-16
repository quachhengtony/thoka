import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Tasks.css";
import db from "../adapters/firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

export default function Tasks() {
  const { workspaceId, roomId } = useParams();
  const [tasks, setTasks] = useState([]);
  const { currentUserEmail } = useCurrentUserDetails();

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
  }, []);

  return (
    <div className="tasks">
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
                        <div className="card-body">
                          This is a work in progress pre-alpha. Our website is
                          under construction and everything is subject to
                          change. Follow us for updates.
                        </div>
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
                  <a className="dropdown-item" href="#">
                    General
                  </a>
                  <a className="dropdown-item" href="#">
                    Random
                  </a>
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
          <div className="tasks-box">
            <div>
              {/* <div className="card-header">
                <h3 className="card-title">Invoices</h3>
              </div> */}
              <div className="card-body border-bottom py-3">
                <div className="d-flex">
                  <div className="text-muted">
                    Found
                    <div className="mx-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={1}
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
                    <th className="w-1">
                      {/* <input
                      className="form-check-input m-0 align-middle"
                      type="checkbox"
                      aria-label="Select all invoices"
                    /> */}
                    </th>
                    <th>Subject</th>
                    <th>Assigned</th>
                    <th>Deadline</th>
                    <th>Reporter</th>
                    <th>Priority</th>
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
                          href="javascript:void(0)"
                          className="text-reset"
                          tabIndex={-1}
                        >
                          {task.cardTitle}
                        </a>
                      </td>

                      <td>{task.cardCreatedDate}</td>
                      <td>{task.cardDeadline}</td>
                      <td>{task.cardReporter}</td>
                      <td>{task.cardPriority}</td>
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
                            <a className="dropdown-item" href="#">
                              Open
                            </a>
                            <a className="dropdown-item" href="#">
                              Update
                            </a>
                            <a className="dropdown-item" href="#">
                              Remove
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
    </div>
  );
}
