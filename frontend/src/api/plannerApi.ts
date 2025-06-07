import axios from "axios";
import type { PlannerPayload, FactoryGraph } from "../types/factory.types";

export const postPlanner = async (
    payload: PlannerPayload
): Promise<FactoryGraph> => {
    const res = await axios.post<FactoryGraph>(
        "http://localhost:8081/planner/reuse",
        payload
    );
    return res.data;
};
