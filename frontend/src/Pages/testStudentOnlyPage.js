import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";

const fetchDataFromApi = async (userToken) => {
    try {
        const response = await axios.get('http://localhost:4001/studentReg', {
            headers: {
                Authorization: "Bearer " + userToken
            }
        });

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const StudentPage = () => {
    const [results, setResults] = useState([]);
    const { user } = useAuthContext();
    console.log(user)

    useEffect(() => {
        if (user) {
            fetchDataFromApi(user.token)
                .then(data => {
                    setResults(data);
                });
        }
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>This is a Student Page Test</h1>
        </div>
    );
};

export default StudentPage;
