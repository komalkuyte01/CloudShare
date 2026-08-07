import { Check } from "lucide-react";

const PricingSection = ({ pricingPlans, openSignUp }) => {
    return (
        <div className="py-12 sm:py-16 lg:py-24 bg-transparent relative">

            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400 font-light px-2">
                        Choose the perfect plan for your needs
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="mt-10 sm:mt-16 space-y-6 sm:space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-stretch">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`flex flex-col rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-300
                                ${plan.highlighted
                                    ? 'border-2 border-purple-600 dark:border-purple-500 shadow-lg lg:scale-105 bg-white dark:bg-gray-800'
                                    : 'border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10'
                                }`}>
                            {/* Purple top accent stripe on highlighted card */}
                            {plan.highlighted && (
                                <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-violet-600 shrink-0" />
                            )}

                            {/* Card Header */}
                            <div className={`px-6 ${plan.highlighted ? 'py-8 bg-purple-50 dark:bg-purple-900/20' : 'py-5'}`}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {plan.name}
                                    </h3>
                                    {plan.highlighted && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-200 dark:border-purple-500/50">
                                            Most Popular
                                        </span>
                                    )}
                                </div>

                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-light">
                                    {plan.description}
                                </p>

                                <div className={`flex items-baseline gap-1 ${plan.highlighted ? 'mt-8' : 'mt-6'}`}>
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                        ₹{plan.price}
                                    </span>
                                    {plan.period && plan.period !== 'forever' && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">/{plan.period}</span>
                                    )}
                                    {plan.period === 'forever' && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">free forever</span>
                                    )}
                                </div>
                            </div>

                            {/* Features + CTA */}
                            <div className={`px-6 flex-1 flex flex-col justify-between gap-6 border-t border-gray-100 dark:border-white/10 ${plan.highlighted ? 'pt-6 pb-8' : 'pt-5 pb-6'}`}>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 mt-0.5 shrink-0 text-purple-600 dark:text-purple-400" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-light leading-snug">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => openSignUp()}
                                    className={`w-full flex items-center justify-center px-5 py-3.5 text-base font-semibold rounded-xl transition-all duration-200 min-h-[44px]
                                        ${plan.highlighted
                                            ? 'text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/30'
                                            : 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingSection;