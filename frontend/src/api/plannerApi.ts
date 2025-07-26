import axios from "axios";
import type {CostEntry, DemandEntry, FactoryGraph} from "../types/factory.types";
import { API_ENDPOINTS } from "../config/api";
import type { PlannerOptions } from "../stores/plannerOptions";

export const postPlanner = async (options: PlannerOptions): Promise<FactoryGraph> => {
    const res = await axios.post<FactoryGraph>(
        API_ENDPOINTS.PLANNER_REUSE,
        {
            targets: options.selectedItems.map(item => ({ item: item.id, rate: item.rate })),
            tier: options.unlockedMilestone,
            realistic: options.realisticFactory,
            powerShards: options.powerShards,
        }
    );
    return res.data;
};


export const postFactoryCost = async (options: PlannerOptions): Promise<CostEntry[]> => {
    const res = await axios.post<CostEntry[]>(
        API_ENDPOINTS.PLANNER_FACTORY_COST,
        {
            targets: options.selectedItems.map(item => ({ item: item.id, rate: item.rate })),
            tier: options.unlockedMilestone,
        }
    );
    return res.data;
};

export const postDemandPlan = async (options: PlannerOptions): Promise<DemandEntry[]> => {
    const res = await axios.post<DemandEntry[]>(
        API_ENDPOINTS.PLANNER_DEMAND,
        {
            targets: options.selectedItems.map(item => ({ item: item.id, rate: item.rate })),
        }
    );
    return res.data;
};