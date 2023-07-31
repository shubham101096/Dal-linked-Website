/* MADE BY ADRIANA SANCHEZ GOMEZ */

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, password, userType) => {
    setIsLoading(true);
    setError(null); //reset every time there is a new signup request

    const requestData = {
      email: email,
      password: password,
    };

    var userLoginURL;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log(backendUrl);
    switch (userType) {
      case "student":
        userLoginURL = `${backendUrl}/user/loginStudent`;
        break;
      case "employer":
        userLoginURL = `${backendUrl}/user/loginEmployer`;
        break;
      case "admin":
        userLoginURL = `${backendUrl}/user/loginAdmin`;
        break;
      default:
        break;
    }

    axios
      .post(userLoginURL, requestData)
      .then((response) => {
        const data = response;
        console.log(data);
        // Store the user email & token on local storage
        localStorage.setItem("user", JSON.stringify(data.data));
        // update auth context
        dispatch({ type: "LOGIN", payload: data.data });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError(error.response.data.error);
      });
  };

  return { login, isLoading, error };
};
