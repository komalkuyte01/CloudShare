import { Check } from "lucide-react";

const PricingSection = ({ pricingPlans }) => {
    return (
        <div className="py-24 bg-transparent relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-400 font-light">
                        Choose the perfect plan for your needs
                    </p>
                </div>
                <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className={`flex flex-col rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${plan.highlighted ? 'border-2 border-fuchsia-500 shadow-[0_0_30px_rgba(192,38,211,0.2)] transform scale-105 bg-white/10' : 'border border-white/10 bg-white/5 hover:bg-white/10'}`}>
                            <div className={`px-6 py-8 ${plan.highlighted ? 'bg-gradient-to-br from-fuchsia-900/40 to-transparent' : ''}`}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-semibold text-white">
                                        {plan.name}
                                    </h3>
                                    {plan.highlighted && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50 shadow-[0_0_10px_rgba(192,38,211,0.3)]">
                                            Most Popular
                                        </span>
                                    )}
                                </div>
                                <p className="mt-4 text-sm text-gray-400 font-light">

                                    {plan.description}
                                </p>
                                <p className="mt-8 text-4xl font-extrabold text-white">
                                    ₹{plan.price}
                                </p>
                            </div>
                            <div className="px-6 pt-6 pb-8 flex-1 flex flex-col justify-between space-y-6 border-t border-white/10">
                               <ul className="space-y-4">
                                  {plan.features.map((feature,featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Check className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"/>
                                        
                                        </div>
                                        <p className="ml-3 text-base text-gray-300 font-light">{feature}</p>
                                    </li>
                                  ))}
                               </ul>
                               <div className="rounded-xl shadow-lg mt-6">
                                   <button className={`w-full flex items-center justify-center px-5 py-4 border border-transparent text-base font-semibold rounded-xl transition-all duration-300 ${plan.highlighted ? 'text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:shadow-[0_0_30px_rgba(192,38,211,0.6)]' : 'text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md'}`}>
                                     {plan.cta}
                                    </button>
                               </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
export default PricingSection;