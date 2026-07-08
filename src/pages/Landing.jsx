import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import PricingSection from "../components/landing/PricingSection";
import FooterSection from "../components/landing/FooterSection";
import ThemeToggle from "../components/ThemeToggle";
import { features, pricingPlans} from "../assets/data";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const {openSignIn, openSignUp} = useClerk();
    const {isSignedIn} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSignedIn){
            navigate("/dashboard");
        }
    },[isSignedIn, navigate]);

    return (
        <div className="landing-page selection:bg-fuchsia-500/30">
            <ThemeToggle />
            {/*Hero section*/}
            <HeroSection openSignIn={openSignIn} openSignUp={openSignUp}/>
            {/*Features section*/}
            <FeaturesSection features={features}/>
            {/*How It Works section*/}
            <HowItWorksSection/>
            {/*Pricing section*/}
            <PricingSection pricingPlans={pricingPlans}/>
            {/*Footer section*/}
            <FooterSection/>
        </div>
    )
}
export default Landing;