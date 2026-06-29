import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PricingSection from "../components/landing/PricingSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CTASection from "../components/landing/CTASection";
import FooterSection from "../components/landing/FooterSection";
import { features, pricingPlans, testimonials } from "../assets/data";

const Landing = () => {
    return (
        <div className="landing-page bg-gradient-to-b from-gray-50 to-gray-100 ">
            {/*Hero section*/}
            <HeroSection/>
            {/*Features section*/}
            <FeaturesSection features={features}/>
            {/*Pricing section*/}
            <PricingSection pricingPlans={pricingPlans}/>
            {/*Testimonials section*/}
            <TestimonialsSection testimonials={testimonials}/>
            {/*CTA section*/}
            <CTASection/>
            {/*Footer section*/}
            <FooterSection/>
        </div>
    )
}
export default Landing;