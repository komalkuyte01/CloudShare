import PublicNavbar from "../components/landing/PublicNavbar";
import FooterSection from "../components/landing/FooterSection";
import { ShieldCheck, Zap, Lock, Users, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
    const highlights = [
        { title: "Secure Storage", description: "Files stored using AWS S3" },
        { title: "Authenticated Access", description: "JWT-based user authentication" },
        { title: "Easy Sharing", description: "Share files with controlled visibility" },
        { title: "REST APIs", description: "Scalable backend architecture" },
    ];

    const values = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            title: "Security First Architecture",
            description: "Your files are encrypted before storage using enterprise grade AES-256 standards, keeping your data protected 24/7.",
        },
        {
            icon: <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            title: "Lightning Fast Transfers",
            description: "Distributed CDN edge nodes ensure maximum upload and download speeds anywhere in the world.",
        },
        {
            icon: <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            title: "Strict Privacy Controls",
            description: "Granular public and private share link settings, password protection, and automated credit access control.",
        },
    ];

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "Twitter / X",
            href: "https://twitter.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.256 5.623 5.908-5.623zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: "Email Us",
            href: "mailto:cloudsharesupport@gmail.com",
            icon: <Mail className="w-5 h-5" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col">
            <PublicNavbar />

            {/* Main Content */}
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto py-8 sm:py-12">
                    <span className="inline-block px-3.5 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 rounded-full border border-blue-200 dark:border-blue-800">
                        About CloudShare
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Empowering Seamless & Secure File Sharing
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        CloudShare was built to revolutionize how individuals and organizations store, manage, and distribute their digital assets. Designed with privacy, speed, and simplicity at its core.
                    </p>
                </div>

                {/* Key Architecture Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-12">
                    {highlights.map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-sm hover:border-blue-500/50 transition-colors">
                            <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{item.title}</div>
                            <div className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">{item.description}</div>
                        </div>
                    ))}
                </div>

                {/* Mission & Vision */}
                <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            To make secure file sharing effortless for everyone. We believe privacy shouldn't compromise speed, and high-tech security should be accessible in a single click.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            To build the world's most trusted cloud storage ecosystem where user data sovereignty is respected, credits are transparent, and sharing links are instantly generated.
                        </p>
                    </div>
                </div>

                {/* Core Pillars */}
                <div className="my-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose CloudShare?</h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">Built on foundational security, reliability, and ease of use.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500/50 transition-colors">
                                <div className="p-3 w-fit rounded-xl bg-blue-50 dark:bg-blue-900/30 mb-4">
                                    {v.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Connect Box */}
                <div className="my-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center shadow-xl">
                    <h2 className="text-2xl sm:text-3xl font-bold">Connect With Us</h2>
                    <p className="mt-3 text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
                        Follow our open development, join our tech community, or get in touch with our team directly.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                        {socialLinks.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                                rel="noreferrer"
                                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md font-medium text-sm transition-all hover:scale-105"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center py-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to store & share securely?</h3>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors text-sm flex items-center gap-2"
                        >
                            <span>Contact Support</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </main>

            <FooterSection />
        </div>
    );
};

export default About;
