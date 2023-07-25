import { useState } from 'react'
import axios from "axios";

export const useStudentSignup = () => {
    const [error, setError] = useState(null)
    const [ isLoading, setIsLoading] = useState(null)
    const [success, setSuccess] = useState(false);

    const signup = async (email, password, firstName, lastName) => {
        setIsLoading(true)
        setError(null) //reset every time there is a new signup request
        setSuccess(false)

        const requestData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        axios.post(`${backendUrl}/user/registerStudent`, requestData)
            .then((response) => {
                console.log('success registering student')
                setSuccess(true)
                setIsLoading(false)

            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false)
                setError(error.response.data.error)
                setSuccess(false)
            });
    }

   return { signup, isLoading, error, success}
}