import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import SideMenu from "../components/SideMenu.jsx";
import { apiEndpoints } from "../Util/apiEndpoints.js";

const DashboardLayout = ({ children, activeMenu, credits }) => {
    const { user } = useUser();
    const { getToken, isLoaded } = useAuth();
    const [liveCredits, setLiveCredits] = useState(credits ?? 0);

    useEffect(() => {
        if (!isLoaded || !user) return;

        const fetchCredits = async () => {
            try {
                const token = await getToken();
                if (!token) return;

                const response = await axios.get(apiEndpoints.PROFILE_ME, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200 && response.data && typeof response.data.credits === 'number') {
                    setLiveCredits(response.data.credits);
                }
            } catch (error) {
                console.error("Failed to fetch profile credits:", error);
            }
        };

        fetchCredits();
    }, [isLoaded, user, getToken]);

    return (
        <div>
            <Navbar activeMenu={activeMenu} credits={liveCredits} />
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout;