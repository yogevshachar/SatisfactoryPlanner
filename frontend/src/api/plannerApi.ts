import axios from "axios";
import type { PlannerPayload, FactoryGraph } from "../types/factory.types";
import { API_ENDPOINTS } from "../config/api";

export const postPlanner = async (
    payload: PlannerPayload
): Promise<FactoryGraph> => {
    const res = await axios.post<FactoryGraph>(
        API_ENDPOINTS.PLANNER_REUSE,
        payload
    );
    return res.data;
};
