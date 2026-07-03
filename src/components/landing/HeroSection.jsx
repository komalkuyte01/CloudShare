import { assets } from "../../assets/assets";

const HeroSection = () => {
    return (
        <div className="landing-page-content relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Glowing background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="flex flex-col items-center justify-center text-center">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-white text-center">
                        <span className="block mb-2 text-gray-300">
                            Share Files Securely With
                        </span>

                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 drop-shadow-md">
                            CloudShare
                        </span>
                    </h1>


                    <p className="mt-5 max-w-3xl text-center mx-auto text-base text-gray-400 sm:text-lg md:text-xl font-light">
                        Upload, manage, and share your files securely. Accessible anywhere, anytime.
                    </p>


                    <div className="mt-10 flex justify-center">

                        <div className="flex gap-5">

                            <button className="rounded-xl px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:shadow-[0_0_30px_rgba(192,38,211,0.6)] hover:-translate-y-1 cursor-pointer">
                                Get Started
                            </button>


                            <button className="rounded-xl px-10 py-4 text-lg font-semibold text-white bg-gray-500 hover:bg-gray-300 border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                Sign in
                            </button>

                        </div>

                    </div>


                    <div className="relative mt-12 flex justify-center w-full">

                        <div className="rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden max-w-5xl backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-500">

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