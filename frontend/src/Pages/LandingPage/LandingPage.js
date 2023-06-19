import React from "react";
import HeroComponent from "./HeroComponent.js";
import SuccessStoryComponent from "./SuccessStoryComponent.js";
import TopCompaniesComponent from "./TopCompaniesComponent";
import CustomAlertsComponent from "./CustomAlertsComponent";
function LandingPage() {
  return (
    <div className="landingPage">
        <HeroComponent />
        <TopCompaniesComponent />
        <CustomAlertsComponent />
        <SuccessStoryComponent />
    </div>
  );
}

export default LandingPage;
