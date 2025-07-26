interface FeatureSectionProps {
  title: string;
  description: string;
  icon: string;
}
const FeatureSection = ({ title, description, icon }: FeatureSectionProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-750 transition-colors duration-200">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureSection;
