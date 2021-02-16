import { useState, useEffect, useRef } from "react";
import "../styles/Settings.css";
import db from "../adapters/firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import firebase from "firebase";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";

function Settings() {
  const { workspaceId } = useParams();

  const [rooms, setRooms] = useState([]);
  const userEmail = useRef("");
  const [workspaceAuthor, setWorkspaceAuthor] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const [workspaceDetails, setWorkspaceDetails] = useState([]);
  const { currentUserName } = useCurrentUserDetails();
  const [userToLinkDetails, setUserToLinkDetails] = useState([]);
  const [message, setMessage] = useState("");

  const { currentUser, currentDate } = useStateValue();

  // const handleAddUsers = async () => {
  //   if (userEmail.current.value !== "") {
  //     await db.collection("workspaces")
  //       .doc(workspaceId)
  //       .collection("settings")
  //       .doc("link")
  //       .collection("users")
  //       .add({
  //         userEmail: userEmail.current.value,
  //         isAdmin: false,
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         date: currentDate
  //       })
  //       .then(() => {
  //         db.collection("users").doc(userEmail.current.value).collection("workspaces").doc(workspaceId).set({
  //           workspaceId: workspaceId,
  //           workspaceName: workspaceDetails.workspaceName,
  //           authorEmail: workspaceDetails.authorEmail,
  //           authorName: workspaceDetails.authorName,
  //           authorRole: workspaceDetails.authorRole,
  //           authorBusinessName: workspaceDetails.authorBusinessName,
  //           createdAt: workspaceDetails.date,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //         })
  //       })
  //       .catch(error => console.log(error))
  //     userEmail.current.value = "";
  //     alert("Added successfully!");
  //   }
  // };

  // const handleAddUsers = async () => {
  //   if (userEmail.current.value !== "") {
  //     try {
  //       await db
  //         .collection("users")
  //         .doc(userEmail.current.value)
  //         .get()
  //         .then((doc) => {
  //           setUserToLinkDetails(doc.data());
  //         });

  //       db.collection("workspaces")
  //         .doc(workspaceId)
  //         .collection("settings")
  //         .doc("link")
  //         .collection("users")
  //         .add({
  //           userEmail: userEmail.current.value,
  //           userName: userToLinkDetails.userName,
  //           userRole: userToLinkDetails.userRole,
  //           isAdmin: false,
  //           isAuthor: false,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           date: currentDate,
  //         });

  //       db.collection("users")
  //         .doc(userEmail.current.value)
  //         .collection("workspaces")
  //         .doc(workspaceId)
  //         .set({
  //           workspaceId: workspaceId,
  //           workspaceName: workspaceDetails.workspaceName,
  //           authorEmail: workspaceDetails.authorEmail,
  //           authorName: workspaceDetails.authorName,
  //           authorRole: workspaceDetails.authorRole,
  //           authorBusinessName: workspaceDetails.authorBusinessName,
  //           createdAt: workspaceDetails.date,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         });

  //       db.collection("workspaces")
  //         .doc(workspaceId)
  //         .collection("users")
  //         .doc(userEmail.current.value)
  //         .set({
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         });

  //       userEmail.current.value = "";
  //     } catch {
  //       setMessage("Failed to link user");
  //     }
  //   } else {
  //     return;
  //   }
  // };

  const handleAddUsers = async () => {
    const userEmail = prompt("User email");
    if (userEmail) {
      try {
        await db
          .collection("users")
          .doc(userEmail)
          .get()
          .then((doc) => {
            setUserToLinkDetails(doc.data());
          });

        db.collection("workspaces")
          .doc(workspaceId)
          .collection("settings")
          .doc("link")
          .collection("users")
          .add({
            userEmail: userEmail,
            userName: userToLinkDetails.userName,
            userRole: userToLinkDetails.userRole,
            isAdmin: false,
            isAuthor: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: currentDate,
          });

        db.collection("users")
          .doc(userEmail)
          .collection("workspaces")
          .doc(workspaceId)
          .set({
            workspaceId: workspaceId,
            workspaceName: workspaceDetails.workspaceName,
            authorEmail: workspaceDetails.authorEmail,
            authorName: workspaceDetails.authorName,
            authorRole: workspaceDetails.authorRole,
            authorBusinessName: workspaceDetails.authorBusinessName,
            createdAt: workspaceDetails.date,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

        db.collection("workspaces")
          .doc(workspaceId)
          .collection("users")
          .doc(userEmail)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      } catch {
        setMessage("Failed to link user");
      }
    } else {
      return;
    }
  };

  const deleteRoom = (roomId) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .delete()
      .then(function () {
        console.log("Room successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing room: ", error);
      });
  };

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .get()
      .then((doc) => setWorkspaceDetails(doc.data()))
      .catch((error) => console.log(error));

    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            roomName: doc.data().roomName,
            roomId: doc.id,
            authorName: doc.data().authorName,
            date: doc.data().date,
          }))
        )
      );
    db.collection("workspaces")
      .doc(workspaceId)
      .get()
      .then((doc) => setWorkspaceAuthor(doc.data()));
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("settings")
      .doc("link")
      .collection("users")
      .onSnapshot((snapshot) =>
        setWorkspaceUsers(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div className="settings">
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Settings</h2>
                <div className="text-muted mt-1">
                  {workspaceDetails.workspaceName} workspace
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card --settings-workspace-rename-card">
            <div className="card-body">
              <input
                type="text"
                className="form-control"
                placeholder="New workspace name..."
              />
              <a className="btn btn-primary">Rename</a>
            </div>
          </div> */}
          <div className="--settings-room-list-card">
            <div>
              <div className="card-header">
                <h3 className="card-title">Rooms</h3>
              </div>
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
                        aria-label="Invoices count"
                        disabled
                      />
                    </div>
                    rooms
                  </div>
                  <div className="ms-auto text-muted">
                    <a href="javascript:void(0)" className="button">
                      Create new room
                    </a>
                    {/* Search:
                    <div className="ms-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Search invoice"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Created</th>
                    <th className="w-1" />
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr>
                      <td>{room.roomName}</td>
                      <td className="text-muted">{room.authorName}</td>
                      <td className="text-muted">{room.date || <>...</>}</td>
                      <td>
                        <a
                          href="javascript:void(0)"
                          onClick={() => deleteRoom(room.roomId)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="card --settings-link-people-card">
            <div className="card-body">
              <input
                type="text"
                ref={userEmail}
                className="form-control"
                placeholder="johndoe@gmail.com"
              />
              <a
                href="javascript:void(0)"
                class="btn btn-primary"
                onClick={handleAddUsers}
              >
                Link
              </a>
            </div>
          </div> */}
          <div className="--settings-people-list-card">
            <div>
              <div className="card-header">
                <h3 className="card-title">People</h3>
              </div>
              <div className="card-body border-bottom py-3">
                <div className="d-flex">
                  <div className="text-muted">
                    Found
                    <div className="mx-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={2}
                        size={3}
                        aria-label="Invoices count"
                        disabled
                      />
                    </div>
                    users
                  </div>
                  <div className="ms-auto text-muted">
                    <a href="javascript:void(0)" onClick={handleAddUsers} className="button">
                      Link new user
                    </a>
                    {/* Search:
                    <div className="ms-2 d-inline-block">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Search invoice"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Linked</th>
                    <th className="w-1" />
                  </tr>
                </thead>
                <tbody>
                  {workspaceUsers.map((workspaceUser, index) => (
                    <tr key={index}>
                      <td>{workspaceUser.userName}</td>
                      <td className="text-muted">
                        {workspaceUser.isAdmin ? "Admin" : "Member"}
                      </td>
                      <td className="text-muted">{workspaceUser.date}</td>
                      <td>
                        <a href="javascript:void(0)">
                          {workspaceUser.isAdmin ? "" : "Admin"}
                        </a>
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

export default Settings;
