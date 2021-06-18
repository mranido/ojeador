import React from "react";
// import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { CreateContact } from "./components/CreateContact";
import { Notification } from "./components/Notifications";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="form-button">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/contact">
              <CreateContact />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
