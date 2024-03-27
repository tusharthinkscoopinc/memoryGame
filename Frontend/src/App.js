import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Form from "./components/Form";
import EmailVerification from "./components/EmailVerification";
import Dashboard from "./components/Dashboard";
import TermsAndConditions from "./components/TermsAndConditions";
import ResetPassword from "./components/ResetPassword";
import Homepage from "./components/Homepage";
import GameComponent from "./components/GameComponent";
import AdminPanel from "./components/adminPanel";

function App() {
  const isValidIdPresent = () => {
    const userId = localStorage.getItem("userId");
    return !!userId;
  };

  const ProtectedRoute = ({ element }) => {
    return isValidIdPresent() ? element : <Navigate to="/" />;
  };
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/forgot-password" element={<ResetPassword/>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
        <Route path="/Game" element={<GameComponent/>} />
        <Route path="/admin-panel" element={<AdminPanel/>} />
        <Route
          path="/email-verification"
          element={
            <ProtectedRoute
              element={<EmailVerification />}
              path="/email-verification"
            />
          }
        />
        {/* <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} path="/dashboard" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
