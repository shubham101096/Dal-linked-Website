import React, { useState } from "react";
import profilePhoto from "./../images/profile.jpg";
import "./../styles/SuccessStory.css";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

function SuccessStory(props) {
  const [buttonValue, setButtonValue] = useState("");

  const [isLiked, setIsLiked] = useState(true);
  const handleLike = (el) => {
    if (isLiked) {
      alert("Like");

      //pass current users data to the backend and increase the count
      // axios.put();
    } else {
      alert("Unliked");
    }
    setIsLiked(!isLiked);
  };

  console.log(props);
  return (
    <div class="post">
      <img src={profilePhoto} className="postProfileImage" />
      <div class="storyCard">
        <div class="topline">
          <div class="jobSector">{props.jobSector}</div>
          <div class="datePosted">Posted: {props.date}</div>
        </div>
        <div class="content">{props.content}</div>
        <div class="bottomline">
          <div class="counter">{props.likes.length}</div>
          {isLiked ? (
            <Button variant="secondary" size="sm" onClick={handleLike}>
              <AiOutlineLike className="sendIcon" />
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={handleLike}>
              <AiFillLike className="sendIcon" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessStory;
