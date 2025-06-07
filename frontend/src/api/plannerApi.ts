import axios from "axios";
import type { PlannerPayload, FactoryGraph } from "../types/factory.types";

export const postPlanner = async (
    payload: PlannerPayload
): Promise<FactoryGraph> => {
    const res = await axios.post<FactoryGraph>(
        "http://satisfactoryplanner.onrender.com/planner/reuse",
        payload
    );
    return res.data;
};
