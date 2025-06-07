import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Item } from "../types/factory.types";




export const useItems = () => {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axios.get<Item[]>("https://satisfactoryplanner.onrender.com/items");
      return res.data;
    },
  });
};