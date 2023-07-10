import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import JobListingsPage from "./Pages/JobListingsPage";
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
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
