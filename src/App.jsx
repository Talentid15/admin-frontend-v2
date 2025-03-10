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







function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} >
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/notepad" element={<Notepad />} />
          <Route path="/usermanagement" element={<User_M />} />
   
      
          <Route path="/extractInfo" element={<ExtractDataFromPdf />} />
          {/* <Route path="/backgroundchecks" element={<BackgroundChecks />}>
            <Route index element={<People />} />
            <Route path="insufficiency" element={<Insufficiency />} />
            <Route path="adduser" element={<AddUser />} />
          </Route>
          <Route path="/onboarding" element={<Onboarding />}>
            <Route index element={<Offered />} />
            <Route path="onboardplan" element={<OnboardPlan />} />
            <Route path="onboardingmaterial" element={<OnboardMaretial />} />
          </Route>
          <Route path="/settings" element={<Settings />}>
            <Route index element={<Profiles />} />
            <Route path="integration" element={<Integerations />} />
            <Route path="user" element={<Users />} />
            <Route path="subscription" element={<Subscriptions />} />
            <Route path="notification" element={<Notifications />} />
          </Route>
          <Route path="/offerIntelligence" element={<OfferIntelligence />}>
            <Route index element={<CandidateList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="prediction" element={<Predictions />} />
          </Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
