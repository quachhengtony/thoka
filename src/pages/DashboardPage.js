import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "../styles/DashboardPage.css";
import db from "../adapters/firebase";
import { useStateValue } from "../contexts/StateProvider";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import ListWorkspace from "../components/ListWorkspace";
import CreateWorkpsaceModal from "../components/CreateWorkpsaceModal";
import { useHistory } from "react-router-dom";

function DashboardPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const { currentUser, currentDate } = useStateValue();
  const [isBusinessUser, setIsBusinessUser] = useState(false);
  const [workspaceUUID, setWorkspaceUUID] = useState("");
  const history = useHistory();
  const {
    currentUserName,
    currentUserEmail,
    currentUserUUId,
  } = useCurrentUserDetails();
  const [message, setMessage] = useState("");
  const [linkWorkspaces, setLinkWorkspaces] = useState([]);

  const handleCreateNewTemplateWorkspace = () => {
    setWorkspaceUUID(uuidv4());
  };

  // const createWorkspaceHandler = async () => {
  //   const workspaceName = prompt("Choose a workspace name");
  //   if (workspaceName) {
  //     await db.collection("workspaces").add({
  //       workspaceName: workspaceName,
  //       authorName: user.displayName,
  //       authorEmail: user.email,
  //       authorId: user.uid,
  //       date: currentDate,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     })
  //     .then(() => console.log("Workspace created successfully"))
  //     .catch(error => console.log(error))
  //   } else return;
  // };

  // const createWorkspaceHandler = async () => {
  //   const workspaceName = prompt("Choose a workspace name");
  //   if (workspaceName) {
  //     var workspaceUUID = uuidv4();
  //     await db
  //       .collection("workspaces")
  //       .doc(workspaceUUID)
  //       .set({
  //         workspaceName: workspaceName,
  //         authorName: user.displayName,
  //         authorEmail: user.email,
  //         authorId: user.uid,
  //         date: currentDate,
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(workspaceUUID)
  //           .collection("rooms")
  //           .add({
  //             roomName: "General",
  //             authorName: user.displayName,
  //             authorEmail: user.email,
  //             authorId: user.uid,
  //             date: currentDate,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(workspaceUUID)
  //           .collection("storage")
  //           .doc("Main")
  //           .set({
  //             groupName: "Main",
  //             authorName: user.displayName,
  //             authorId: user.uid,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(workspaceUUID)
  //           .collection("settings")
  //           .doc("link")
  //           .set({
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //       })
  //       .then(() => {
  //         db.collection("workspaces")
  //           .doc(workspaceUUID)
  //           .collection("settings")
  //           .doc("link")
  //           .collection("users")
  //           .add({
  //             userEmail: user.email,
  //             isAdmin: true,
  //             date: currentDate,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //           });
  //       })
  //       .catch((error) => console.error(error));
  //   } else return;
  // };

  // useEffect(() => {
  //   if (!!user) {
  //     db.collection("businessUsers")
  //       .doc(user.email)
  //       .get()
  //       .then(doc => {
  //         if (doc.exists) {
  //           setIsBusinessUser(true);
  //         } else {
  //           setIsBusinessUser(false);
  //         }
  //       })
  //       .catch(error => console.log(error));
  //   }
  //   db.collection("workspaces")
  //     .where("authorId", "==", currentUserUUId)
  //     .onSnapshot((snapshot) =>
  //       setWorkspaces(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           name: doc.data().workspaceName,
  //           date: doc.data().date,
  //           author: doc.data().authorName,
  //         }))
  //       )
  //     );
  // }, []);

  const handleRemoveWorkspaceFromUser = async (workspaceId) => {
    if (workspaceId === "") {
      return;
    }
    try {
      setMessage("");
      await db
        .collection("users")
        .doc(currentUserEmail)
        .collection("workspaces")
        .doc(workspaceId)
        .delete()
        .then(() => {
          setMessage("Removed workspace successfully");
        })
        .catch((error) => console.log(error));
    } catch {
      setMessage("Failed to remove workspace");
    }
  };

  useEffect(() => {
    if (currentUserEmail) {
      db.collection("businessUsers")
        .doc(currentUserEmail)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsBusinessUser(true);
            db.collection("workspaces")
              .where("authorEmail", "==", currentUserEmail)
              .onSnapshot((snapshot) =>
                setWorkspaces(
                  snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().workspaceName,
                    timestamp: doc.data().timestamp,
                    authorBusiness: doc.data().authorBusinessName,
                  }))
                )
              );
          } else {
            setIsBusinessUser(false);
          }
        })
        .catch((error) => console.log(error));

        db.collection("users")
        .doc(currentUserEmail)
        .collection("workspaces")
        .onSnapshot((snapshot) =>
          setLinkWorkspaces(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="content">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Overview</div>
                <h2 className="page-title">Workspaces</h2>
              </div>
              {isBusinessUser && (
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <span className="d-none d-sm-inline">
                    <a href="javascipt:void(0)" className="btn btn-white">
                      New blank workspace
                    </a>
                  </span>
                  <button
                    className="btn btn-primary d-none d-sm-inline-block"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-new-workspace"
                    onClick={handleCreateNewTemplateWorkspace}
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
                    New template workspace
                  </button>
                  <a
                    href="#"
                    className="btn btn-primary d-sm-none btn-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-report"
                    aria-label="Create new report"
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
                  </a>
                </div>
              </div>
              )}
            </div>
          </div>
          <div className="row row-cards">
          {linkWorkspaces.map((linkWorkspace, index) => (
              <div className="col-lg-6" key={index}>
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-3">
                        <img
                          src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Docker-Logo-White-RGB_Moby.png?itok=VwIPWvAs"
                          alt="Workspace"
                          className="rounded"
                        />
                      </div>
                      <div className="col">
                        <h3 className="card-title mb-1">
                          <a
                            href="javascript:void(0)"
                            className="text-reset"
                            onClick={() =>
                              history.push(
                                `/workspace/${linkWorkspace.workspaceId}/overview`
                              )
                            }
                          >
                            {linkWorkspace.workspaceName}
                          </a>
                        </h3>
                        <div className="text-muted">
                          Author: {linkWorkspace.authorName}
                        </div>
                        <div className="text-muted">
                          Employer: {linkWorkspace.authorBusinessName}
                        </div>
                        <div className="text-muted">
                          Created at: {linkWorkspace.createdAt}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="dropdown">
                          <a
                            href="#"
                            className="card-dropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={12} cy={19} r={1} />
                              <circle cx={12} cy={5} r={1} />
                            </svg>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a
                              href="javascript:void(0)"
                              className="dropdown-item"
                              onClick={() =>
                                handleRemoveWorkspaceFromUser(
                                  linkWorkspace.workspaceId
                                )
                              }
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        {isBusinessUser && (
          <>
            <div className="container-xl">
              {/* <div className="page-header d-print-none">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="page-pretitle">Overview</div>
                    <h2 className="page-title">Dashboard</h2>
                  </div>
                  <div className="col-auto ms-auto d-print-none">
                    <div className="btn-list">
                      <span className="d-none d-sm-inline">
                        <a href="javascipt:void(0)" className="btn btn-white">
                          New blank workspace
                        </a>
                      </span>
                      <button
                        className="btn btn-primary d-none d-sm-inline-block"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-new-workspace"
                        onClick={handleCreateNewTemplateWorkspace}
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
                        New template workspace
                      </button>
                      <a
                        href="#"
                        className="btn btn-primary d-sm-none btn-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-report"
                        aria-label="Create new report"
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
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="row row-deck row-cards">
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="subheader">Active</div>
                        {/* <div className="ms-auto lh-1">
                <div className="dropdown">
                  <a className="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item active" href="#">Last 7 days</a>
                    <a className="dropdown-item" href="#">Last 30 days</a>
                    <a className="dropdown-item" href="#">Last 3 months</a>
                  </div>
                </div>
              </div> */}
                      </div>
                      <div className="h1 mb-3">2/6</div>
                      <div className="d-flex mb-2">
                        <div>Conversion rate</div>
                        {/* <div className="ms-auto">
                <span className="text-green d-inline-flex align-items-center lh-1">
                  7% <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                </span>
              </div> */}
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-blue"
                          style={{ width: "75%" }}
                          role="progressbar"
                          aria-valuenow={75}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="visually-hidden">75% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="subheader">Used</div>
                        {/* <div className="ms-auto lh-1">
                <div className="dropdown">
                  <a className="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item active" href="#">Last 7 days</a>
                    <a className="dropdown-item" href="#">Last 30 days</a>
                    <a className="dropdown-item" href="#">Last 3 months</a>
                  </div>
                </div>
              </div> */}
                      </div>
                      <div className="h1 mb-3">0.4/5GB</div>
                      <div className="d-flex mb-2">
                        <div>Conversion rate</div>
                        {/* <div className="ms-auto">
                <span className="text-green d-inline-flex align-items-center lh-1">
                  7% <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                </span>
              </div> */}
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-blue"
                          style={{ width: "75%" }}
                          role="progressbar"
                          aria-valuenow={75}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="visually-hidden">75% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="subheader">Reports</div>
                        {/* <div className="ms-auto lh-1">
                <div className="dropdown">
                  <a className="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item active" href="#">Last 7 days</a>
                    <a className="dropdown-item" href="#">Last 30 days</a>
                    <a className="dropdown-item" href="#">Last 3 months</a>
                  </div>
                </div>
              </div> */}
                      </div>
                      <div className="h1 mb-3">12</div>
                      <div className="d-flex mb-2">
                        <div>Conversion rate</div>
                        {/* <div className="ms-auto">
                <span className="text-green d-inline-flex align-items-center lh-1">
                  7% <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                </span>
              </div> */}
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-blue"
                          style={{ width: "75%" }}
                          role="progressbar"
                          aria-valuenow={75}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="visually-hidden">75% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="subheader">Created</div>
                        {/* <div className="ms-auto lh-1">
                <div className="dropdown">
                  <a className="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item active" href="#">Last 7 days</a>
                    <a className="dropdown-item" href="#">Last 30 days</a>
                    <a className="dropdown-item" href="#">Last 3 months</a>
                  </div>
                </div>
              </div> */}
                      </div>
                      <div className="h1 mb-3">7</div>
                      <div className="d-flex mb-2">
                        <div>Conversion rate</div>
                        {/* <div className="ms-auto">
                <span className="text-green d-inline-flex align-items-center lh-1">
                  7% <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                </span>
              </div> */}
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-blue"
                          style={{ width: "75%" }}
                          role="progressbar"
                          aria-valuenow={75}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="visually-hidden">75% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-xl --manage-container-xl">
              <div className="row row-cards">
                <div className="col-12">
                  {/* <div className="card"> */}
                  <div className="table-responsive --dashboard-page-table">
                    <table className="table table-vcenter card-table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Created</th>
                          <th>Business</th>
                          <th className="w-1" />
                        </tr>
                      </thead>
                      <tbody>
                        {workspaces.map((workspace, index) => (
                          <ListWorkspace
                            id={workspace.id}
                            name={workspace.name}
                            timestamp={workspace.timestamp}
                            authorBusiness={workspace.authorBusiness}
                            number={index}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* </div> */}
          </>
        )}
        <CreateWorkpsaceModal workspaceUUID={workspaceUUID} />
      </div>
    </div>
  );
}

export default DashboardPage;
