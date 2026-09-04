import { assets } from "../../assets/assets";
import { CloudUpload } from "lucide-react";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect.tsx";


const HeroSection = ({ openSignIn, openSignUp }) => {
    return (

        <div className="landing-page-content relative min-h-screen overflow-hidden">
            <BackgroundRippleEffect />


            <nav className="fixed top-0 left-0 z-50 w-full h-20 flex items-center px-4 sm:px-6 lg:px-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">

                {/* Logo */}
                <div className="flex items-center gap-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
                    <CloudUpload size={32} strokeWidth={1.8} />
                    <span>CloudShare</span>
                </div>

                {/* Right Side */}
                <div className="ml-auto flex items-center gap-10">

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">

                        <a
                            href="#features"
                            className="text-gray-800 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-gray-800 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            How it works
                        </a>

                        <a
                            href="#pricing"
                            className="text-gray-800 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Pricing
                        </a>

                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-7">

                        <button
                            onClick={() => openSignIn()}
                            className="text-gray-800 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Sign in
                        </button>

                        <button
                            onClick={() => openSignUp()}
                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                            Sign up
                        </button>

                    </div>

                </div>

            </nav>


            <div className="max-w-7xl pt-32 lg:pt-40 mx-auto pb-6 lg:py-8 px-4 sm:px-6 lg:px-8  relative z-10 w-full">

                <div className="flex flex-col items-center justify-center text-center">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
                        <span className="block mb-1 lg:mb-3 text-gray-600 dark:text-gray-300">
                            Share Files Securely With
                        </span>

                        <span className="block text-blue-600 dark:text-blue-400">
                            CloudShare
                        </span>
                    </h1>


                    <p className="mt-8 sm:mt-8 max-w-3xl text-center mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-400 md:text-xl font-light px-2">
                        Upload, manage, and share your files securely. Accessible anywhere, anytime.
                    </p>


                    <div className="mt-6 lg:mt-10 flex justify-center w-full">

                        <div className="flex flex-row gap-3 lg:gap-5">

                            <button
                                onClick={() => openSignUp()}
                                className="w-38 lg:w-48 rounded-xl px-5 py-2 text-sm lg:px-10 lg:py-4 lg:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:-translate-y-1 cursor-pointer min-h-[44px]">
                                Get Started
                            </button>

                            <button
                                onClick={() => openSignIn()}
                                className="w-38 lg:w-48 rounded-xl px-5 py-2 text-sm lg:px-10 lg:py-4 lg:text-lg font-semibold text-gray-800 dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-sm cursor-pointer min-h-[44px]">
                                Sign in
                            </button>

                        </div>

                    </div>


                    <div className="relative mt-20 lg:mt-30 flex justify-center w-full">

                        <div className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 overflow-hidden w-full max-w-5xl backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-500">

                            <img
                                src={assets.Dashboard}
                                alt="cloudshare dashboard"
                                className="w-full object-cover"
                            />

                        </div>

                    </div>


                    <p className="mt-4 lg:mt-12 text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase text-center px-4 leading-relaxed">
                        All your files are encrypted and stored securely with enterprise-grade security protocols.
                    </p>


                </div>

            </div>

        </div>
    )
}

export default HeroSection;