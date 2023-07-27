import React, { useState } from "react";
import "../../styles/SuccessStoryComponent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

function SuccessStoryComponent() {
  const [stories, useStories] = useState([
    {
      story:
        "This is one of the best portal. I would like to explain the interview process. The questions were 1. What is the deep and shallow copy? 2. Which is your strong programming language?",
      user: "John Doe",
    },
    {
      story:
        "This is one of the best portal. I would like to explain the interview process. The questions were 1. What is the deep and shallow copy? 2. Which is your strong programming language?",
      user: "Jane Doe",
    },
    {
      story:
        "This is one of the best portal. I would like to explain the interview process. The questions were 1. What is the deep and shallow copy? 2. Which is your strong programming language?",
      user: "Harsh Shah",
    },
    {
      story:
        "This is one of the best portal. I would like to explain the interview process. The questions were 1. What is the deep and shallow copy? 2. Which is your strong programming language?",
      user: "Lallan Chaurasia",
    },
  ]);

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
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {stories.map((st) => {
          return (
            <SwiperSlide className="storyCard">
              <div>
                <p className="story">
                  "{st.story}"<a href="#">...</a>
                </p>
                <p className="person">- {st.user}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SuccessStoryComponent;
