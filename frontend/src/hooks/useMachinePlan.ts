import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {PlannerTarget} from "../types/factory.types.ts";
import { API_ENDPOINTS } from "../config/api";

type MachinePlanEntry = {
  item: string;
  machine: string;
  count: number;
  rate: number;
};

type MachinePlanParams = {
  targets: PlannerTarget[];
  tier: number;
};

export const useMachinePlan = (params: MachinePlanParams, enabled: boolean = true) => {
  return useQuery<MachinePlanEntry[]>({
    queryKey: ["machine-plan", params],
    queryFn: async () => {
      const res = await axios.post(API_ENDPOINTS.PLANNER_MACHINE_PLAN, params);
      return res.data;
    },
    enabled
  });
};