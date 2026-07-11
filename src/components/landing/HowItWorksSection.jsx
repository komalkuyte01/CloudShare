import { UserPlus, UploadCloud, Share2, Globe } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Create an Account',
        description:
            'Create your account and start storing files securely.',
    },
    {
        number: '02',
        icon: UploadCloud,
        title: 'Upload Your Files',
        description:
            'Upload files instantly with secure end-to-end encryption.',
    },
    {
        number: '03',
        icon: Share2,
        title: 'Organise & Share',
        description:
            'Simplify file organization with secure, seamless sharing.',
    },
    {
        number: '04',
        icon: Globe,
        title: 'Access Anywhere',
        description:
            'Access your files from any device, wherever you are.',
    },
];

const HowItWorksSection = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10 sm:mb-16 lg:mb-20">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
                        How It Works
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto px-2">
                        Get started in four simple steps — no technical knowledge required.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">

                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-[2px] bg-gray-200 dark:bg-white/10 z-0" />

                    <div className="grid grid-cols-1 gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center">

                                    {/* Icon circle */}
                                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-white/10 shadow-sm mb-6">
                                        <Icon size={28} className="text-purple-600 dark:text-purple-400" /> 
                                    </div>

                                    {/* Step label */}
                                    <span className="text-xs font-semibold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-2">
                                        Step {step.number}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-xs">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
