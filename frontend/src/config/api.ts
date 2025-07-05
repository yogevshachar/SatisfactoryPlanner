// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export const API_ENDPOINTS = {
  ITEMS: `${API_BASE_URL}/items`,
  PLANNER_DEMAND: `${API_BASE_URL}/planner/demand`,
  PLANNER_MACHINE_PLAN: `${API_BASE_URL}/planner/machine_plan`,
  PLANNER_REUSE: `${API_BASE_URL}/planner/reuse`,
} as const;

export default API_ENDPOINTS; 