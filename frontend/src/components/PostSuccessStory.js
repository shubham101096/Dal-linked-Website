/* MADE BY PIYUSH AKOLIYA */

import React, { useEffect, useState } from "react";
import profilePhoto from "./../images/profile.jpg";
import "./../styles/PostSuccessStory.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BiSend } from "react-icons/bi";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

function getPostingDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  // Pad single-digit day and month with leading zero if needed
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}

function PostSuccessStory(props) {
  const [jobSector, setJobSector] = useState("None");
  const [storyComments, setStoryComments] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [jobSectorsPost, setJobSectorsPost] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const { user } = useAuthContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const handleJobSectorChange = (eventKey) => {
    console.log(eventKey);
    const selectedSector = jobSectorsPost.find((jsp) => jsp._id === eventKey);

    if (selectedSector) {
      setJobSector(selectedSector.name);
      validateForm(selectedSector.name, storyComments);
    }
  };

  const handleStoryCommentsChange = (event) => {
    const comments = event.target.value;
    setStoryComments(comments);
    validateForm(jobSector, comments);
  };

  const validateForm = (selectedSector, comments) => {
    const isValid = selectedSector !== "None" && comments.trim() !== "";
    setIsFormValid(isValid);
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/jobSectors`, {
        headers: {
          Authorization: "Bearer " + user.userToken,
        },
      })
      .then((res) => {
        setJobSectorsPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSendClick = async () => {
    if (isFormValid) {
      const UserName = props.firstName + " " + props.lastName;
      const newSuccessStory = {
        username: UserName,
        userId: props.userId,
        creationDate: new Date(),
        jobSector: jobSector,
        message: storyComments,
        profileImage: props.profileImage,
        likes: [],
      };
      console.log(newSuccessStory);
      await axios
        .post(`${backendUrl}/successStory`, newSuccessStory, {
          headers: {
            Authorization: "Bearer " + user.userToken,
          },
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log("error:" + err);
        });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success Story posted successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      props.onStoryUpdate(newSuccessStory);
      setStoryComments("");
      setJobSector("None");
    } else {
      Swal.fire(
        "Please provide your story details and the job Sector before sending."
      );
    }
  };
  if (!user) {
    return <p>Please signin to access this page.</p>;
  }
  return (
    <div className="container-fluid" style={{ display: "flex" }}>
      <img src={props.profileImage} className="postProfileImage" />
      <div className="storyDetails">
        <FloatingLabel controlId="story" label="Your Story..">
          <Form.Control
            as="textarea"
            placeholder="Write your story here"
            style={{ height: "8em" }}
            value={storyComments}
            onChange={handleStoryCommentsChange}
          />
        </FloatingLabel>
        <div className="postBottom">
          <DropdownButton
            id="dropdown-basic-button"
            title={jobSector}
            style={{ display: "inline", paddingTop: "1.2%" }}
            onSelect={handleJobSectorChange}
          >
            {jobSectorsPost.map((jsp) => (
              <Dropdown.Item key={jsp._id} eventKey={jsp._id}>
                {jsp.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <Button variant="secondary" size="sm" onClick={handleSendClick}>
            <BiSend className="sendIcon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostSuccessStory;
