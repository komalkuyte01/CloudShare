import {useUser} from "@clerk/clerk-react";
import Navbar from "../components/Navbar.jsx";
import SideMenu from "../components/SideMenu.jsx";

const dashboardLayout = ({children}) => {
    const {user} = useUser();
    return (
        <div>
            <Navbar/>
            {user && (
               <div className="flex">
                   <div className="max-[1080px]:hidden">
                       <SideMenu />
                   </div>
                   <div className="grow mx-5">{children}</div>
               </div>
            )}
        </div>
    )
}

export default dashboardLayout;