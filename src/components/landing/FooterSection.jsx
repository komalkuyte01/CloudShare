import { useState } from "react";

const FooterSection = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const footerLinks = {
        Explore: [
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
        ],
        Company: [
            { label: "About Us", href: "#about" },
            { label: "Contact Us", href: "#contact" },
            { label: "Support", href: "#support" },
        ],
        Legal: [
            { label: "Terms of Service", href: "#terms" },
            { label: "Privacy Policy", href: "#privacy" },
            { label: "Cookie Policy", href: "#cookies" },
        ],
    };

    const socialLinks = [
        {
            label: "Twitter / X",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.256 5.623 5.908-5.623zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            label: "GitHub",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            ),
        },
        {
            label: "LinkedIn",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            label: "Discord",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">

            {/* Top gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">

                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-gray-800">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-5">

                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">CloudShare</span>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                            Upload, store, and share files securely with CloudShare.
                            Your trusted file-sharing platform, built for speed and privacy.
                        </p>

                        {/* Newsletter */}
                        <div className="mt-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                Stay in the loop
                            </p>
                            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="flex-1 min-w-0 bg-gray-800/70 border border-gray-700 text-sm text-white placeholder-gray-500 rounded-lg px-3.5 py-2.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all duration-200"
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md shadow-purple-600/30 hover:shadow-purple-500/40"
                                >
                                    {subscribed ? "✓" : "Subscribe"}
                                </button>
                            </form>
                            {subscribed && (
                                <p className="mt-2 text-xs text-green-400 animate-pulse">
                                    🎉 You're subscribed!
                                </p>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-1">
                            {socialLinks.map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-200"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section} className="flex flex-col gap-4">
                            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
                                {section}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                                        >
                                            <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100 text-purple-400 text-xs">
                                                →
                                            </span>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} CloudShare, Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            All systems operational
                        </span>
                        <span className="text-gray-700">·</span>
                        <span>Made with ♥ by the CloudShare team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;