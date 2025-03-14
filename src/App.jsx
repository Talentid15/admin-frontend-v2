import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/index";

import ExtractDataFromPdf from "./pages/ExtractDataFromPdf";

import DashBoard from "./pages/DashBoard/DashBoard";
import Users from "./pages/Users/Users";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import ToDo from "./pages/ToDo/ToDo";
import Notepad from "./pages/Notepad/Notepad";
import User_M from "./pages/User_Management/User_M";
import Contact from "./pages/Contact/Contact";
import Candidates from "./pages/Users/Candidates";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/notepad" element={<Notepad />} />
            <Route path="/teammanagement" element={<User_M />} />

            <Route path="/extractInfo" element={<ExtractDataFromPdf />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
