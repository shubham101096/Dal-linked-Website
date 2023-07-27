/* MADE BY ADRIANA SANCHEZ GOMEZ */

import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

/*
*  If the state user value wants to be used on any other componen,
*  then invoke the hook
*/
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}