import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {DemandEntry, PlannerTarget} from "../types/factory.types.ts";

type DemandParams = {
  targets: PlannerTarget[];
};

export const useDemand = (params: DemandParams, enabled: boolean = true) => {
  return useQuery<DemandEntry[]>({
    queryKey: ["demand", params],
    queryFn: async () => {
      const res = await axios.post("https://satisfactoryplanner.onrender.com/planner/demand", params);

      return res.data;
    },
    enabled
  });
};