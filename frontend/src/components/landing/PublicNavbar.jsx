import { Link, useNavigate } from "react-router-dom";
import { CloudUpload, Menu, X } from "lucide-react";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import ThemeToggle from "../ui/ThemeToggle";

const PublicNavbar = () => {
    const { openSignIn, openSignUp } = useClerk();
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleDashboardOrAuth = (type) => {
        if (isSignedIn) {
            navigate("/dashboard");
        } else if (type === "signin") {
            openSignIn();
        } else {
            openSignUp();
        }
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full h-20 flex items-center px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-200">
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-blue-600 dark:text-blue-400 group">
                    <CloudUpload size={28} strokeWidth={2} />
                    <span>CloudShare</span>
                </Link>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/#features"
                        className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                        Features
                    </Link>
                    <Link
                        to="/#how-it-works"
                        className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                        How it works
                    </Link>
                    <Link
                        to="/#pricing"
                        className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                        About Us
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />

                    {isSignedIn ? (
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm text-sm cursor-pointer"
                        >
                            Go to Dashboard
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => handleDashboardOrAuth("signin")}
                                className="px-4 py-2 text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm cursor-pointer"
                            >
                                Sign in
                            </button>
                            <button
                                onClick={() => handleDashboardOrAuth("signup")}
                                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm text-sm cursor-pointer"
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 py-6 flex flex-col gap-4 shadow-xl">
                    <Link
                        to="/#features"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-blue-600"
                    >
                        Features
                    </Link>
                    <Link
                        to="/#how-it-works"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-blue-600"
                    >
                        How it works
                    </Link>
                    <Link
                        to="/#pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-blue-600"
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-blue-600"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-blue-600"
                    >
                        Contact Us
                    </Link>
                    <Link
                        to="/support"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-blue-600"
                    >
                        Support
                    </Link>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                        {isSignedIn ? (
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate("/dashboard");
                                }}
                                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold"
                            >
                                Dashboard
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        openSignIn();
                                    }}
                                    className="w-full py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium"
                                >
                                    Sign in
                                </button>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        openSignUp();
                                    }}
                                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold"
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default PublicNavbar;
