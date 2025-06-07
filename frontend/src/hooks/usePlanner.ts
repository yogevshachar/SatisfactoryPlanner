import { useMutation } from "@tanstack/react-query";
import { postPlanner } from "../api/plannerApi";
import type { PlannerPayload, FactoryGraph } from "../types/factory.types";

export const usePlanner = () => {
  return useMutation<FactoryGraph, Error, PlannerPayload>({
    mutationFn: postPlanner,
  });
};