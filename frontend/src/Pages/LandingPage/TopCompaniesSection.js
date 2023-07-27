/* MADE BY PIYUSH AKOLIYA AND ADRIANA SANCHEZ */

import React from "react";
import "../../styles/TopCompaniesComponent.css";

function TopCompaniesComponent() {

    return (
        <div className="topCompaniesSection">
            <div className="topCompanies-background">
                <div className="topCompanies-logos">
                    <img src={require('../../images/ibm_logo.png')} alt="logo-1" />
                    <img src={require('../../images/amazon_logo.png')} alt="logo-2" />
                    <img src={require('../../images/oracle_logo.png')} alt="logo-3" />
                    <img src={require('../../images/shopify_logo.png')} alt="logo-4" />
                </div>
                <p className="topCompanies-legend">Are the top companies using Dal Linked to recruit students !</p>
            </div>
        </div>
    );
}

export default TopCompaniesComponent;
