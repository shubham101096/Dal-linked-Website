import './App.css';
import ContactUs from "./components/ContactUs";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>
    </Router>
  );
}

export default App;
