import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Share2, Wallet } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import SideMenu from "./SideMenu";

const Navbar = () => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <SignedIn>
                <div className="flex items-center justify-between gap-5 bg-white border border-gray-200 px-6 py-4">

                    {/* Left side menu button & title bar */}
                    <div className="flex items-center gap-5">

                        <button
                            onClick={() => setOpenSideMenu(!openSideMenu)}
                            className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
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
                            <span className="text-xl font-semibold text-gray-900">
                                CloudShare
                            </span>
                        </Link>

                    </div>

                    {/* Right side - credits and user button */}
                    <div className="flex items-center gap-5">

                        <div className="flex items-center gap-2 text-gray-700">
                            <Wallet className="text-blue-600" size={20} />
                            <span className="font-medium">
                                Credits
                            </span>
                        </div>

                        <UserButton />
                    </div>

                </div>
            </SignedIn>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                    {/* Side menubar */}
                    <SideMenu />
                </div>
            )}
        </div>
    );
};

export default Navbar;