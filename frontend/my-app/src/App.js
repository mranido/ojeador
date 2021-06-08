import React from "react";
// import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthProvider} from "./components/AuthContext";
import { Header } from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header/>
        <div>
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
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
