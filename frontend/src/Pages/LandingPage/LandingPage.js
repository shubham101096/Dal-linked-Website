/* MADE BY PIYUSH AKOLIYA AND ADRIANA SANCHEZ */

import React from "react";
import HeroComponent from "./HeroSection.js";
import SuccessStoryComponent from "./SuccessStorySection.js";
import TopCompaniesComponent from "./TopCompaniesSection.js";
import CustomAlertsComponent from "./CustomAlertsSection.js";
import Footer from "./../../components/Footer.js";
function LandingPage() {
  return (
    <>
      <div className="landingPage">
        <HeroComponent />
        <SuccessStoryComponent />
        <CustomAlertsComponent />
        <TopCompaniesComponent />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
