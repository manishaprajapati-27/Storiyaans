import React from "react";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const hideNavbar = ["/login", "/register"];
  const showNavbar = !hideNavbar.includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route Component={Home} path="/" element={<Home />} />
        <Route Component={Login} path="/login" element={<Login />} />
        <Route Component={Register} path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
