const getAllJobs = (req, res) => {
    res.send('Getting all jobs');
}

const getJobById = (req, res) => {
    res.send('Getting job by id');
}

const postJob = (req, res) => {
    res.send('Posting a job');
}

module.exports = { getAllJobs, getJobById, postJob };