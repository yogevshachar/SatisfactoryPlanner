import { useQuery } from "@tanstack/react-query";
import { postFactoryCost } from "../api/plannerApi";
import { usePlannerOptions } from "../stores/plannerOptions";



export const useMachinePlan = () => {
  const store = usePlannerOptions();
  const options = store.options;

  return useQuery({
    queryKey: ["machine-plan", options],
    enabled: !!options?.selectedItems && options.selectedItems.length > 0,
    queryFn: () =>
      postFactoryCost(options),
  });
};