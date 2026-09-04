import Navbar from "../components/ui/Navbar.jsx";
import SideMenu from "../components/ui/SideMenu.jsx";
import { useUser } from "@clerk/clerk-react";
import useCreditsContext from "../context/UserCreditsContext.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useUser();
    const { credits } = useCreditsContext() || { credits: 0 };

    return (
        <div>
            <Navbar activeMenu={activeMenu} credits={credits} />
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