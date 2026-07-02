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
        <div className="py-16 bg-white flex justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">

                {/* ── Header ── */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Everything you need for the file sharing
                    </h2>
                    <p className="mt-4 max-w-7xl mx-auto text-lg text-gray-500 text-center">
                        CloudShare provides all the tools you need to manage your digital content
                    </p>
                </div>

                {/* ── Feature Cards Grid ── */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) =>(
                                <div key={index} className="pt-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                                    <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8 flex-1">
                                        <div className="-mt-6">
                                            {/* Icon Container */}
                                            <div className="inline-flex items-center justify-center p-2 bg-white rounded-md shadow-lg">
                                              {renderIcon(feature.iconName, feature.iconColor)}
                                            </div>

                                            {/* Title */}
                                            <h3 className="mt-5 text-lg font-semibold text-gray-900 tracking-tight">
                                                {feature.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="mt-2 text-base text-gray-500">
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