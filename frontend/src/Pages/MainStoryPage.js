import React, { useState, useEffect } from "react";
import SuccessStoryPage from "./../Pages/SuccessStoryPage";
import PostSuccessStory from "./../components/PostSuccessStory";
import axios from "axios";
import "./../styles/MainStoryPage.css";

function MainStoryPage() {
  const profilePhoto2 = "./images/profile2.jpg";
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/successStory").then((res) => {
      console.log(res.data.data);
      setStories(res.data.data);
    });
  }, []);

  const handleStoryChange = (newStory) => {
    setStories([...stories, newStory]);
    console.log("addedd data");
    console.log(stories);
  };

  return (
    <div className="mainStory">
      <PostSuccessStory onStoryUpdate={handleStoryChange} />
      <hr></hr>
      <SuccessStoryPage stories={stories} />
    </div>
  );
}

export default MainStoryPage;
