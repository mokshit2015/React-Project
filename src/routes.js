import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import EventDisplay from "./components/Events/EventDisplay";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./protectedRoutes";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <EventDisplay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
