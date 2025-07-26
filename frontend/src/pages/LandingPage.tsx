import { Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  const features = [
    {
      title: "Operational Efficiency",
      description:
        "Streamline your workflows and enhance productivity with our user-friendly tools designed for efficient factory management.",
      icon: "🏭",
    },
    {
      title: "Rate Optimization",
      description:
        "Maximize your production rates with tailored solutions and advanced settings that cater to your specific needs.",
      icon: "⚙️",
    },
    {
      title: "Advanced Configuration",
      description:
        "Configure your factory settings with precision using our advanced tools, ensuring optimal performance and output.",
      icon: "🏗️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <HeroSection />
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureSection key={index} {...feature} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/items"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
