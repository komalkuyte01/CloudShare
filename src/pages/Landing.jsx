import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import SecuritySection from "../components/landing/SecuritySection";
import PricingSection from "../components/landing/PricingSection";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";
import FooterSection from "../components/landing/FooterSection";
import { features, pricingPlans, testimonials, faqs } from "../assets/data";

const Landing = () => {
    return (
        <div className="landing-page bg-[#030712] text-gray-100 selection:bg-fuchsia-500/30">
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
            {/*FAQ section*/}
            <FAQSection faqs={faqs}/>
            {/*CTA section*/}
            <CTASection/>
            {/*Footer section*/}
            <FooterSection/>
        </div>
    )
}
export default Landing;