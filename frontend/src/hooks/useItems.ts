import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Item } from "../types/factory.types";
import { API_ENDPOINTS } from "../config/api";

export const useItems = () => {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axios.get<Item[]>(API_ENDPOINTS.ITEMS);
      return res.data;
    },
  });
};