import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import MainStoryPage from "./Pages/MainStoryPage";
import JobListingsPage from "./Pages/JobListingsPage";
import JobSectorsPage from "./Pages/JobSectorsPage";
import PendingEmpReqPage from "./Pages/PendingEmpReqPage";
import AnnouncementPage from "./Pages/Announcements";

function App() {
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
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
