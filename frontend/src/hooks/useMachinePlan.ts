import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {PlannerTarget} from "../types/factory.types.ts";

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
      const res = await axios.post("http://localhost:8081/planner/machine_plan", params);
      return res.data;
    },
    enabled
  });
};