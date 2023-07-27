/* MADE BY PIYUSH AKOLIYA AND ADRIANA SANCHEZ */

import React from "react";
import "../../styles/CustomAlertsComponent.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";

function CustomAlertsComponent() {

    return (
        <div className="customAlertsSection">
            <div className="customAlerts-background">
                <div className="customAlerts-content">
                    <div className="customAlerts-text">
                        <h2>Get custom job alerts</h2>
                        <p>
                            Dal Linked allows users to receive tailored job alerts that align with their specific
                            preferences and desired job sectors.
                            By understanding the individual needs of each user, Dal Linked ensures that the job
                            notifications delivered are highly relevant and personalized.
                            Whether it's technology, finance, marketing, or any other sector, users can choose
                            their preferred job sectors, ensuring they receive updates on job opportunities that
                            best suit their skills and interests.
                        </p>
                    </div>
                    <FontAwesomeIcon icon={faBell} beat style={{color: "#EAE3D2",}} size="2x"/>
                </div>
            </div>
        </div>
    );
}

export default CustomAlertsComponent;
