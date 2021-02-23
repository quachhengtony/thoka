// import { useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./styles/App.css";
// import Sidebar from "./components/Sidebar";
// import Chat from "./components/Chat";
// import SignInPage from "./pages/SignInPage";
// import DashboardPage from "./pages/DashboardPage";
// import { Topbar, PrivateTopbar } from "./components/Topbar";
// import ProfileAccountPage from "./pages/ProfileAccountPage";
// import Timeline from "./components/Timeline";
// import Board from "./components/Board";
// import Schedule from "./components/Schedule";
// import Storage from "./components/Storage";
// import Settings from "./components/Settings";
// import RoomVideoConference from "./components/RoomVideoConference";
// import LinksPage from "./pages/LinksPage";
// import PrivateRoute from "./components/PrivateRoute";
// import HomePage from "./pages/HomePage";
// import SignUpPage from "./pages/SignUpPage";
// import ActivitiesPage from "./pages/ActivitiesPage";
// import Footer from "./components/Footer";
// import WorkspaceOverview from "./components/WorkspaceOverview";
// import Tasks from "./components/Tasks";

// function App() {
//   var rightBar = null;
//   const [rightBarDisplay, setRighbarDisplay] = useState("");
//   const [chatPanelWidth, setChatPanelWidth] = useState("");
//   const [boardPanelWidth, setBoardPanelWidth] = useState("");
//   const [tasksPanelWidth, setTasksPanelWidth] = useState("");
//   const [overviewPanelWidth, setOverviewPanelWidth] = useState("");
//   const [settingsPanelWidth, setSettingsPanelWidth] = useState("");
//   const [storagePanelWidth, setStoragePanelWidth] = useState("");

//   const handleHideRightbar = () => {
//     rightBar = document.querySelector("#rightBar");

//     if (rightBar.style.display === "") {
//       rightBar.style.display = "none";
//       setRighbarDisplay("none");
//       setBoardPanelWidth("97vw");
//       setChatPanelWidth("97vw");
//       setTasksPanelWidth("97vw");
//       setOverviewPanelWidth("97vw");
//       setSettingsPanelWidth("97vw");
//       setStoragePanelWidth("97vw");
//     } else {
//       rightBar.style.display = "";
//       setRighbarDisplay("");
//       setChatPanelWidth("78vw");
//       setBoardPanelWidth("78vw");
//       setTasksPanelWidth("78vw");
//       setOverviewPanelWidth("78vw");
//       setSettingsPanelWidth("78vw");
//       setStoragePanelWidth("78vw");
//     }
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Switch>
//           <Route exact path="/">
//             <Topbar />
//             <HomePage />
//           </Route>
//           <Route path="/signin">
//             <SignInPage />
//           </Route>
//           <Route path="/signup">
//             <SignUpPage />
//           </Route>

//           <PrivateRoute path="/profile-account">
//             <PrivateTopbar />
//             <ProfileAccountPage />
//           </PrivateRoute>
//           <PrivateRoute path="/notifications">
//             <PrivateTopbar />
//           </PrivateRoute>
//           <PrivateRoute path="/links">
//             <PrivateTopbar />
//             <LinksPage />
//             <Footer />
//           </PrivateRoute>
//           <PrivateRoute path="/activities">
//             <PrivateTopbar />
//             <ActivitiesPage />
//           </PrivateRoute>
//           <PrivateRoute path="/b/dashboard">
//             <PrivateTopbar />
//             <DashboardPage />
//           </PrivateRoute>

//           <PrivateRoute path="/workspace/:workspaceId/overview">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <WorkspaceOverview overviewPanelWidth={overviewPanelWidth} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/tasks">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Tasks tasksPanelWidth={tasksPanelWidth} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/inbox">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/room/undefined/chat">
//             <Sidebar />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/room/:roomId/chat">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Chat chatPanelWidth={chatPanelWidth} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/room/:roomId/board">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Board boardPanelWidth={boardPanelWidth} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/room/:roomId/schedule">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Schedule />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/timeline">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Timeline />
//           </PrivateRoute>

//           <PrivateRoute path="/workspace/:workspaceId/reports">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/search">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/links">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/account">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//           </PrivateRoute>

