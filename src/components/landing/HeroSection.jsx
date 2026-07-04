import { assets } from "../../assets/assets";

const HeroSection = () => {
    return (
        <div className="landing-page-content relative min-h-screen flex items-center justify-center overflow-hidden">



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="flex flex-col items-center justify-center text-center">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
                        <span className="block mb-2 text-gray-600 dark:text-gray-300">
                            Share Files Securely With
                        </span>

                        <span className="block text-purple-600 dark:text-purple-400">
                            CloudShare
                        </span>
                    </h1>


                    <p className="mt-5 max-w-3xl text-center mx-auto text-base text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl font-light">
                        Upload, manage, and share your files securely. Accessible anywhere, anytime.
                    </p>


                    <div className="mt-10 flex justify-center">

                        <div className="flex gap-5">

                            <button className="rounded-xl px-10 py-4 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md hover:-translate-y-1 cursor-pointer">
                                Get Started
                            </button>


                            <button className="rounded-xl px-10 py-4 text-lg font-semibold text-gray-800 dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-sm cursor-pointer">
                                Sign in
                            </button>

                        </div>

                    </div>


                    <div className="relative mt-12 flex justify-center w-full">

                        <div className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 overflow-hidden max-w-5xl backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-500">

                            <img
                                src={assets.Dashboard}
                                alt="cloudshare dashboard"
                                className="w-full object-cover"
                            />

                        </div>

                    </div>


                    <p className="mt-12 text-sm text-gray-500 font-medium tracking-wide uppercase">
                        All your files are encrypted and stored securely with enterprise-grade security protocols.
                    </p>


                </div>

            </div>

        </div>
    )
}

export default HeroSection;