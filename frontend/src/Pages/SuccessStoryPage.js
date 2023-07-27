/* MADE BY PIYUSH AKOLIYA */

import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useEffect, useState } from "react";
import SuccessStory from "./../components/SuccessStory";
import "./../styles/SuccessStoryPage.css";
import { Container, ListGroup, Row, Col, Dropdown } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
function SuccessStoryPage(props) {
  const [jobSector, setJobSector] = useState("All Sectors");
  const [jobSectors, setJobSectors] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    if (props.stories.length > 0) {
      const jobsarray = ["All Sectors"];
      props.stories.forEach((el) => {
        if (!jobsarray.includes(el.jobSector)) {
          jobsarray.push(el.jobSector);
        }
      });
      // console.log(props.stories);
      console.log("44444");
      setJobSectors(jobsarray);
      setFilteredStories(props.stories);
    }
  }, [props.stories]);

  useEffect(() => {
    const jobsarray = ["All Sectors"];
    filteredStories.forEach((el) => {
      if (!jobsarray.includes(el.jobSector)) {
        jobsarray.push(el.jobSector);
      }
    });
    setJobSectors(jobsarray);
  }, [filteredStories]);

  const handleJobSectorChange = (eventKey) => {
    setJobSector(eventKey);

    if (eventKey === "All Sectors") {
      setFilteredStories(props.stories);
    } else {
      const filtered = props.stories.filter(
        (story) => story.jobSector === eventKey
      );
      setFilteredStories(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteData(id);
        }
      });
    } catch (error) {
      alert("Error deleting success story:", error);
    }
  };

  const deleteData = async (id) => {
    Swal.fire("Deleted!", "Your post has been deleted.", "success");
    await axios.delete(`${backendUrl}/successStory/${id}`);
    handleStoryDeleteChange();
  };
  const handleStoryDeleteChange = () => {
    axios.get(`${backendUrl}/successStory`).then((res) => {
      setFilteredStories(res.data.data);
    });
  };
  if (props.stories.length === 0) {
    return <div>No success Stories..</div>;
  }

  return (
    <Container>
      <div className="jobSectorSearchArea">
        <h1>Success stories</h1>
        <DropdownButton
          id="dropdown-basic-button"
          title={jobSector}
          style={{ display: "inline", paddingTop: "1.2%" }}
          onSelect={handleJobSectorChange}
        >
          {jobSectors.map((el) => (
            <Dropdown.Item key={el} eventKey={el}>
              {el}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={10}>
          <ListGroup className="text-left md-8">
            <ListGroup.Item className=" p-0 mb-3 border-0">
              <div className="storiesList">
                {filteredStories.map((element) => (
                  <SuccessStory
                    key={element._id}
                    id={element._id}
                    userId={element.userId}
                    img={element.img}
                    jobSector={element.jobSector}
                    date={element.creationDate}
                    content={element.message}
                    likes={element.likes}
                    profileImage={element.profileImage}
                    deleteStory={handleDelete}
                    studentId={props.userId}
                  />
                ))}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessStoryPage;
