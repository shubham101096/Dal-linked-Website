import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('student')
        localStorage.removeItem('employer')
        localStorage.removeItem('admin')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}