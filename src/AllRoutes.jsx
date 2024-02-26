import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SpinWheelGame from "./components/SpinWheelGame";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SpinWheelGame />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
