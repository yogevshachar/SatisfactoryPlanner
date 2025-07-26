import { useQuery } from "@tanstack/react-query";
import { postDemandPlan } from "../api/plannerApi";
import { usePlannerOptions } from "../stores/plannerOptions";


export const useDemand = () => {
  const store = usePlannerOptions();
  const options = store.options;

  return useQuery({
    queryKey: ["demand", options],
    enabled: !!options?.selectedItems && options.selectedItems.length > 0,
    queryFn: () =>
      postDemandPlan(options),
  });
};