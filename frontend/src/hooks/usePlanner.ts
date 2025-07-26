import { useQuery } from "@tanstack/react-query";
import { postPlanner } from "../api/plannerApi";
import { usePlannerOptions } from "../stores/plannerOptions";


export const useGraphQuery = () => {
  const store = usePlannerOptions();
  const options = store.options;

  return useQuery({
    queryKey: ["planner-graph", options],
    enabled: !!options?.selectedItems && options.selectedItems.length > 0,
    queryFn: () =>
      postPlanner(options),
  });
};