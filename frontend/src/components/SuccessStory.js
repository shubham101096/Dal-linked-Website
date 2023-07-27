/* MADE BY PIYUSH AKOLIYA */

import React, { useState, useEffect } from "react";
import profilePhoto from "./../images/profile.jpg";
import "./../styles/SuccessStory.css";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import axios from "axios";
import { Card, Button, ListGroup } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";

function SuccessStory(props) {
  const [buttonValue, setButtonValue] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(null);
  const [userId, setUserId] = useState(props.studentId);
  const [likesArray, setLikesArray] = useState(props.likes ? props.likes : []);
  const { user } = useAuthContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    console.log(likesArray);
    const isUserLiked = likesArray.includes(userId);

    console.log(isUserLiked && isLiked);
    setIsLiked(isUserLiked);
    if (props.likes === undefined) {
      setLikeCount(0);
    } else {
      setLikeCount(props.likes.length);
    }
  }, []);

  function formatDateString(dateStr) {
    const date = new Date(dateStr);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }

  const handleLike = async (value) => {
    const updatedData = {
      userId: props.studentId,
    };

    console.log(`${value} received.`);
    if (value === "like") {
      // alert("Like");

      //get userId from the session

      await axios
        .put(`${backendUrl}/successStory/` + props.id, updatedData, {
          headers: {
            Authorization: "Bearer " + user.userToken,
          },
        })
        .then((res) => {
          setLikesArray(res.data.likes);
          setLikeCount(res.data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLiked(true);
    } else {
      // alert("Unliked");
      //get userId from the session
      const id = "";
      await axios
        .put(`${backendUrl}/successStory/dislike/` + props.id, updatedData, {
          headers: {
            Authorization: "Bearer " + user.userToken,
          },
        })
        .then((res) => {
          setLikesArray(res.data.likes);
          setLikeCount(res.data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLiked(false);
    }
  };

  return (
    <div className="post">
      <img src={props.profileImage} className="postProfileImage" />

      <ListGroup.Item className="p-0 mb-3 border-0">
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5>{props.jobSector}</h5>
            {props.userId === props.studentId ? (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => props.deleteStory(props.id)}
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Posted on: {formatDateString(props.date)}
            </Card.Subtitle>
            <Card.Text>{props.content}</Card.Text>
            <div className="count-line">
              <div className="counter">{likeCount}</div>
              {isLiked ? (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleLike("dislike")}
                >
                  <AiFillLike className="sendIcon" />
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleLike("like")}
                >
                  <AiOutlineLike className="sendIcon" />
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    </div>
  );
}

export default SuccessStory;