//           <PrivateRoute path="/workspace/:workspaceId/storage">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Storage storagePanelWidth={storagePanelWidth} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/settings">
//             <Sidebar handleHideRightbar={handleHideRightbar} />
//             <Settings settingsPanelWidth={settingsPanelWidth} />
//           </PrivateRoute>
//           <PrivateRoute path="/workspace/:workspaceId/room/:roomId/video/:videoId">
//             <RoomVideoConference />
//           </PrivateRoute>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import { Topbar, PrivateTopbar } from "./components/Topbar";
import ProfileAccountPage from "./pages/ProfileAccountPage";
import Timeline from "./components/Timeline";
import Board from "./components/Board";
import Schedule from "./components/Schedule";
import Storage from "./components/Storage";
import Settings from "./components/Settings";
import RoomVideoConference from "./components/RoomVideoConference";
import LinksPage from "./pages/LinksPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import Footer from "./components/Footer";
import WorkspaceOverview from "./components/WorkspaceOverview";
import Tasks from "./components/Tasks";
import ProjectRoom from "./components/ProjectRoom";
import MaintenancePage from "./pages/MaintenancePage";

function App() {
  var rightBar = null;
  const [rightBarDisplay, setRighbarDisplay] = useState("");
  const [chatPanelWidth, setChatPanelWidth] = useState("");
  const [boardPanelWidth, setBoardPanelWidth] = useState("");
  const [tasksPanelWidth, setTasksPanelWidth] = useState("");
  const [overviewPanelWidth, setOverviewPanelWidth] = useState("");
  const [settingsPanelWidth, setSettingsPanelWidth] = useState("");
  const [storagePanelWidth, setStoragePanelWidth] = useState("");
  const [projectRoomPanelWidth, setProjectRoomPanelWidth] = useState("");

  const handleHideRightbar = () => {
    rightBar = document.querySelector("#rightBar");

    if (rightBar.style.display === "") {
      rightBar.style.display = "none";
      setRighbarDisplay("none");
      setBoardPanelWidth("97vw");
      setChatPanelWidth("97vw");
      setTasksPanelWidth("97vw");
      setOverviewPanelWidth("97vw");
      setSettingsPanelWidth("97vw");
      setStoragePanelWidth("97vw");
      setProjectRoomPanelWidth("97vw");
    } else {
      rightBar.style.display = "";
      setRighbarDisplay("");
      setChatPanelWidth("78vw");
      setBoardPanelWidth("78vw");
      setTasksPanelWidth("78vw");
      setOverviewPanelWidth("78vw");
      setSettingsPanelWidth("78vw");
      setStoragePanelWidth("78vw");
      setProjectRoomPanelWidth("78vw");
    }
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Topbar />
            <HomePage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <PrivateRoute path="/profile-account">
            <PrivateTopbar />
            <ProfileAccountPage />
          </PrivateRoute>
          <PrivateRoute path="/notifications">
            <PrivateTopbar />
            <MaintenancePage />
          </PrivateRoute>
          <PrivateRoute path="/activities">
            <PrivateTopbar />
            <ActivitiesPage />
          </PrivateRoute>
          <PrivateRoute path="/workspaces">
            <PrivateTopbar />
            <DashboardPage />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <PrivateTopbar />
            <MaintenancePage />
          </PrivateRoute>
          <PrivateRoute path="/teams">
            <PrivateTopbar />
            <MaintenancePage />
          </PrivateRoute>
          <PrivateRoute path="/announcements">
            <PrivateTopbar />
            <MaintenancePage />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/overview">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <WorkspaceOverview overviewPanelWidth={overviewPanelWidth} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/tasks">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Tasks tasksPanelWidth={tasksPanelWidth} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/inbox">
            <Sidebar handleHideRightbar={handleHideRightbar} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/undefined/chat">
            <Sidebar />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/project">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <ProjectRoom projectRoomPanelWidth={projectRoomPanelWidth} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/chat">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Chat chatPanelWidth={chatPanelWidth} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/board">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Board boardPanelWidth={boardPanelWidth} />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/schedule">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Schedule />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/timeline">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Timeline />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/reports">
            <Sidebar handleHideRightbar={handleHideRightbar} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/search">
            <Sidebar handleHideRightbar={handleHideRightbar} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/links">
            <Sidebar handleHideRightbar={handleHideRightbar} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/account">
            <Sidebar handleHideRightbar={handleHideRightbar} />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/storage">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Storage storagePanelWidth={storagePanelWidth} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/settings">
            <Sidebar handleHideRightbar={handleHideRightbar} />
            <Settings settingsPanelWidth={settingsPanelWidth} />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/video/:videoId">
            <RoomVideoConference />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
