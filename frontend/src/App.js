import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQPage from "./Pages/FAQPage";
import ContactUs from "./Pages/ContactUs";
import JobSectorsPage from "./Pages/JobSectorsPage";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/jobSectors" element={<JobSectorsPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
