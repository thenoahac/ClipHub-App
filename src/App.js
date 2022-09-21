import React from "react";
import "./App.css";
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/LogIn/Login";
import Signup from "./pages/Signup/Signup";
import Scheduler from "./pages/Scheduler/Scheduler"
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
             <Route
              path="/login"
              element={<Login />}
            />
             <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
            <Route
              path="/Scheduler"
              element={<Scheduler />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;