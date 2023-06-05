import React from "react";
import "../../styles/SuccessStoryComponent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function SuccessStoryComponent() {
  return (
    <div className="successStoriesSection">
      <h1 className="successStoriesHeader">Success Stories</h1>
      <hr
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "1.5em",
        }}
      />
      <div className="storyList">
        <div className="storyCard">
          <p className="story">
            "This is one of the best portal. I would like to explain the
            interview peocess. The questions were 1. What is the deep and
            shallow copy? 2. Which is your strong programming language?"
            <a href="#">...</a>
          </p>
          <p className="person">- John Doe</p>
        </div>
        <div className="storyCard">
          <p className="story">
            "This is one of the best portal. I would like to explain the
            interview peocess. The questions were 1. What is the deep and
            shallow copy? 2. Which is your strong programming language?"
            <a href="#">...</a>
          </p>
          <p className="person">- John Doe</p>
        </div>
        <div className="storyCard">
          <p className="story">
            "This is one of the best portal. I would like to explain the
            interview peocess. The questions were 1. What is the deep and
            shallow copy? 2. Which is your strong programming language?"
            <a href="#">...</a>
          </p>
          <p className="person">- John Doe</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessStoryComponent;
