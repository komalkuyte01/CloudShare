import {FileText, Wallet, ArrowUpCircle, Shield, Share2, CreditCard, Clock} from 'lucide-react';
const FeaturesSection = ({ features }) => {
    const renderIcon = (iconName, iconColor) => {
       const iconProps = {size: 25, className: iconColor};
             switch(iconName){
                case 'ArrowUpCircle': 
                    return <ArrowUpCircle {...iconProps}/>;
                case 'Shield':
                     return <Shield {...iconProps} />;
                case 'Share2':
                     return <Share2 {...iconProps} />;
                case 'CreditCard':
                     return <CreditCard {...iconProps} />;
                case 'FileText':
                     return <FileText {...iconProps} />;
                case 'Clock':
                     return <Clock {...iconProps} />;
               default:
                     return <FileText {...iconProps} />;
             }
            }
    return (
        <div className="py-24 bg-transparent flex justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 relative z-10">

                {/* ── Header ── */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                        Everything you need for the file sharing
                    </h2>
                    <p className="mt-4 max-w-7xl mx-auto text-lg text-gray-400 text-center font-light">
                        CloudShare provides all the tools you need to manage your digital content
                    </p>
                </div>

                {/* ── Feature Cards Grid ── */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) =>(
                                <div key={index} className="pt-6 rounded-2xl flex flex-col group">
                                    <div className="flow-root bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-fuchsia-500/50 rounded-2xl px-4 pb-8 flex-1 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(192,38,211,0.2)] group-hover:-translate-y-1">
                                        <div className="-mt-6">
                                            {/* Icon Container */}
                                            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] transition-all duration-300">
                                              {renderIcon(feature.iconName, feature.iconColor)}
                                            </div>

                                            {/* Title */}
                                            <h3 className="mt-6 text-lg font-semibold text-gray-100 tracking-tight">
                                                {feature.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="mt-3 text-base text-gray-400 font-light leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                       </div>
                   </div>

            </div>
        </div>
    );
};

export default FeaturesSection;