/* MADE BY ADRIANA SANCHEZ GOMEZ */

import { createContext, useReducer } from 'react'
import { useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    // handle login and logout cases
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            console.log('logging out user in context')
            return {user: null}
        default:
            return state // If there are no changes, return original state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,{
        user: null
    })
    // Check when the application starts, once, to find if there is a user
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // user key

        if(user){
            dispatch({ type: 'LOGIN', payload: user })
        }

    }, [])

    console.log('AuthContext state: ', state) // Keep track of state

    // Provide the state value to the entire application
    return (
        <AuthContext.Provider value = { {...state, dispatch } }>
            { children }
        </AuthContext.Provider>
    )
}