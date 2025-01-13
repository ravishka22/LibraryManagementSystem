import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/users/getUser/' )
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            toast.error(errorMessage);
        }
    }

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData

    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}