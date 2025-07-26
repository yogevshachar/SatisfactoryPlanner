// stores/plannerOptions.ts
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

export interface SelectedItem {
  id: string;
  name: string;
  rate: number;
}

export type PlannerOptions = {
  selectedItems: SelectedItem[];
  realisticFactory: boolean;
  powerShards: number;  
  unlockedMilestone: number;
  factorySize: string;
  availableSpace: string;
};

export const defaultOptions: PlannerOptions = {
  selectedItems: [],
  realisticFactory: true,
  powerShards: 0,
  unlockedMilestone: 1,
  factorySize: "",
  availableSpace: "",
};

class PlannerOptionsStore {
  options: PlannerOptions = defaultOptions;

  constructor() {
    makeAutoObservable(this);
  }

  setOption<K extends keyof PlannerOptions>(key: K, value: PlannerOptions[K]) {
    this.options[key] = value;
  }

  addSelectedItem(item: SelectedItem) {
    console.log("addSelectedItem", item);
    console.log("this.options.selectedItems", this.options.selectedItems);
    this.options.selectedItems.push(item);
  }

  removeSelectedItem(itemId: string) {
    this.options.selectedItems = this.options.selectedItems.filter(
      item => item.id !== itemId
    );
  }

  updateItemRate(itemId: string, rate: number) {
    const item = this.options.selectedItems.find(item => item.id === itemId);
    if (item) {
      item.rate = rate;
    }
  }

  reset() {
    this.options = defaultOptions;
  }
}

// Create a singleton instance
export const plannerOptionsStore = new PlannerOptionsStore();

// Export the store instance for direct use
export default plannerOptionsStore;

// React hook for using the store
export const usePlannerOptions = () => {
  return plannerOptionsStore;
};

// Observer wrapper for components
export const withPlannerOptions = observer;
