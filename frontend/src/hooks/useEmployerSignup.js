import { useState } from 'react'
import axios from "axios";

export const useEmployerSignup = () => {
    const [error, setError] = useState(null)
    const [ isLoading, setIsLoading] = useState(null)
    const [success, setSuccess] = useState(false);


    const signup = async (employerName, companyName, email, contactNumber, password, companyLogo, websiteURL) => {
        setIsLoading(true)
        setError(null) //reset every time there is a new signup request
        setSuccess(false)

        const requestData = {
            employerName: employerName,
            companyName: companyName,
            email: email,
            contactNumber: contactNumber,
            password: password,
            companyLogo: companyLogo,
            websiteURL: websiteURL
        }

        axios.post('http://localhost:4001/user/registerEmployer', requestData)
            .then((response) => {
                setSuccess(true)
                setIsLoading(false)
               // const data = response;

            })
            .catch((error) => {
                console.error(error);
                setError(error.response.data.error)
                setIsLoading(false)
                setSuccess(false)
            });
    }

    return { signup, isLoading, error, success }
}