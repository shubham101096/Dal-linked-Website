import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import MainStoryPage from "./Pages/MainStoryPage";
import JobListingsPage from "./Pages/JobListingsPage";

import JobSectorsPage from "./Pages/JobSectorsPage";
import PendingEmpReqPage from "./Pages/PendingEmpReqPage";
import AnnouncementPage from "./Pages/Announcements";

import { useAuthContext } from "./hooks/useAuthContext";
import RegistrationFormStudent from "./Pages/Registration/RegistrationStudent";
import RegistrationFormEmployer from "./Pages/Registration/RegistrationEmployer";

import LogInStudent from "./Pages/Login/StudentLogin";
import LogInEmployer from "./Pages/Login/EmployerLogin";
import LogInAdmin from "./Pages/Login/AdminLogin";

import TestStudent from "./Pages/testStudentOnlyPage";
import LoginSignUpPage from "./Pages/LoginSignUpPage";
import SavedJobsPage from "./Pages/SavedJobsPage";
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
          <Route path="/jobSectors" element={<JobSectorsPage />} />
          <Route path="/pendingEmpReq" element={<PendingEmpReqPage />} />
          <Route path="/announcements" element={<AnnouncementPage />} />
          <Route path="/savedJobs" element={<SavedJobsPage />} />
          {/* LOGIN / SIGNUP */}
          <Route
            path="/login-signup"
            element={
              !user ? <LoginSignUpPage /> : <Navigate to="/test-student" />
            }
          />
          {/* REGISTRATION ROUTES */}
          <Route
            path="/registration-student"
            element={
              !user ? (
                <RegistrationFormStudent />
              ) : (
                <Navigate to="/test-student" />
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
            element={!user ? <LogInStudent /> : <Navigate to="/test-student" />}
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
      <Footer />
    </div>
  );
}

export default App;
