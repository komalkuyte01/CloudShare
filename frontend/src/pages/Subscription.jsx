import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useState, useEffect, useRef, useContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { UserCreditsContext } from "../context/UserCreditsContext";
import axios from "axios";
import { apiEndpoints } from "../Util/apiEndpoints.js";
import { AlertCircle, Check, CreditCard, Loader2 } from "lucide-react";

const Subscription = () => {
    const plans = [
        {
            id: "premium",
            name: "Premium",
            credits: 500,
            price: 500,
            features: [
                "Upload up to 500 files",
                "Access to all basic features",
                "Priority support"
            ],
            recommended: false
        },
        {
            id: "ultimate",
            name: "Ultimate",
            credits: 5000,
            price: 2500,
            features: [
                "Upload up to 5000 files",
                "Access to all premium features",
                "Priority support",
                "Advanced analytics"
            ],
            recommended: true
        }
    ];

    const [processingPayment, setProcessingPayment] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    const { getToken } = useAuth();
    const { user } = useUser();
    const razorpayScriptRef = useRef(null);
    const { credits, setCredits, fetchUserCredits } = useContext(UserCreditsContext);

    // Load Razorpay script
    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => {
                console.log('Razorpay script loaded successfully');
                setRazorpayLoaded(true);
            };
            script.onerror = () => {
                console.error('Failed to load Razorpay script');
                setMessage('Payment gateway failed to load. Please refresh the page and try again.');
                setMessageType('error');
            };
            document.body.appendChild(script);
            razorpayScriptRef.current = script;
        } else {
            setRazorpayLoaded(true);
        }

        return () => {
            if (razorpayScriptRef.current) {
                document.body.removeChild(razorpayScriptRef.current);
            }
        };
    }, []);

    // Fetch user credits
    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(apiEndpoints.GET_CREDITS, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCredits(response.data.credits);
            } catch (error) {
                console.error("Error fetching user credits:", error);
                setMessage("Failed to load your current credits. Please try again later.");
                setMessageType("error");
            }
        };

        fetchCredits();
    }, [getToken, setCredits]);

    const handlePurchase = async (plan) => {
        if (!razorpayLoaded) {
            setMessage('Payment gateway is still loading. Please wait a moment and try again.');
            setMessageType('error');
            return;
        }

        if (!import.meta.env.VITE_RAZORPAY_KEY) {
            setMessage("Payment gateway is not configured. Please contact support.");
            setMessageType("error");
            setProcessingPayment(null);
            return;
        }

        setProcessingPayment(plan.id);
        setMessage('');

        try {
            const token = await getToken();

            const orderResponse = await axios.post(
                apiEndpoints.CREATE_ORDER,
                {
                    planId: plan.id
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!orderResponse.data.success) {
                setMessage(orderResponse.data.message || "Failed to create order");
                setMessageType("error");
                setProcessingPayment(null);
                return;
            }

            const orderId = orderResponse.data.orderId;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: plan.price * 100,
                currency: "INR",
                name: "CloudShare",
                description: `Purchase ${plan.credits} credits`,
                order_id: orderId,
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post(
                            apiEndpoints.VERIFY_PAYMENT,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: plan.id
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            }
                        );

                        if (verifyResponse.data.success) {
                            // Update credits immediately with the value from the response
                            if (verifyResponse.data.credits !== undefined && verifyResponse.data.credits !== null) {
                                console.log('Updating credits to:', verifyResponse.data.credits);
                                setCredits(verifyResponse.data.credits);
                            } else {
                                // If credits not in response, fetch the latest credits from the server
                                console.log('Credits not in response, fetching latest credits');
                                await fetchUserCredits();
                            }
                            setMessage(`Payment successful! ${plan.name} plan activated.`);
                            setMessageType("success");
                        } else {
                            setMessage("Payment verification failed. Please contact support.");
                            setMessageType("error");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        setMessage("Payment verification failed. Please contact support.");
                        setMessageType("error");
                    }
                    setProcessingPayment(null);
                },
                prefill: {
                    name: user?.fullName || "User Name",
                    email: user?.primaryEmailAddress?.emailAddress || "user@example.com"
                },
                theme: {
                    color: "#3B82F6"
                },
                modal: {
                    ondismiss: function () {
                        setProcessingPayment(null);
                        setMessage("Payment cancelled.");
                        setMessageType("error");
                    }
                }
            };

            if (window.Razorpay) {
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                throw new Error('Razorpay SDK not loaded');
            }

        } catch (error) {
            console.error("Payment error:", error);
            setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
            setMessageType("error");
            setProcessingPayment(null);
        }
    };

    return (
        <DashboardLayout activeMenu="Subscription">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2 dark:text-white">Subscription Plans</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Choose a plan that works for you</p>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                            messageType === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                                'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        }`}>
                        {messageType === 'error' && <AlertCircle size={20} />}
                        {message}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="text-blue-500" />
                            <h2 className="text-lg font-medium dark:text-white">Current Credits: <span className="font-bold">{credits}</span></h2>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            You can upload {credits} more files with your current credits.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`border rounded-xl p-6 ${plan.recommended
                                    ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
                                }`}
                        >
                            {plan.recommended && (
                                <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded mb-4">
                                    RECOMMENDED
                                </div>
                            )}
                            <h3 className="text-xl font-bold dark:text-white">{plan.name}</h3>
                            <div className="mt-2 mb-4">
                                <span className="text-3xl font-bold dark:text-white">₹{plan.price}</span>
                                <span className="text-gray-500 dark:text-gray-400"> for {plan.credits} credits</span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="dark:text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePurchase(plan)}
                                disabled={processingPayment === plan.id}
                                className={`w-full py-2 rounded-md font-medium transition-colors ${plan.recommended
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                                    } disabled:opacity-50 flex items-center justify-center gap-2`}
                            >
                                {processingPayment === plan.id ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <span>Purchase Plan</span>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium mb-2 dark:text-white">How credits work</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Each file upload consumes 1 credit. New users start with 5 free credits.
                        Credits never expire and can be used at any time. If you run out of credits,
                        you can purchase more through one of our plans above.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Subscription;