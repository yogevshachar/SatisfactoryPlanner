import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {DemandEntry, PlannerTarget} from "../types/factory.types.ts";
import { API_ENDPOINTS } from "../config/api";

type DemandParams = {
  targets: PlannerTarget[];
};

export const useDemand = (params: DemandParams, enabled: boolean = true) => {
  return useQuery<DemandEntry[]>({
    queryKey: ["demand", params],
    queryFn: async () => {
      const res = await axios.post(API_ENDPOINTS.PLANNER_DEMAND, params);

      return res.data;
    },
    enabled
  });
};