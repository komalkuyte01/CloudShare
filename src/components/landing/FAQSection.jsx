const FAQSection = ({ faqs }) => {
    return (
        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-gray-400 font-light">
                    Your FAQ content will go here.
                </p>
            </div>
        </section>
    );
};

export default FAQSection;
