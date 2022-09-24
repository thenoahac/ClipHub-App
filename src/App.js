import React from "react";
import "./App.css";
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/LogIn/Login";
import Signup from "./pages/Signup/Signup";
import Scheduler from "./pages/Scheduler/Scheduler"
import Settings from "./pages/Settings/Settings";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

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
              element={<Signup/>}
            />
            <Route
              path="/settings"
              element={<Settings/>}
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
  const [light, setLight] = React.useState(true);
    return (
      <MuiThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <Button onClick={() => setLight(prev => !prev)}>Toggle Theme</Button>
      </MuiThemeProvider>
    );
}

export default App;