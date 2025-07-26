import { useMachinePlan } from "../hooks/useMachinePlan";

interface RequiredItem {
  id: string;
  name: string;
  quantity: string;

  icon?: string;
}

const ItemsRequired = () => {
  const demandQuery = useMachinePlan();
  const isLoading = demandQuery.isPending;
  const error = demandQuery.error;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const requiredItems: RequiredItem[] = demandQuery.data?.map((item) => ({
    id: item.item,
    name: item.item,
    quantity: item.quantity.toString(),
    icon: item.icon,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {requiredItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-650 transition-colors duration-200"
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm mb-1">
                {item.name}
              </h3>
              <p className="text-gray-300 text-xs mb-2">
                Quantity: {item.quantity}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsRequired;
