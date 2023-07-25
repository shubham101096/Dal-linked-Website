import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import JobListingsPage from "./Pages/JobListingsPage";
import JobDetail from "./components/JobDetail";
import AppliedJobsPage from "./Pages/AppliedJobsPage";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/joblistings" element={<JobListingsPage />} />
          <Route path="/jobDetail" element={<JobDetail />} />
          <Route path="/appliedJobs" element={<AppliedJobsPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
