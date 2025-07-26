import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DemandCalculations from "../components/DemandCalculations";
import ItemsRequired from "../components/ItemsRequired";
import FactoryGraphContainer from "../components/FactoryGraphContainer";
const ResultsPage = () => {
  const navigate = useNavigate();

  const handleReturnToItemSelector = () => {
    navigate("/items");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="p-6 space-y-6">
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Factory Graph - Takes up 2/3 of the space */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Factory Graph</h2>
              <div className="h-96">
                <FactoryGraphContainer />
              </div>
            </div>
          </div>

          {/* Demand Calculations - Takes up 1/3 of the space */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Demand Calculations</h2>
              <div className="h-96 overflow-y-auto">
                <DemandCalculations />
              </div>
            </div>
          </div>
        </div>

        {/* Items Required for Production */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Items Required for Production
          </h2>
          <ItemsRequired />
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleReturnToItemSelector}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Return to Item Selector
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
