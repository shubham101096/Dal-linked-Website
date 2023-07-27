import "./styles/App.css";
//import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateJobPost from "./components/CreateJobPost";
import EmployerPage from "./Pages/EmployerPage";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import MainStoryPage from "./Pages/MainStoryPage";
import JobListingsPage from "./Pages/JobListingsPage";
import AppliedJobsPage from "./Pages/AppliedJobsPage";

import JobSectorsPage from "./Pages/JobSectorsPage";
import PendingEmpReqPage from "./Pages/PendingEmpReqPage";
import AnnouncementPage from "./Pages/Announcements";
import ActiveEmpPage from "./Pages/ActiveEmpPage";

import { useAuthContext } from "./hooks/useAuthContext";
import RegistrationFormStudent from "./Pages/Registration/RegistrationStudent";
import RegistrationFormEmployer from "./Pages/Registration/RegistrationEmployer";

import LogInStudent from "./Pages/Login/StudentLogin";
import LogInEmployer from "./Pages/Login/EmployerLogin";
import LogInAdmin from "./Pages/Login/AdminLogin";

import TestStudent from "./Pages/testStudentOnlyPage";
import LoginSignUpPage from "./Pages/LoginSignUpPage";
import SavedJobsPage from "./Pages/SavedJobsPage";

import StudentProfileDetails from "./Pages/StudentProfileDetailsPage";

import StudentListingsPage from "./Pages/StudentListingsPage";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/mainStoryPage" element={<MainStoryPage />} />
          <Route path="/joblistings" element={<JobListingsPage />} />
          <Route path="/appliedJobs" element={<AppliedJobsPage />} />
          <Route path="/jobSectors" element={<JobSectorsPage />} />
          <Route path="/pendingEmpReq" element={<PendingEmpReqPage />} />
          <Route path="/announcements" element={<AnnouncementPage />} />
          <Route path="/savedJobs" element={<SavedJobsPage />} />
          <Route path="/activeEmp" element={<ActiveEmpPage />} />
          <Route path="/EmployerPage" element={<EmployerPage />} />
          <Route path="/CreateJobPost" element={<CreateJobPost />} />
          <Route
            path="/StudentListingsPage"
            element={<StudentListingsPage />}
          />

          <Route path="/student-profile" element={<StudentProfileDetails />} />

          {/* LOGIN / SIGNUP */}
          <Route
            path="/login-signup"
            element={
              !user ? <LoginSignUpPage /> : <Navigate to="/" />
            }
          />
          {/* REGISTRATION ROUTES */}
          <Route
            path="/registration-student"
            element={
              !user ? (
                <RegistrationFormStudent />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/registration-employer"
            element={!user ? <RegistrationFormEmployer /> : <Navigate to="/" />}
          />

          {/* LOGIN ROUTES */}
          <Route
            path="/login-student"
            element={!user ? <LogInStudent /> : <Navigate to="/" />}
          />
          <Route
            path="/login-employer"
            element={!user ? <LogInEmployer /> : <Navigate to="/" />}
          />
          <Route
            path="/login-admin"
            element={!user ? <LogInAdmin /> : <Navigate to="/" />}
          />

          {/* TEST ROUTES */}
          <Route
            path="/test-student"
            element={user ? <TestStudent /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
