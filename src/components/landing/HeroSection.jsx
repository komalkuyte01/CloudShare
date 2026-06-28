import { assets } from "../../assets/assets";

const HeroSection = () => {
    return (
        <div className="landing-page-content relative min-h-screen flex items-center justify-center">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-80 z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="flex flex-col items-center justify-center text-center">

                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">
                            Share Files Securely With
                        </span>

                        <span className="block text-purple-600">
                            CloudShare
                        </span>
                    </h1>


                    <p className="mt-5 max-w-3xl mx-auto text-base text-gray-500 sm:text-lg md:text-xl">
                        Upload, manage, and share your files securely. Accessible anywhere, anytime.
                    </p>


                    <div className="mt-10 flex justify-center">

                        <div className="flex gap-5">

                            <button className="rounded-lg px-10 py-4 text-lg font-medium text-white bg-purple-500 hover:bg-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                                Get Started
                            </button>


                            <button className="bg-white text-purple-600 font-semibold px-10 py-4 rounded-lg hover:bg-purple-100 transition-all duration-300 cursor-pointer">
                                Sign in
                            </button>

                        </div>

                    </div>


                    <div className="relative mt-12 flex justify-center w-full">

                        <div className="rounded-lg shadow-xl overflow-hidden max-w-5xl">

                            <img
                                src={assets.Dashboard}
                                alt="cloudshare dashboard"
                                className="w-full object-cover"
                            />

                        </div>

                    </div>


                    <p className="mt-8 text-base text-gray-500">
                        All your files are encrypted and stored securely with enterprise-grade security protocols.
                    </p>


                </div>

            </div>

        </div>
    )
}

export default HeroSection;