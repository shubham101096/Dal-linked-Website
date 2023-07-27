/* MADE BY ADRIANA SANCHEZ GOMEZ */

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

        const formData = new FormData();
        formData.append('employerName', employerName);
        formData.append('companyName', companyName);
        formData.append('email', email);
        formData.append('contactNumber', contactNumber);
        formData.append('password', password);
        formData.append('websiteURL', websiteURL);
        formData.append('companyLogo', companyLogo);

        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        try {
            const response = await axios.post(`${backendUrl}/user/registerEmployer`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error registering employer:', error);
            setError(error.response.data.error)
            setIsLoading(false)
            setSuccess(false)
        }
    }

    return { signup, isLoading, error, success }
}