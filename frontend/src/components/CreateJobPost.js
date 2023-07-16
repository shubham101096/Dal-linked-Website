import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CreateJobPost.css';

const CreateJobPost = () => {
    const [step, setStep] = useState(1);
    const [companyName, setCompanyName] = useState('');
    const [openPos, setOpenPos] = useState('');
    const [jobSector, setJobSector] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobLoc, setJobLoc] = useState('');
    const [jobType, setJobType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [ctc, setCtc] = useState('');
    const [requirements, setRequirements] = useState('');
    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [benefits, setBenefits] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [hrEmail, setHrEmail] = useState('');
    const [deadline, setDeadline] = useState('');
    const [validationError, setValidationError] = useState('');
    const [jobPostData, setJobPostData] = useState(null);

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            companyName.trim() === '' ||
            openPos.trim() === '' ||
            jobSector.trim() === '' ||
            jobTitle.trim() === '' ||
            jobLoc.trim() === '' ||
            jobType.trim() === '' ||
            startDate === '' ||
            requirements.trim() === '' ||
            skill1.trim() === '' ||
            skill2.trim() === '' ||
            skill3.trim() === '' ||
            ctc.trim() === '' ||
            benefits.trim() === '' ||
            jobDesc.trim() === '' ||
            hrEmail.trim() === '' ||
            deadline === ''
        ) {
            setValidationError('Please fill in all fields');
            return;
        }

        // Reset validation error
        setValidationError('');

        const formData = {
            companyName,
            noOfPositions: parseInt(openPos),
            jobSector,
            title: jobTitle,
            location: jobLoc,
            type: jobType,
            startDate,
            salary: parseInt(ctc),
            requirement: requirements,
            skills: [
                { skillName: skill1 },
                { skillName: skill2 },
                { skillName: skill3 }
            ],
            hrEmail,
            description: jobDesc,
            benefits: benefits,
            postedDate: new Date(),
            endDate: deadline,
            employeeId: "01" //it will be fetched from the logged in employee
        };

        fetch('http://localhost:3003/jobs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            toast.success('Form submitted successfully!');
            setJobPostData(data.job);
            resetFormFields();
        })
        .catch((error) => {
            toast.error('Error submitting form');
            console.error('Error:', error);
        });
    };

    const resetFormFields = () => {
        setCompanyName('');
        setOpenPos('');
        setJobSector('');
        setJobLoc('');
        setJobTitle('');
        setJobType('');
        setStartDate('');
        setCtc('');
        setRequirements('');
        setSkill1('');
        setSkill2('');
        setSkill3('');
        setBenefits('');
        setJobDesc('');
        setHrEmail('');
        setDeadline('');

        setStep(1);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <div className="step-heading">Section 1</div>
                        <div className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="companyName" className="block font-medium mb-1">
                                    Company Name: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="openPos" className="block font-medium mb-1">
                                    Open Positions: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="openPos"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={openPos}
                                    onChange={(e) => setOpenPos(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jobSector" className="block font-medium mb-1">
                                    Job Sector: <span className="red-star">*</span>
                                </label>
                                <select
                                    id="jobSector"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={jobSector}
                                    onChange={(e) => setJobSector(e.target.value)}
                                    required
                                >
                                    <option value="">Select the job sector</option>
                                    <option value="1">IT Service</option>
                                    <option value="2">IT Product</option>
                                    <option value="3">Data Science</option>
                                    <option value="4">Analytics</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jobTitle" className="block font-medium mb-1">
                                    Job Title: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="step-heading">Section 2</div>
                        <div className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="jobLoc" className="block font-medium mb-1">
                                    Job Location: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="jobLoc"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={jobLoc}
                                    onChange={(e) => setJobLoc(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jobType" className="block font-medium mb-1">
                                    Job Type: <span className="red-star">*</span>
                                </label>
                                <select
                                    id="jobType"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    required
                                >
                                    <option value="">Select the job type</option>
                                    <option value="1">Full-Time</option>
                                    <option value="2">Part-Time</option>
                                    <option value="3">COOP</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="startDate" className="block font-medium mb-1">
                                    Start Date: <span className="red-star">*</span>
                                </label>
                                <DatePicker
                                    id="startDate"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ctc" className="block font-medium mb-1">
                                    Cost to Company: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="ctc"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={ctc}
                                    onChange={(e) => setCtc(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="step-heading">Section 3</div>
                        <div className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="requirements" className="block font-medium mb-1">
                                    Requirements: <span className="red-star">*</span>
                                </label>
                                <textarea
                                    id="requirements"
                                    className="w-full h-40 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="skill1" className="block font-medium mb-1">
                                    Skill 1: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="skill1"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={skill1}
                                    onChange={(e) => setSkill1(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="skill2" className="block font-medium mb-1">
                                    Skill 2: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="skill2"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={skill2}
                                    onChange={(e) => setSkill2(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="skill3" className="block font-medium mb-1">
                                    Skill 3: <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="skill3"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={skill3}
                                    onChange={(e) => setSkill3(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <div className="step-heading">Section 4</div>
                        <div className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="jobDesc" className="block font-medium mb-1">
                                    Job Description <span className="red-star">*</span>
                                </label>
                                <textarea
                                    id="jobDesc"
                                    className="w-full h-40 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="benefits" className="block font-medium mb-1">
                                    Benefits <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="benefits"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={benefits}
                                    onChange={(e) => setBenefits(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="deadline" className="block font-medium mb-1">
                                    Last date to apply <span className="red-star">*</span>
                                </label>
                                <DatePicker
                                    id="deadline"
                                    selected={deadline}
                                    onChange={(date) => setDeadline(date)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="hrEmail" className="block font-medium mb-1">
                                    HR Email <span className="red-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="hrEmail"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                                    value={hrEmail}
                                    onChange={(e) => setHrEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 text-gray-900 h-screen tracking-wider leading-normal">
            <ToastContainer />
            <div className="container my-4">
                <div className="p-8 job-card">
                    <div className="main-heading">Create Job Post</div>
                    {validationError && <div className="alert alert-danger mb-4">{validationError}</div>}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        {renderStepContent()}
                        <div className="mt-8 d-flex justify-content-between">
                            {step > 1 && (
                                <button type="button" onClick={handlePrevious} className="btn btn-secondary">
                                    Previous
                                </button>
                            )}
                            {step < 4 ? (
                                <button type="submit" onClick={handleNext} className="btn btn-primary">
                                    Next
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJobPost;
