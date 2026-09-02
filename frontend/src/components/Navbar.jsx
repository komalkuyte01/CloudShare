import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CloudUpload } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import SideMenu from "./SideMenu";
import CreditsDisplay from "./CreditsDisplay";
import ThemeToggle from "./ThemeToggle";
import useCreditsContext from "../context/UserCreditsContext.jsx";

const Navbar = ({ activeMenu, credits }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { fetchUserCredits } = useCreditsContext() || {};

    useEffect(() => {
        if (fetchUserCredits) {
            fetchUserCredits();
        }
    }, [fetchUserCredits]);
    return (
        <div>
            <div className="flex items-center justify-between gap-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-4">

                {/* Left side menu button & title bar */}
                <div className="flex items-center gap-5">

                    <button
                        type="button"
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                        aria-label={
                            openSideMenu
                                ? "Close side menu"
                                : "Open side menu"
                        }
                        aria-expanded={openSideMenu}
                        className="block lg:hidden text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-colors"
                    >
                        {openSideMenu ? (
                            <X className="text-2xl" />
                        ) : (
                            <Menu className="text-2xl" />
                        )}
                    </button>

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2"
                    >
                        <Share2 className="text-blue-600" />

                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                            CloudShare
                        </span>
                    </Link>

                </div>


                {/* Right side - credits and user button */}
                <SignedIn>
                    <div className="flex items-center gap-5">

                        <Link to="/subscription">
                            <CreditsDisplay credits={credits} />
                        </Link>

                        <ThemeToggle />

                        <div className="relative">
                            <UserButton />
                        </div>

                    </div>
                </SignedIn>

            </div>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden z-20">

                    {/* Side menubar */}
                    <SideMenu activeMenu={activeMenu} />

                </div>
            )}
        </div>
    );
};

export default Navbar;