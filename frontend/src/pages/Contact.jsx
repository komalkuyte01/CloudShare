import { useState } from "react";
import PublicNavbar from "../components/landing/PublicNavbar";
import FooterSection from "../components/landing/FooterSection";
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { apiEndpoints } from "../Util/apiEndpoints.js";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setLoading(true);
        setErrorMsg("");

        try {
            // 1. Save contact message to Spring Boot backend database
            const backendRes = await fetch(apiEndpoints.SUBMIT_CONTACT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!backendRes.ok) {
                throw new Error("Failed to save message to backend database.");
            }

            // 2. Send via Formspree direct dispatch to cloudsharesupport@gmail.com
            await fetch("https://formspree.io/f/cloudsharesupport@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    _subject: formData.subject || `CloudShare Contact Message from ${formData.name}`,
                    message: formData.message,
                }),
            }).catch((err) => console.log("Formspree note:", err));

            // 3. Also dispatch to Web3Forms service
            const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
            if (web3Key) {
                await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        access_key: web3Key,
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject || `CloudShare Inquiry from ${formData.name}`,
                        message: formData.message,
                        to_email: "cloudsharesupport@gmail.com",
                    }),
                }).catch((err) => console.log("Web3Forms note:", err));
            }

            setSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitted(false), 30000);
        } catch (err) {
            console.error("Submission handler:", err);
            setErrorMsg(err.message || "Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const socialApps = [
        {
            name: "GitHub",
            handle: "@cloudshare-dev",
            href: "https://github.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            handle: "CloudShare Official",
            href: "https://linkedin.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "Twitter / X",
            handle: "@CloudShareApp",
            href: "https://twitter.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.256 5.623 5.908-5.623zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: "Direct Email",
            handle: "cloudsharesupport@gmail.com",
            href: "mailto:cloudsharesupport@gmail.com",
            icon: <Mail className="w-5 h-5 text-blue-500" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col">
            <PublicNavbar />

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto py-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                        Have a question, feedback, or need help with your CloudShare account? We'd love to hear from you.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Info Cards */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Email Us</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Our team typically responds in under 2 hours.</p>
                                <a href="mailto:cloudsharesupport@gmail.com" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
                                    cloudsharesupport@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Support Hours</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mon - Sun: 24/7 Priority Support</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Always Available</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">CloudShare</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Personal Project</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">India</p>
                            </div>
                        </div>

                        {/* Social Apps */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Connect via Apps</h3>
                            <div className="space-y-3">
                                {socialApps.map((app, i) => (
                                    <a
                                        key={i}
                                        href={app.href}
                                        target={app.href.startsWith("mailto") ? "_self" : "_blank"}
                                        rel="noreferrer"
                                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700/60 transition-colors text-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-gray-700 dark:text-gray-300">{app.icon}</div>
                                            <span className="font-medium text-gray-900 dark:text-white">{app.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{app.handle}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Fill out the form below and our team will get back to you shortly.</p>

                        {submitted && (
                            <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 flex items-center gap-3">
                                <CheckCircle2 size={20} className="flex-shrink-0" />
                                <span className="text-sm font-medium">Thank you! Your message has been sent successfully. We will reply soon.</span>
                            </div>
                        )}

                        {errorMsg && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center gap-3">
                                <AlertCircle size={20} className="flex-shrink-0" />
                                <span className="text-sm font-medium">{errorMsg}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Komal Kuyte"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="komal@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Inquiry regarding CloudShare Premium plan"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Sending Message...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>

            </main>

            <FooterSection />
        </div>
    );
};

export default Contact;
