import React from "react";
import type {Item, PlannerPayload} from "../types/factory.types";

type Props = {
    items: Item[];
    targetItem: string;
    rate: number;
    tier: number;
    realistic: boolean;
    onChange: (payload: { targetItem: string; rate: number; tier: number; realistic: boolean }) => void;
    onSubmit: (payload: PlannerPayload) => void;
};

const PlannerForm: React.FC<Props> = ({items, targetItem, rate, tier, realistic, onChange, onSubmit}) => {
    const handleInputChange = (field: string, value: string | number | boolean) => {
        onChange({
            targetItem,
            rate,
            tier,
            realistic,
            [field]: value,
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetItem) return;
        onSubmit({
            targets: [{item: targetItem, rate}],
            tier,
            realistic,
        });
    };
    return (
        <form
            onSubmit={handleFormSubmit}
            className="space-y-4 bg-white p-4 rounded shadow w-full md:w-2/3 lg:w-1/2 mx-auto"
        >
            <h1 className="text-xl font-bold text-center">Satisfactory Factory Planner</h1>

            <div>
                <label className="block mb-1 font-medium">Target Item</label>
                <select
                    value={targetItem}
                    onChange={(e) => handleInputChange("targetItem", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Select an item --</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">Amount per Minute</label>
                <input
                    type="number"
                    value={rate}
                    onChange={(e) => handleInputChange("rate", Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    min={1}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Unlocked Tier</label>
                <input
                    type="number"
                    value={tier}
                    onChange={(e) => handleInputChange("tier", Number(e.target.value))}
                    className="w-full border rounded px-3 py-2"
                    min={0}
                    max={8}
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={realistic}
                    onChange={(e) => handleInputChange("realistic", e.target.checked)}
                />
                <label className="font-medium">realistic machines if possible</label>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                Generate Factory
            </button>
        </form>
    );
};

export default PlannerForm;