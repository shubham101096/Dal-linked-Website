import "./styles/App.css";
import LandingPage from "./Pages/LandingPage/LandingPage.js";
import NavigationBar from "./components/NavigationBar.js";
import Footer from "./components/Footer.js";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
