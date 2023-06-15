import React from "react";
import HeroComponent from "./HeroComponent.js";
import SuccessStoryComponent from "./SuccessStoryComponent.js";
import TopCompaniesComponent from "./TopCompaniesComponent";
function LandingPage() {
  return (
    <div className="landingPage">
        <HeroComponent />
        <TopCompaniesComponent />
        <SuccessStoryComponent />
    </div>
  );
}

export default LandingPage;
