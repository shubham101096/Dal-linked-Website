import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useEffect, useState } from "react";
import SuccessStory from "./../components/SuccessStory";
import "./../styles/SuccessStoryPage.css";

function SuccessStoryPage(props) {
  const [jobSector, setJobSector] = useState([]);
  const [jobSectors, setJobSectors] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);

  useEffect(() => {
    console.log("Inside SuccessStoryPage");
    const jobsarray = [];
    props.stories.map((el) => jobsarray.push(el.jobSector));
    jobsarray.push("All Sectors");

    console.log(jobsarray);
    setJobSectors(jobsarray);
  }, [props]);

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
  return (
    <div className="storyArea">
      <div className="jobSectorSearchArea">
        <h1>Success stories</h1>{" "}
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
      <div className="storiesList">
        {filteredStories.map((element) => (
          <SuccessStory
            img={element.img}
            jobSector={element.jobSector}
            date={element.creationDate}
            content={element.message}
            likes={element.likes}
          />
        ))}
      </div>
    </div>
  );
}

export default SuccessStoryPage;
