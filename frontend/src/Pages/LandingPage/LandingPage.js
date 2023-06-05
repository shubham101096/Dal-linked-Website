import React from "react";
import HeroComponent from "./HeroComponent.js";
import SuccessStoryComponent from "./SuccessStoryComponent.js";
function LandingPage() {
  return (
    <div className="landingPage">
      <HeroComponent />
      <SuccessStoryComponent />
    </div>
  );
}

export default LandingPage;
