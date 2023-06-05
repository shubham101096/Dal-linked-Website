import React from "react";
import NavigationBar from "../../components/NavigationBar.js";
import HeroComponent from "./HeroComponent.js";
import SuccessStoryComponent from "./SuccessStoryComponent.js";
function LandingPage() {
  return (
    <div className="landingPage">
      <NavigationBar />
      <HeroComponent />
      <SuccessStoryComponent />
    </div>
  );
}

export default LandingPage;
