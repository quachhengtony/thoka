import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../styles/LinksPage.css";
import db from "../adapters/firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function LinksPage() {
  const [linkWorkspaces, setLinkWorkspaces] = useState([]);
  const history = useHistory();
  const { currentUserEmail } = useCurrentUserDetails();
  const [message, setMessage] = useState("");

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
      db.collection("users")
        .doc(currentUserEmail)
        .collection("workspaces")
        .onSnapshot((snapshot) =>
          setLinkWorkspaces(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  return (
    <div className="inbox">
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Links</h2>
                <div className="text-muted mt-1">
                  Your team workspaces
                </div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <div className="me-3 d-none d-md-block">
                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search…"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="container-xl --inbox-container-xl">
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
      </div>
    </div>
  );
}

export default LinksPage;
