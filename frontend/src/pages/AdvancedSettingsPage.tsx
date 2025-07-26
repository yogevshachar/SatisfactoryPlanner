import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import { usePlannerOptions } from "../stores/plannerOptions";

const AdvancedSettingsPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const plannerOptions = usePlannerOptions();
  const [formData, setFormData] = useState({
    powerShards: plannerOptions.options.powerShards,
    factorySize: plannerOptions.options.factorySize,
    availableSpace: plannerOptions.options.availableSpace,
  });

  const spaceOptions = [
    "Small (Compact Layout)",
    "Medium (Balanced Layout)",
    "Large (Spacious Layout)",
    "Unlimited (No Space Constraints)",
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update the store with the new settings
    plannerOptions.setOption("powerShards", Number(formData.powerShards));
    plannerOptions.setOption("factorySize", formData.factorySize);
    plannerOptions.setOption("availableSpace", formData.availableSpace);

    // Navigate directly to results with updated settings
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Advanced Settings Card */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Advanced Settings
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Power Shards */}
            <div>
              <label className="block text-white font-medium mb-2">
                Power Shards
              </label>
              <input
                type="number"
                placeholder="Enter production speed"
                value={formData.powerShards}
                onChange={(e) =>
                  handleInputChange("powerShards", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="100"
              />
            </div>

            {/* Factory Size */}
            <div>
              <label className="block text-white font-medium mb-2">
                Factory Size
              </label>
              <input
                type="text"
                placeholder="Enter factory size"
                value={formData.factorySize}
                onChange={(e) =>
                  handleInputChange("factorySize", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Available Space */}
            <div>
              <label className="block text-white font-medium mb-2">
                Available Space
              </label>
              <select
                value={formData.availableSpace}
                onChange={(e) =>
                  handleInputChange("availableSpace", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select space option</option>
                {spaceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-4 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-400">
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
          <div>© 2023 Factory Planner Pro</div>
        </div>
      </footer>
    </div>
  );
});

export default AdvancedSettingsPage;
