interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
}

interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  rate: number;
  onSelect: () => void;
  onRateChange: (rate: number) => void;
}

const ItemCard = ({
  item,
  isSelected,
  rate,
  onSelect,
  onRateChange,
}: ItemCardProps) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 relative">
      {/* Selection Checkbox */}
      <button
        onClick={onSelect}
        className={`absolute top-4 right-4 w-5 h-5 border-2 rounded ${
          isSelected
            ? "bg-blue-500 border-blue-500"
            : "border-gray-400 hover:border-gray-300"
        } transition-colors duration-200`}
      >
        {isSelected && (
          <svg
            className="w-3 h-3 text-white mx-auto mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Item Image */}
      <div className="text-4xl mb-4">{item.image}</div>

      {/* Item Name */}
      <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>

      {/* Item Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {item.description}
      </p>

      {/* Rate Input */}
      <div className="flex items-center space-x-3">
        <label className="text-white text-sm font-medium">Rate:</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => onRateChange(Number(e.target.value))}
          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          step="1"
        />
      </div>
    </div>
  );
};

export default ItemCard;
