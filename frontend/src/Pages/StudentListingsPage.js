import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import '../styles/StudentListingsPage.css';

function StudentListingsPage() {
    const students = [
        {
            id: 1,
            name: 'John Doe',
            mobileNumber: '+1234567890',
            about: 'I am a motivated and enthusiastic student...',
            skills: ['HTML', 'CSS', 'JavaScript'],
            workExperience: 'Intern at XYZ Company',
            education: "Bachelor's Degree in Computer Science",
            resume: 'Link to Resume',
            jobPreference: 'Web Developer',
            workStyle: 'Hybrid',
            jobSector: 'IT',
            appliedFor: 'Job A',
            profilePhoto: 'https://randomuser.me/api/portraits/men/81.jpg',
        },
        {
            id: 2,
            name: 'Jane Smith',
            mobileNumber: '+9876543210',
            about: 'I am a dedicated and detail-oriented student...',
            skills: ['Python', 'Data Analysis', 'SQL'],
            workExperience: 'Research Assistant at ABC University',
            education: "Master's Degree in Data Science",
            resume: 'Link to Resume',
            jobPreference: 'Data Analyst',
            workStyle: 'Remote',
            jobSector: 'Data Science',
            appliedFor: 'Job B',
            profilePhoto: 'https://randomuser.me/api/portraits/men/81.jpg',
        },
        // Add more student objects as needed
    ];

    return (
        <MDBContainer className="student-listings-container">
            {students.length === 0 ? (
                <div>
                    <h3>No students available currently.</h3>
                </div>
            ) : (
                students.map((student) => (
                    <MDBCard key={student.id} className="student-card">
                        <MDBCardBody className="p-4">
                            <MDBRow>
                                <MDBCol md="4" className="text-center">
                                    <MDBCardImage
                                        src={student.profilePhoto}
                                        alt="Profile"
                                        style={{ width: '180px', borderRadius: '10px' }}
                                    />
                                </MDBCol>
                                <MDBCol md="8">
                                    <div className="d-flex flex-column">
                                        <MDBCardTitle>{student.name}</MDBCardTitle>
                                        <MDBCardText>{student.jobPreference}</MDBCardText>

                                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                                            <div>
                                                <p className="small text-muted mb-1">Skills</p>
                                                <p className="mb-0">{student.skills.join(', ')}</p>
                                            </div>
                                            <div className="px-3">
                                                <p className="small text-muted mb-1">Work Experience</p>
                                                <p className="mb-0">{student.workExperience}</p>
                                            </div>
                                            <div>
                                                <p className="small text-muted mb-1">Education</p>
                                                <p className="mb-0">{student.education}</p>
                                            </div>
                                            <div>
                                                <p className="small text-muted mb-1">Applied for:</p>
                                                <p className="mb-0">{student.appliedFor}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex pt-1">
                                            <MDBBtn outline className="me-1 flex-grow-1">Actions</MDBBtn>
                                            <MDBBtn className="flex-grow-1">Resume</MDBBtn>
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                ))
            )}
        </MDBContainer>
    );
}

export default StudentListingsPage;
