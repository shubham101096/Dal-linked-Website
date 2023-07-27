/* MADE BY PIYUSH AKOLIYA */

import React, { useState, useEffect } from "react";
import SuccessStoryPage from "./../Pages/SuccessStoryPage";
import PostSuccessStory from "./../components/PostSuccessStory";
import axios from "axios";
import "./../styles/MainStoryPage.css";
import { useAuthContext } from "../hooks/useAuthContext";
import placeholderImage from "../images/user-placeholder.jpg";
import Footer from "./../components/Footer";

function MainStoryPage() {
  const [stories, setStories] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const { user } = useAuthContext();
  useEffect(() => {
    axios.get(`${backendUrl}/successStory`).then((res) => {
      console.log(res.data.data);
      setStories(res.data.data);
    });
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [user]);
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/studentProfile/`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const userData = response.data;
      console.log(userData);
      setProfileImage(userData.profileImage || placeholderImage);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setStudentId(userData.studentId);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const handleStoryChange = (newStory) => {
    axios
      .get(`${backendUrl}/successStory`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setStories(res.data.data);
      });
  };
  if (!user) {
    return <p>Please signin to access this page.</p>;
  }
  return (
    <>
      <div className="mainStory">
        <PostSuccessStory
          onStoryUpdate={handleStoryChange}
          profileImage={profileImage}
          userId={studentId}
          firstName={firstName}
          lastName={lastName}
        />
        <hr></hr>
        <SuccessStoryPage stories={stories} userId={studentId} />
      </div>
      <Footer />
    </>
  );
}

export default MainStoryPage;
