/* MADE BY PIYUSH AKOLIYA AND ADRIANA SANCHEZ */

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
        "Interview Experience: Encouraging atmosphere, rapport with the interviewer, and well-structured questions. Demonstrated skills and eagerness for the role, left with positive anticipation.",
      user: "John Doe",
    },
    {
      story:
        "Interview Experience: Challenging technical questions, friendly panel, and interactive coding session. Highlighted problem-solving abilities and domain knowledge, felt confident about the prospects.",
      user: "Jane Doe",
    },
    {
      story:
        "Interview Encounter: Supportive environment, in-depth behavioral inquiries, and a focus on teamwork. Showcased leadership and adaptability skills, left with excitement for the opportunity.",
      user: "Harsh Shah",
    },
    {
      story:
        "Interview Event: Engaging conversation, comprehensive assessment, and warm welcome. Effectively presented accomplishments, impressed by values and dynamics. Positive and hopeful outcome.",
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
                <p className="story">"{st.story}"</p>
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
