import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import SecuritySection from "../components/landing/SecuritySection";
import PricingSection from "../components/landing/PricingSection";;
import CTASection from "../components/landing/CTASection";
import FooterSection from "../components/landing/FooterSection";
import ThemeToggle from "../components/ThemeToggle";
import { features, pricingPlans, testimonials, faqs } from "../assets/data";

const Landing = () => {
    return (
        <div className="landing-page selection:bg-fuchsia-500/30">
            <ThemeToggle />
            {/*Hero section*/}
            <HeroSection/>
            {/*Features section*/}
            <FeaturesSection features={features}/>
            {/*How It Works section*/}
            <HowItWorksSection/>
            {/*Security section*/}
            <SecuritySection/>
            {/*Pricing section*/}
            <PricingSection pricingPlans={pricingPlans}/>
            {/*CTA section*/}
            <CTASection/>
            {/*Footer section*/}
            <FooterSection/>
        </div>
    )
}
export default Landing;