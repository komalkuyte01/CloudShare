import { createContext, useContext, useCallback, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import {apiEndpoints} from "../Util/apiEndpoints.js";

export const UserCreditsContext = createContext();

export const useCreditsContext = () => useContext(UserCreditsContext);

export const UserCreditsProvider = ({ children }) => {
    const [credits, setCredits] = useState(10);
    const [loading, setLoading] = useState(false);

    const { getToken, isSignedIn } = useAuth();

    // Fetch user credits
    const fetchUserCredits = useCallback(async () => {
        if (!isSignedIn) {
            return;
        }

        setLoading(true);

        try {
            const token = await getToken();

            const response = await axios.get(
                apiEndpoints.GET_CREDITS,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(response.status === 200){
               setCredits(response.data.credits);
            }else{
                toast.error("Unable to get the credits.");
            }

        } catch (error) {
            console.error("Error fetching user credits:", error);
        } finally {
            setLoading(false);
        }
    }, [getToken, isSignedIn]);

    useEffect(() => {
        if(isSignedIn)
            fetchUserCredits();
    }, [fetchUserCredits, isSignedIn]);

    const updateCredits = useCallback(newCredits => {
        console.log('Uploading te credits', newCredits);
        setCredits(newCredits);
    }, []);

    const contextValue = {
        credits,
        setCredits,
        loading,
        fetchUserCredits,
        updateCredits
    };

    return (
        <UserCreditsContext.Provider value={contextValue}>
            {children}
        </UserCreditsContext.Provider>
    );
};

export default useCreditsContext;