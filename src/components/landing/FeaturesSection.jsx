import {FileText, Wallet, ArrowUpCircle, Shield, Share2, CreditCard, Clock, Activity, Watch} from 'lucide-react';
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
                case 'Activity':
                     return <Activity {...iconProps} />;
                case 'History':
                     return <Watch {...iconProps} />;
               default:
                     return <FileText {...iconProps} />;
             }
            }
    return (
        <div className="py-24 bg-transparent flex justify-center relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 relative z-10">

                {/* ── Header ── */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
                        Everything you need for the file sharing
                    </h2>
                    <p className="mt-4 max-w-7xl mx-auto text-lg text-gray-600 dark:text-gray-400 text-center font-light">
                        CloudShare provides all the tools you need to manage your digital content
                    </p>
                </div>

                {/* ── Feature Cards Grid ── */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) =>(
                                <div key={index} className="pt-6 rounded-2xl flex flex-col group">
                                    <div className="flow-root bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl px-4 pb-8 flex-1 transition-all duration-300 shadow-sm dark:shadow-none hover:border-gray-300 dark:hover:border-white/20">
                                        <div className="-mt-6">
                                            {/* Icon Container */}
                                            <div className="inline-flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm transition-all duration-300">
                                              {renderIcon(feature.iconName, feature.iconColor)}
                                            </div>

                                            {/* Title */}
                                            <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                                                {feature.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">
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