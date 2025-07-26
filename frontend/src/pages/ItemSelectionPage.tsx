import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import { usePlannerOptions } from "../stores/plannerOptions";
import { useItems } from "../hooks/useItems";

interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
}

const ItemSelectionPage = observer(() => {
  const navigate = useNavigate();
  const plannerOptions = usePlannerOptions();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: items = [] } = useItems();

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (itemId: string) => {
    const isSelected = plannerOptions.options.selectedItems.some(
      (item) => item.id === itemId
    );
    console.log("isSelected", isSelected);
    if (isSelected) {
      plannerOptions.removeSelectedItem(itemId);
    } else {
      console.log("itemId", itemId);
      const item = items.find((i) => i.id === itemId);
      if (item) {
        console.log("item", item);
        plannerOptions.addSelectedItem({
          id: item.id,
          name: item.name,
          rate: 1,
        });
      }
    }
  };

  const handleRateChange = (itemId: string, rate: number) => {
    plannerOptions.updateItemRate(itemId, rate);
  };

  const handleProceed = () => {
    // Navigate to advanced settings with selected items and rates
    console.log("Selected items:", plannerOptions.options.selectedItems);
    navigate("/advanced-settings");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for an item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => {
            const selectedItem = plannerOptions.options.selectedItems.find(
              (selected) => selected.id === item.id
            );
            return (
              <ItemCard
                key={item.id}
                item={item as unknown as Item}
                isSelected={!!selectedItem}
                rate={selectedItem?.rate || 1}
                onSelect={() => handleItemSelect(item.id)}
                onRateChange={(rate) => handleRateChange(item.id, rate)}
              />
            );
          })}
        </div>

        {/* Proceed Button */}
        <div className="text-center">
          <button
            onClick={handleProceed}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Proceed to Recipe Picker
          </button>
        </div>
      </div>
    </div>
  );
});

export default ItemSelectionPage;
