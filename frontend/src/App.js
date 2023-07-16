import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
import CreateJobPost from "./components/CreateJobPost";
import EmployerPage from "./Pages/EmployerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import JobListingsPage from "./Pages/JobListingsPage";
import StudentListingsPage from "./Pages/StudentListingsPage";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/CreateJobPost" element={<CreateJobPost />} />
          <Route path="/EmployerPage" element={<EmployerPage />} />
          <Route path="/joblistings" element={<JobListingsPage />} />
            <Route path="/StudentListingsPage" element={<StudentListingsPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
