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

function App() {
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
          </PrivateRoute>
          <PrivateRoute path="/links">
            <PrivateTopbar />
            <LinksPage />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/activities">
            <PrivateTopbar />
            <ActivitiesPage />
          </PrivateRoute>
          <PrivateRoute path="/b/dashboard">
            <PrivateTopbar />
            <DashboardPage />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/overview">
            <Sidebar />
            <WorkspaceOverview />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/undefined/chat">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/chat">
            <Sidebar />
            <Chat />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/board">
            <Sidebar />
            <Board />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/room/:roomId/schedule">
            <Sidebar />
            <Schedule />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/timeline">
            <Sidebar />
            <Timeline />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/reports">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/search">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/links">
            <Sidebar />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/account">
            <Sidebar />
          </PrivateRoute>

          <PrivateRoute path="/workspace/:workspaceId/storage">
            <Sidebar />
            <Storage />
          </PrivateRoute>
          <PrivateRoute path="/workspace/:workspaceId/settings">
            <Sidebar />
            <Settings />
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
